import { siteConfig } from "@/config/site";

export function createWebsiteSchema() {
  return {
    "@context": "https://schema.org",

    "@type": "WebSite",

    "@id": `${siteConfig.url}#website`,

    name: siteConfig.name,

    url: siteConfig.url,

    description: siteConfig.description,

    inLanguage: ["id-ID", "en-US"],

    publisher: {
      "@id": `${siteConfig.url}#organization`,
    },
  };
}
