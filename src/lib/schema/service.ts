import { siteConfig } from "@/config/site";

export function createServiceSchema() {
  return {
    "@context": "https://schema.org",

    "@type": "Service",

    "@id": `${siteConfig.url}#cargo-service`,

    name: "Jasa Cargo Udara",

    serviceType: "Air Cargo Shipping Service",

    provider: {
      "@id": `${siteConfig.url}#organization`,
    },

    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },

    description: "Lion Cargo Logistik menyediakan layanan cargo udara dari Bandara Internasional Soekarno-Hatta ke berbagai kota di Indonesia dengan pilihan layanan reguler, express, dan same day.",

    hasOfferCatalog: {
      "@type": "OfferCatalog",

      name: "Layanan Cargo Udara",

      itemListElement: [
        {
          "@type": "Offer",

          itemOffered: {
            "@type": "Service",

            name: "Cargo Udara Reguler",

            description: "Layanan pengiriman cargo udara reguler dengan tarif ekonomis melalui jalur penerbangan.",
          },
        },

        {
          "@type": "Offer",

          itemOffered: {
            "@type": "Service",

            name: "Cargo Udara Express",

            description: "Layanan cargo udara express untuk kebutuhan pengiriman lebih cepat.",
          },
        },

        {
          "@type": "Offer",

          itemOffered: {
            "@type": "Service",

            name: "Cargo Same Day",

            description: "Layanan pengiriman cargo udara dengan estimasi tiba di hari yang sama untuk rute tertentu.",
          },
        },
      ],
    },
  };
}
