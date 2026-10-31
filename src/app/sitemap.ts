import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { pageSeo } from "@/config/seo";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const pages = Object.values(pageSeo);

  const lastModified = new Date("2026-10-31");

  return routing.locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page.path === "/" ? "" : page.path}`,

      lastModified,

      changeFrequency: page.changeFrequency,

      priority: page.priority,
    })),
  );
}
