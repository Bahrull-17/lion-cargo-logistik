import { siteConfig } from "@/config/site";

type ArticleSchemaProps = {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
};

export function createArticleSchema({ title, description, url, image = "/images/brand/og-image.jpg", datePublished, dateModified, authorName = siteConfig.name }: ArticleSchemaProps) {
  return {
    "@context": "https://schema.org",

    "@type": "Article",

    headline: title,

    description,

    image: `${siteConfig.url}${image}`,

    url,

    datePublished,

    dateModified: dateModified ?? datePublished,

    author: {
      "@type": "Organization",
      name: authorName,
      url: siteConfig.url,
    },

    publisher: {
      "@type": "Organization",

      name: siteConfig.name,

      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/brand/logo.png`,
      },
    },
  };
}
