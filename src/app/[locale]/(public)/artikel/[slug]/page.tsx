import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArtikelDetailView } from "@/features/artikel/components/artikel-detail";
import { getArticleBySlug } from "@/services/artikel.service";
import { toArticleLocale } from "@/types/artikel";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const OG_LOCALE: Record<string, string> = { id: "id_ID", en: "en_US" };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "pages.article.detail" });
  const article = await getArticleBySlug(toArticleLocale(locale), slug);

  if (!article) {
    return { title: t("notFoundTitle"), robots: { index: false, follow: false } };
  }

  // hreflang hanya untuk bahasa yang benar-benar sudah terbit
  const languages: Record<string, string> = {};
  for (const [altLocale, altSlug] of Object.entries(article.alternates)) {
    if (altSlug) languages[altLocale] = `/${altLocale}/artikel/${altSlug}`;
  }
  const defaultPath = languages.id ?? Object.values(languages)[0];
  if (defaultPath) languages["x-default"] = defaultPath;

  const title = article.metaTitle || article.title;
  const description = article.metaDescription || article.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/artikel/${article.slug}`,
      languages,
    },
    openGraph: {
      type: "article",
      title,
      description,
      locale: OG_LOCALE[locale] ?? "id_ID",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: article.authorName ? [article.authorName] : undefined,
      images: article.coverImageUrl ? [{ url: article.coverImageUrl }] : undefined,
    },
  };
}

async function ArtikelDetailData({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = await getArticleBySlug(toArticleLocale(locale), slug);
  if (!article) notFound();

  return <ArtikelDetailView article={article} locale={locale} />;
}

export default function ArtikelDetailPage({ params }: Props) {
  return (
    <Suspense fallback={null}>
      <ArtikelDetailData params={params} />
    </Suspense>
  );
}
