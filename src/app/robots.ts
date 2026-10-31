import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://lioncargologistik.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/api/", "/admin/", "/_next/"],
      },

      // Google boleh crawl penuh
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: ["/api/", "/admin/"],
      },
    ],

    sitemap: `${baseUrl}/sitemap.xml`,

    host: baseUrl,
  };
}
