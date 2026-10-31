"use server";

import { updateTag } from "next/cache";
import { z } from "zod";
import { estimateReadingMinutes, htmlToPlainText, sanitizeArticleHtml } from "@/features/admin/lib/article-content";
import { getAdmin } from "@/features/admin/lib/get-admin";
import { STORAGE_BUCKET, isAllowedCoverUrl, storagePathFromUrl } from "@/features/admin/lib/storage";
import { isValidSlug, slugify } from "@/lib/slugify";
import { ARTICLE_CATEGORIES, ARTICLE_LOCALES, type ArticleCategory, type ArticleLocale } from "@/types/artikel";

export interface SaveTranslationInput {
  locale: ArticleLocale;
  title: string;
  slug: string;
  excerpt: string;
  authorName: string;
  contentHtml: string;
  metaTitle: string;
  metaDescription: string;
  status: "draft" | "published";
}

export interface SaveArticleInput {
  /** null = artikel baru. */
  articleId: string | null;
  category: ArticleCategory;
  coverImageUrl: string | null;
  translations: SaveTranslationInput[];
}

export type SaveArticleResult = { ok: true; articleId: string } | { ok: false; error: string };

const NO_ACCESS = "Sesi berakhir atau tidak punya akses. Silakan masuk kembali.";
const SAVE_FAILED = "Gagal menyimpan. Coba lagi.";
const NOT_FOUND = "Artikel tidak ditemukan atau tidak punya izin.";

const LOCALE_LABEL: Record<ArticleLocale, string> = { id: "Indonesia", en: "English" };

const TranslationSchema = z.object({
  locale: z.enum(ARTICLE_LOCALES),
  title: z.string().max(200),
  slug: z.string().max(120),
  excerpt: z.string().max(400),
  authorName: z.string().max(100),
  contentHtml: z.string().max(200_000),
  metaTitle: z.string().max(120),
  metaDescription: z.string().max(320),
  status: z.enum(["draft", "published"]),
});

const SaveSchema = z.object({
  articleId: z.uuid().nullable(),
  category: z.enum(ARTICLE_CATEGORIES),
  coverImageUrl: z.string().max(600).nullable(),
  translations: z.array(TranslationSchema).min(1).max(2),
});

interface TranslationRow {
  locale: ArticleLocale;
  slug: string;
  title: string;
  excerpt: string;
  content_html: string;
  author_name: string;
  meta_title: string | null;
  meta_description: string | null;
  reading_minutes: number;
  status: "draft" | "published";
}

/** Menyimpan artikel baru / perubahan artikel, lengkap dengan terjemahannya. */
export async function saveArticle(input: SaveArticleInput): Promise<SaveArticleResult> {
  const parsed = SaveSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Data tidak valid. Periksa panjang isian (judul maks. 200, ringkasan maks. 400 karakter)." };

  const admin = await getAdmin();
  if (!admin) return { ok: false, error: NO_ACCESS };

  const data = parsed.data;

  const cover = data.coverImageUrl?.trim() || null;
  if (cover && !isAllowedCoverUrl(cover)) {
    return { ok: false, error: "Gambar sampul tidak valid. Unggah ulang gambarnya." };
  }

  // 1) Validasi & bersihkan tiap bahasa. Bahasa yang judulnya kosong dianggap tidak ditulis dan dilewati.
  const rows: TranslationRow[] = [];
  const seen = new Set<ArticleLocale>();

  for (const tr of data.translations) {
    if (seen.has(tr.locale)) return { ok: false, error: "Data tidak valid." };
    seen.add(tr.locale);

    const title = tr.title.trim();
    if (title === "") continue;

    const label = LOCALE_LABEL[tr.locale];
    const slug = tr.slug.trim() === "" ? slugify(title) : tr.slug.trim();
    if (!isValidSlug(slug)) {
      return { ok: false, error: `Slug (${label}) hanya boleh huruf kecil, angka, dan tanda hubung.` };
    }

    const contentHtml = sanitizeArticleHtml(tr.contentHtml);
    const plainText = htmlToPlainText(contentHtml);
    const excerpt = tr.excerpt.trim();

    if (tr.status === "published") {
      if (plainText === "") return { ok: false, error: `Isi artikel (${label}) masih kosong. Isi dulu sebelum diterbitkan.` };
      if (excerpt === "") return { ok: false, error: `Ringkasan (${label}) wajib diisi sebelum diterbitkan.` };
    }

    rows.push({
      locale: tr.locale,
      slug,
      title,
      excerpt,
      content_html: contentHtml,
      author_name: tr.authorName.trim(),
      meta_title: tr.metaTitle.trim() || null,
      meta_description: tr.metaDescription.trim() || null,
      reading_minutes: estimateReadingMinutes(plainText),
      status: tr.status,
    });
  }

  if (rows.length === 0) return { ok: false, error: "Isi judul minimal di salah satu bahasa." };

  // 2) Cek slug bentrok sebelum menulis apa pun (database tetap menjaga lewat constraint unik).
  for (const row of rows) {
    let query = admin.supabase.from("article_translations").select("article_id").eq("locale", row.locale).eq("slug", row.slug).limit(1);
    if (data.articleId) query = query.neq("article_id", data.articleId);

    const { data: conflict, error: conflictError } = await query;
    if (conflictError) return { ok: false, error: SAVE_FAILED };
    if (conflict && conflict.length > 0) {
      return { ok: false, error: `Slug (${LOCALE_LABEL[row.locale]}) "${row.slug}" sudah dipakai artikel lain. Ubah slugnya.` };
    }
  }

  // 3) Simpan data artikel (umum untuk semua bahasa).
  let articleId = data.articleId;
  let previousCover: string | null = null;
  let isNew = false;

  if (articleId) {
    const { data: existing, error: readError } = await admin.supabase.from("articles").select("id, cover_image_url").eq("id", articleId).maybeSingle();
    if (readError) return { ok: false, error: SAVE_FAILED };
    if (!existing) return { ok: false, error: NOT_FOUND };

    previousCover = typeof existing.cover_image_url === "string" ? existing.cover_image_url : null;

    const { error: updateError } = await admin.supabase.from("articles").update({ category: data.category, cover_image_url: cover }).eq("id", articleId);
    if (updateError) return { ok: false, error: SAVE_FAILED };
  } else {
    const { data: created, error: insertError } = await admin.supabase.from("articles").insert({ category: data.category, cover_image_url: cover }).select("id").single();
    if (insertError || !created) return { ok: false, error: SAVE_FAILED };

    articleId = String(created.id);
    isNew = true;
  }

  // 4) Simpan terjemahan (baru atau pembaruan, berdasarkan pasangan article_id + locale).
  const payload = rows.map((row) => ({ ...row, article_id: articleId }));
  const { error: upsertError } = await admin.supabase.from("article_translations").upsert(payload, { onConflict: "article_id,locale" });

  if (upsertError) {
    // Artikel baru yang gagal menyimpan terjemahannya dibatalkan agar tidak tersisa artikel kosong.
    if (isNew) await admin.supabase.from("articles").delete().eq("id", articleId);
    const isSlugConflict = upsertError.code === "23505";
    return { ok: false, error: isSlugConflict ? "Slug sudah dipakai artikel lain. Ubah slugnya." : SAVE_FAILED };
  }

  // 5) Hapus file gambar lama bila sampul diganti (kegagalan di sini tidak membatalkan penyimpanan).
  if (previousCover && previousCover !== cover) {
    const oldPath = storagePathFromUrl(previousCover);
    if (oldPath) {
      const { error: removeError } = await admin.supabase.storage.from(STORAGE_BUCKET).remove([oldPath]);
      if (removeError) console.warn("[admin/artikel] Gagal menghapus gambar lama:", removeError.message);
    }
  }

  // Daftar & detail artikel di website langsung terbarui.
  updateTag("articles");

  return { ok: true, articleId };
}
