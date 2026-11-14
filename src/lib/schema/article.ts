import { siteConfig } from "@/config/site";
import { ORGANIZATION_ID } from "./organization";

type ArticleSchemaProps = {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  language: string;
};

export function createArticleSchema({ title, description, url, image, datePublished, dateModified, authorName, language }: ArticleSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",

    headline: title,
    description,
    image: [image],
    inLanguage: language,

    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,

    datePublished,
    dateModified: dateModified ?? datePublished,

    author: authorName ? { "@type": "Person", name: authorName } : { "@id": ORGANIZATION_ID },

    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/brand/logo.png`,
      },
    },
  };
}
