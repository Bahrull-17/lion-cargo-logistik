import { siteConfig } from "@/config/site";

export function createLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",

    "@type": "LocalBusiness",

    "@id": `${siteConfig.url}#localbusiness`,

    name: siteConfig.name,

    image: `${siteConfig.url}/images/brand/logo.png`,

    url: siteConfig.url,

    description: siteConfig.description,

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

      latitude: "-6.125199960055543",

      longitude: "106.66258887316575",
    },

    hasMap: siteConfig.contact.maps,

    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",

      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],

      opens: "00:00",

      closes: "23:59",
    },

    areaServed: {
      "@type": "Country",

      name: "Indonesia",
    },

    serviceType: ["Cargo Udara", "Pengiriman Barang via Pesawat", "Jasa Cargo Bandara Soekarno-Hatta", "Port to Port Cargo"],

    priceRange: "$$",

    parentOrganization: {
      "@id": `${siteConfig.url}#organization`,
    },
  };
}
