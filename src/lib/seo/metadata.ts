import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/config/site";
import { pageSeo, seoConfig, type PageKey } from "@/config/seo";
import { routing } from "@/i18n/routing";

export const OG_LOCALE: Record<string, string> = { id: "id_ID", en: "en_US" };

const META_NAMESPACE: Record<PageKey, string> = {
  home: "pages.home.meta",
  tentangKami: "pages.about.meta",
  layanan: "pages.services.meta",
  cekOngkir: "pages.cekOngkir.meta",
  kotaTujuan: "pages.destination.meta",
  artikel: "pages.article.meta",
  faq: "pages.faq.meta",
  kontak: "pages.contact.meta",
};

export function localizedPath(locale: string, path: string): string {
  return `/${locale}${path === "/" ? "" : path}`;
}

export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${siteConfig.url}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export function buildAlternates(locale: string, path: string): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = localizedPath(l, path);
  languages["x-default"] = localizedPath(routing.defaultLocale, path);

  return { canonical: localizedPath(locale, path), languages };
}

type SocialInput = {
  locale: string;
  url: string;
  title: string;
  description: string;
  type?: "website" | "article";
};

export function buildSocial({ locale, url, title, description, type = "website" }: SocialInput): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: OG_LOCALE[locale] ?? OG_LOCALE.id,
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l] as string),
      images: [...seoConfig.openGraph.images],
    },
    twitter: {
      card: seoConfig.twitter.card,
      title,
      description,
      images: [...seoConfig.twitter.images],
    },
  };
}

export async function createPageMetadata(locale: string, page: PageKey): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: META_NAMESPACE[page] });
  const title = t("title");
  const description = t("description");
  const { path } = pageSeo[page];
  const isHome = page === "home";

  return {
    title: isHome ? { absolute: title } : title,
    description,
    alternates: buildAlternates(locale, path),
    ...buildSocial({
      locale,
      url: localizedPath(locale, path),
      title: isHome ? title : `${title} | ${siteConfig.name}`,
      description,
    }),
  };
}
