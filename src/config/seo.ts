export type PageSeo = {
  path: string;

  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";

  priority: number;
};

export const pageSeo = {
  home: { path: "/", changeFrequency: "weekly", priority: 1 },

  cekOngkir: { path: "/cek-ongkir", changeFrequency: "daily", priority: 0.9 },

  layanan: { path: "/layanan", changeFrequency: "monthly", priority: 0.9 },

  kotaTujuan: { path: "/kota-tujuan", changeFrequency: "weekly", priority: 0.8 },

  tentangKami: { path: "/tentang-kami", changeFrequency: "yearly", priority: 0.6 },

  artikel: { path: "/artikel", changeFrequency: "weekly", priority: 0.7 },

  faq: { path: "/faq", changeFrequency: "monthly", priority: 0.7 },

  kontak: { path: "/kontak", changeFrequency: "yearly", priority: 0.7 },
} satisfies Record<string, PageSeo>;

export type PageKey = keyof typeof pageSeo;

export const seoConfig = {
  ogImage: "/images/brand/og-image.jpg",

  googleVerification: "",

  sameAs: [] as string[],

  openGraph: {
    type: "website" as const,

    images: [
      {
        url: "/images/brand/og-image.jpg",

        width: 1424,

        height: 752,

        alt: "Lion Cargo Logistik - Jasa Cargo Udara Bandara Soekarno Hatta",
      },
    ],
  },

  twitter: {
    card: "summary_large_image" as const,

    images: ["/images/brand/og-image.jpg"],
  },
};
