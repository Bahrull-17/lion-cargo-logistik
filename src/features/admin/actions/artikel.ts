"use server";

import { updateTag } from "next/cache";
import { z } from "zod";
import { getAdmin } from "@/features/admin/lib/get-admin";
import { STORAGE_BUCKET, storagePathFromUrl } from "@/features/admin/lib/storage";

export type ArtikelActionResult = { ok: true } | { ok: false; error: string };

const NO_ACCESS = "Sesi berakhir atau tidak punya akses. Silakan masuk kembali.";
const SAVE_FAILED = "Gagal menyimpan. Coba lagi.";
const NOT_FOUND = "Artikel tidak ditemukan atau tidak punya izin.";

const SetStatusSchema = z.object({
  translationId: z.uuid(),
  status: z.enum(["draft", "published"]),
});

/** Menerbitkan / menjadikan draft SATU bahasa dari sebuah artikel. */
export async function setTranslationStatus(input: { translationId: string; status: "draft" | "published" }): Promise<ArtikelActionResult> {
  const parsed = SetStatusSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Data tidak valid." };

  const admin = await getAdmin();
  if (!admin) return { ok: false, error: NO_ACCESS };

  const { data: row, error: readError } = await admin.supabase.from("article_translations").select("title, content_html").eq("id", parsed.data.translationId).maybeSingle();

  if (readError) return { ok: false, error: SAVE_FAILED };
  if (!row) return { ok: false, error: NOT_FOUND };

  // Jangan menerbitkan artikel kosong.
  if (parsed.data.status === "published") {
    const title = typeof row.title === "string" ? row.title.trim() : "";
    const content = typeof row.content_html === "string" ? row.content_html.trim() : "";
    if (title === "" || content === "") {
      return { ok: false, error: "Judul dan isi artikel harus diisi dulu sebelum diterbitkan." };
    }
  }

  const { data, error } = await admin.supabase.from("article_translations").update({ status: parsed.data.status }).eq("id", parsed.data.translationId).select("id");

  if (error) return { ok: false, error: SAVE_FAILED };
  if (!data || data.length === 0) return { ok: false, error: NOT_FOUND };

  // Daftar & detail artikel di website langsung terbarui.
  updateTag("articles");
  return { ok: true };
}

const SetFeaturedSchema = z.object({
  articleId: z.uuid(),
  featured: z.boolean(),
});

/** Menandai artikel unggulan. Trigger database otomatis mencabut tanda dari artikel lain. */
export async function setArticleFeatured(input: { articleId: string; featured: boolean }): Promise<ArtikelActionResult> {
  const parsed = SetFeaturedSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Data tidak valid." };

  const admin = await getAdmin();
  if (!admin) return { ok: false, error: NO_ACCESS };

  const { data, error } = await admin.supabase.from("articles").update({ is_featured: parsed.data.featured }).eq("id", parsed.data.articleId).select("id");

  if (error) return { ok: false, error: SAVE_FAILED };
  if (!data || data.length === 0) return { ok: false, error: NOT_FOUND };

  updateTag("articles");
  return { ok: true };
}

const DeleteSchema = z.object({ articleId: z.uuid() });

/** Menghapus artikel beserta semua terjemahannya (cascade) dan gambar sampulnya di Storage. */
export async function deleteArticle(input: { articleId: string }): Promise<ArtikelActionResult> {
  const parsed = DeleteSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Data tidak valid." };

  const admin = await getAdmin();
  if (!admin) return { ok: false, error: NO_ACCESS };

  const { data: article, error: readError } = await admin.supabase.from("articles").select("cover_image_url").eq("id", parsed.data.articleId).maybeSingle();

  if (readError) return { ok: false, error: SAVE_FAILED };
  if (!article) return { ok: false, error: NOT_FOUND };

  const { data, error } = await admin.supabase.from("articles").delete().eq("id", parsed.data.articleId).select("id");

  if (error) return { ok: false, error: SAVE_FAILED };
  if (!data || data.length === 0) return { ok: false, error: NOT_FOUND };

  // Hapus file gambar bila berasal dari bucket kita. Kegagalan di sini tidak membatalkan penghapusan artikel.
  const coverUrl = typeof article.cover_image_url === "string" ? article.cover_image_url : null;
  const coverPath = storagePathFromUrl(coverUrl);
  if (coverPath) {
    const { error: removeError } = await admin.supabase.storage.from(STORAGE_BUCKET).remove([coverPath]);
    if (removeError) console.warn("[admin/artikel] Gagal menghapus gambar sampul:", removeError.message);
  }

  updateTag("articles");
  return { ok: true };
}
