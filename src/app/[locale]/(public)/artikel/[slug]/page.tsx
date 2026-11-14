import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArtikelDetailView } from "@/features/artikel/components/artikel-detail";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { JsonLd } from "@/lib/seo/json-ld";
import { absoluteUrl, buildSocial, localizedPath } from "@/lib/seo/metadata";
import { createArticleSchema } from "@/lib/schema/article";
import { seoConfig } from "@/config/seo";
import { getArticleBySlug } from "@/services/artikel.service";
import { toArticleLocale } from "@/types/artikel";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "pages.article.detail" });
  const article = await getArticleBySlug(toArticleLocale(locale), slug);

  if (!article) {
    return { title: t("notFoundTitle"), robots: { index: false, follow: false } };
  }

  const languages: Record<string, string> = {};
  for (const [altLocale, altSlug] of Object.entries(article.alternates)) {
    if (altSlug) languages[altLocale] = `/${altLocale}/artikel/${altSlug}`;
  }
  const defaultPath = languages.id ?? Object.values(languages)[0];
  if (defaultPath) languages["x-default"] = defaultPath;

  const title = article.metaTitle || article.title;
  const description = article.metaDescription || article.excerpt;
  const url = `/${locale}/artikel/${article.slug}`;
  const social = buildSocial({ locale, url, title: `${title} | Lion Cargo Logistik`, description, type: "article" });

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      ...social.openGraph,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: article.authorName ? [article.authorName] : undefined,
      images: article.coverImageUrl ? [{ url: article.coverImageUrl }] : social.openGraph?.images,
    },
    twitter: {
      ...social.twitter,
      images: article.coverImageUrl ? [article.coverImageUrl] : social.twitter?.images,
    },
  };
}

export default async function ArtikelDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = await getArticleBySlug(toArticleLocale(locale), slug);
  // Artikel tidak ada / belum terbit -> status HTTP 404 sungguhan.
  if (!article) notFound();

  const url = localizedPath(locale, `/artikel/${article.slug}`);

  return (
    <>
      <JsonLd
        data={createArticleSchema({
          title: article.metaTitle || article.title,
          description: article.metaDescription || article.excerpt,
          url: absoluteUrl(url),
          image: absoluteUrl(article.coverImageUrl ?? seoConfig.ogImage),
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          authorName: article.authorName || undefined,
          language: locale === "en" ? "en-US" : "id-ID",
        })}
      />
      <BreadcrumbJsonLd locale={locale} page="article" leaf={{ name: article.title, path: url }} />
      <ArtikelDetailView article={article} locale={locale} />
    </>
  );
}
