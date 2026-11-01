import { ORGANIZATION_ID } from "./organization";

type ServiceInput = { name: string; description: string };

type ServiceSchemaInput = {
  /** URL halaman layanan (absolut). */
  url: string;
  name: string;
  description: string;
  catalogName: string;
  language: string;
  services: ServiceInput[];
};

/** Schema layanan, dipasang hanya di halaman /layanan dengan teks sesuai bahasa halaman. */
export function createServiceSchema({ url, name, description, catalogName, language, services }: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,

    name,
    serviceType: "Air Cargo Shipping Service",
    description,
    url,
    inLanguage: language,

    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: "Indonesia" },

    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: catalogName,
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          provider: { "@id": ORGANIZATION_ID },
          areaServed: { "@type": "Country", name: "Indonesia" },
        },
      })),
    },
  };
}
