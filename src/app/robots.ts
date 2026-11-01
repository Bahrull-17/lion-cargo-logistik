import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Semua crawler (termasuk Googlebot) boleh merayapi situs; hanya area admin & API yang ditutup.
        // /_next/ sengaja TIDAK diblokir agar CSS/JS bisa dirender crawler.
        userAgent: "*",
        allow: ["/"],
        disallow: ["/api/", "/admin/"],
      },
    ],

    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
