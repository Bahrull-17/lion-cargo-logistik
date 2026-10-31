import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArtikelContent } from "@/features/artikel/components/artikel-content";
import { getPublishedArticles } from "@/services/artikel.service";
import { toArticleLocale, type ArticleSummary } from "@/types/artikel";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.article.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/artikel`,
      languages: {
        id: "/id/artikel",
        en: "/en/artikel",
        "x-default": "/id/artikel",
      },
    },
  };
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

  return <ArtikelContent articles={articles} />;
}
