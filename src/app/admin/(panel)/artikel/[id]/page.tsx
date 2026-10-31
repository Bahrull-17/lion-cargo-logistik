import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import { ArtikelForm } from "@/features/admin/components/artikel-form";
import { emptyArticleFormValues, type ArticleFormValues } from "@/features/admin/lib/artikel-form-values";
import { getAdmin } from "@/features/admin/lib/get-admin";
import { ARTICLE_CATEGORIES, ARTICLE_LOCALES } from "@/types/artikel";

const RowSchema = z.object({
  id: z.string().min(1),
  category: z.enum(ARTICLE_CATEGORIES),
  cover_image_url: z.string().nullable(),
  article_translations: z.array(
    z.object({
      locale: z.enum(ARTICLE_LOCALES),
      slug: z.string(),
      title: z.string(),
      excerpt: z.string(),
      content_html: z.string(),
      author_name: z.string(),
      meta_title: z.string().nullable(),
      meta_description: z.string().nullable(),
      status: z.enum(["draft", "published"]),
    }),
  ),
});

export default async function AdminArtikelEditPage({ params }: { params: Promise<{ id: string }> }) {
  // Layout tidak cukup sebagai pengaman (page bisa dirender terpisah), jadi dicek lagi di sini.
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();

  const { data, error } = await admin.supabase
    .from("articles")
    .select("id, category, cover_image_url, article_translations(locale, slug, title, excerpt, content_html, author_name, meta_title, meta_description, status)")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return <p className="p-6 text-sm text-red-600">Gagal memuat artikel. Muat ulang halaman.</p>;
  }
  if (!data) notFound();

  const row = RowSchema.safeParse(data);
  if (!row.success) {
    console.warn("[admin/artikel] Data artikel tidak valid:", row.error.message);
    return <p className="p-6 text-sm text-red-600">Data artikel tidak valid.</p>;
  }

  const initial: ArticleFormValues = emptyArticleFormValues();
  initial.category = row.data.category;
  initial.coverImageUrl = row.data.cover_image_url;

  for (const tr of row.data.article_translations) {
    initial.translations[tr.locale] = {
      title: tr.title,
      slug: tr.slug,
      excerpt: tr.excerpt,
      authorName: tr.author_name,
      contentHtml: tr.content_html,
      metaTitle: tr.meta_title ?? "",
      metaDescription: tr.meta_description ?? "",
      status: tr.status,
    };
  }

  return <ArtikelForm articleId={row.data.id} initial={initial} />;
}
