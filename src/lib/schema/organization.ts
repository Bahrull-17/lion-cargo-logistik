import { siteConfig } from "@/config/site";
import { seoConfig } from "@/config/seo";

export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",

    "@id": `${siteConfig.url}#organization`,

    name: siteConfig.name,

    legalName: siteConfig.company.legalName,

    url: siteConfig.url,

    description: siteConfig.description,

    logo: `${siteConfig.url}/images/brand/logo.png`,

    image: `${siteConfig.url}/images/brand/og-image.jpg`,

    telephone: siteConfig.contact.phone,

    email: siteConfig.contact.email,

    sameAs: [...seoConfig.sameAs],

    address: {
      "@type": "PostalAddress",

      streetAddress: siteConfig.contact.address,

      addressLocality: "Tangerang",

      addressRegion: "Banten",

      postalCode: "15126",

      addressCountry: "ID",
    },

    contactPoint: {
      "@type": "ContactPoint",

      telephone: siteConfig.contact.phone,

      email: siteConfig.contact.email,

      contactType: "customer service",

      availableLanguage: ["id", "en"],
    },
  };
}
