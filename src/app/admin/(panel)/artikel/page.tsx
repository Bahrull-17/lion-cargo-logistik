import { redirect } from "next/navigation";
import { z } from "zod";
import { ArtikelManager, type AdminArticle } from "@/features/admin/components/artikel-manager";
import { SavedNotice } from "@/features/admin/components/saved-notice";
import { getAdmin } from "@/features/admin/lib/get-admin";
import { ARTICLE_CATEGORIES, ARTICLE_LOCALES } from "@/types/artikel";

const RowSchema = z.object({
  id: z.string().min(1),
  category: z.enum(ARTICLE_CATEGORIES),
  is_featured: z.boolean(),
  created_at: z.string().min(1),
  article_translations: z.array(
    z.object({
      id: z.string().min(1),
      locale: z.enum(ARTICLE_LOCALES),
      slug: z.string(),
      title: z.string(),
      status: z.enum(["draft", "published"]),
    }),
  ),
});

export default async function AdminArtikelPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  // Layout tidak cukup sebagai pengaman (page bisa dirender terpisah), jadi dicek lagi di sini.
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  const { saved } = await searchParams;

  const { data, error } = await admin.supabase.from("articles").select("id, category, is_featured, created_at, article_translations(id, locale, slug, title, status)").order("created_at", { ascending: false });

  if (error) {
    return <p className="p-6 text-sm text-red-600">Gagal memuat artikel. Muat ulang halaman.</p>;
  }

  const items: AdminArticle[] = (data ?? []).flatMap((raw) => {
    const row = RowSchema.safeParse(raw);
    if (!row.success) {
      console.warn("[admin/artikel] Baris tidak valid dilewati:", row.error.message);
      return [];
    }

    return [
      {
        id: row.data.id,
        category: row.data.category,
        isFeatured: row.data.is_featured,
        createdAt: row.data.created_at,
        translations: row.data.article_translations.map((tr) => ({
          id: tr.id,
          locale: tr.locale,
          slug: tr.slug,
          title: tr.title,
          status: tr.status,
        })),
      },
    ];
  });

  return (
    <>
      {saved === "1" ? <SavedNotice message="Artikel berhasil disimpan." /> : null}
      <ArtikelManager items={items} />
    </>
  );
}
