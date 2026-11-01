import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArtikelContent } from "@/features/artikel/components/artikel-content";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getPublishedArticles } from "@/services/artikel.service";
import { toArticleLocale, type ArticleSummary } from "@/types/artikel";

// Data (tarif/artikel) selalu segar: perubahan dari panel admin langsung tampil tanpa deploy ulang.
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata(locale, "artikel");
}

export default async function ArtikelPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  let articles: ArticleSummary[] = [];
  try {
    articles = await getPublishedArticles(toArticleLocale(locale));
  } catch (err) {
    console.warn("Gagal mengambil artikel dari Supabase:", err);
  }

  return (
    <>
      <BreadcrumbJsonLd locale={locale} page="article" />
      <ArtikelContent articles={articles} />
    </>
  );
}
