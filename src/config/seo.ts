export type PageSeo = {
  path: string;

  title: string;

  description: string;

  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";

  priority: number;
};

export const seoConfig = {
  ogImage: "/images/brand/og-image.jpg",

  googleVerification: "",

  sameAs: [] as string[],

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,

      "max-image-preview": "large",

      "max-snippet": -1,

      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website" as const,

    locale: "id_ID",

    alternateLocale: ["en_US"],

    images: [
      {
        url: "/images/brand/og-image.jpg",

        width: 1200,

        height: 630,

        alt: "Lion Cargo Logistik - Jasa Cargo Udara Bandara Soekarno Hatta",
      },
    ],
  },

  twitter: {
    card: "summary_large_image" as const,

    images: ["/images/brand/og-image.jpg"],
  },
};

export const pageSeo = {
  home: {
    path: "/",

    title: "Jasa Cargo Udara Soekarno-Hatta",

    description: "Kirim barang melalui cargo udara dari Bandara Soekarno-Hatta (CGK) ke berbagai kota di Indonesia. Layanan reguler, express, cek tarif cargo per kg, dan konsultasi cepat via WhatsApp.",

    changeFrequency: "weekly",

    priority: 1,
  },

  cekOngkir: {
    path: "/cek-ongkir",

    title: "Cek Ongkir Cargo Udara",

    description: "Cek ongkir cargo udara dari Bandara Soekarno-Hatta menuju berbagai kota Indonesia.",

    changeFrequency: "daily",

    priority: 0.9,
  },

  layanan: {
    path: "/layanan",

    title: "Layanan Cargo Udara Reguler & Express",

    description: "Pilihan layanan cargo udara Reguler, Express, dan Same Day dari Bandara Soekarno-Hatta.",

    changeFrequency: "monthly",

    priority: 0.9,
  },

  kotaTujuan: {
    path: "/kota-tujuan",

    title: "Kota Tujuan & Rute Cargo Udara",

    description: "Daftar kota tujuan dan rute cargo udara dari Bandara Soekarno-Hatta ke seluruh Indonesia.",

    changeFrequency: "weekly",

    priority: 0.8,
  },

  tentangKami: {
    path: "/tentang-kami",

    title: "Tentang Lion Cargo Logistik",

    description: "Kenali Lion Cargo Logistik sebagai penyedia layanan cargo udara dari Terminal Kargo Bandara Soekarno-Hatta.",

    changeFrequency: "yearly",

    priority: 0.6,
  },

  artikel: {
    path: "/artikel",

    title: "Artikel & Informasi Cargo Udara",

    description: "Informasi cargo udara, packing barang, regulasi bandara, dan logistik.",

    changeFrequency: "weekly",

    priority: 0.7,
  },

  faq: {
    path: "/faq",

    title: "FAQ Pengiriman Cargo Udara",

    description: "Pertanyaan umum tentang pengiriman cargo udara.",

    changeFrequency: "monthly",

    priority: 0.7,
  },

  kontak: {
    path: "/kontak",

    title: "Kontak Lion Cargo Logistik",

    description: "Hubungi Lion Cargo Logistik untuk konsultasi cargo udara.",

    changeFrequency: "yearly",

    priority: 0.7,
  },
} satisfies Record<string, PageSeo>;

export type PageKey = keyof typeof pageSeo;
