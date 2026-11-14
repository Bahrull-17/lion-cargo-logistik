import { siteConfig } from "@/config/site";
import { seoConfig } from "@/config/seo";

export const ORGANIZATION_ID = `${siteConfig.url}/#organization`;

export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": ORGANIZATION_ID,

    name: siteConfig.name,
    legalName: siteConfig.company.legalName,
    url: siteConfig.url,
    description: siteConfig.description,

    logo: `${siteConfig.url}/images/brand/logo.png`,
    image: `${siteConfig.url}/images/brand/og-image.jpg`,

    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,

    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: "Tangerang",
      addressRegion: "Banten",
      postalCode: "15126",
      addressCountry: "ID",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.contact.geo.latitude,
      longitude: siteConfig.contact.geo.longitude,
    },

    hasMap: siteConfig.contact.maps,

    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },

    areaServed: { "@type": "Country", name: "Indonesia" },

    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      contactType: "customer service",
      availableLanguage: ["Indonesian", "English"],
    },

    ...(seoConfig.sameAs.length > 0 ? { sameAs: [...seoConfig.sameAs] } : {}),
  };
}
