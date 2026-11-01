import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { pageSeo } from "@/config/seo";
import { routing } from "@/i18n/routing";
import { getArticleSitemapEntries, type ArticleSitemapEntry } from "@/services/artikel.service";
import { localizedPath } from "@/lib/seo/metadata";

const abs = (path: string) => `${siteConfig.url}${path}`;

function staticEntries(): MetadataRoute.Sitemap {
  return Object.values(pageSeo).flatMap((page) => {
    // Semua bahasa saling menunjuk (hreflang) + x-default ke bahasa utama.
    const languages: Record<string, string> = Object.fromEntries(routing.locales.map((l) => [l, abs(localizedPath(l, page.path))]));
    languages["x-default"] = abs(localizedPath(routing.defaultLocale, page.path));

    return routing.locales.map((locale) => ({
      url: abs(localizedPath(locale, page.path)),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages },
    }));
  });
}

function articleEntries(articles: ArticleSitemapEntry[]): MetadataRoute.Sitemap {
  return articles.flatMap((article) => {
    // hreflang hanya untuk bahasa yang sudah terbit.
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      const slug = article.slugs[locale];
      if (slug) languages[locale] = abs(localizedPath(locale, `/artikel/${slug}`));
    }
    const defaultUrl = languages[routing.defaultLocale] ?? Object.values(languages)[0];
    if (defaultUrl) languages["x-default"] = defaultUrl;

    return routing.locales.flatMap((locale) => {
      const slug = article.slugs[locale];
      if (!slug) return [];

      return [
        {
          url: abs(localizedPath(locale, `/artikel/${slug}`)),
          lastModified: new Date(article.updatedAt),
          changeFrequency: "monthly" as const,
          priority: 0.6,
          alternates: { languages },
        },
      ];
    });
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articles: ArticleSitemapEntry[] = [];

  try {
    articles = await getArticleSitemapEntries();
  } catch (err) {
    // Sitemap tetap terbit (halaman statis) bila database sedang tidak tersedia.
    console.warn("Gagal memuat artikel untuk sitemap:", err);
  }

  return [...staticEntries(), ...articleEntries(articles)];
}
