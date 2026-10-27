export type PageSeo = {
  /** Path halaman, juga dipakai sebagai canonical dan sitemap. */
  path: string;
  /** Tanpa nama brand: layout sudah menambahkan " | Lion Cargo Logistik". */
  title: string;
  /** Idealnya 120-160 karakter. */
  description: string;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  /** 0.0 sampai 1.0, untuk sitemap. */
  priority: number;
};

export const seoConfig = {
  /** Tipe bisnis menurut schema.org (jenis yang didukung Google). */
  schemaType: "LocalBusiness",
  /** Gambar preview saat tautan dibagikan. Ganti dengan file 1200x630 px. */
  ogImage: "/images/layanan/layanan.jpg",
  /** Token verifikasi Google Search Console. Kosongkan jika belum ada. */
  googleVerification: "",
  /**
   * Akun resmi (Instagram, Facebook, LinkedIn, profil Google Bisnis, dst.).
   * Isi hanya URL yang benar-benar ada; array kosong berarti tidak ditampilkan.
   */
  sameAs: [] as string[],
};

/** Metadata tiap halaman. Dipakai oleh generateMetadata dan sitemap. */
export const pageSeo = {
  home: {
    path: "/",
    title: "Jasa Cargo Udara Soekarno-Hatta | Lion Cargo Logistik",
    description: "Kirim barang dan dokumen via cargo udara dari Soekarno-Hatta (CGK) ke seluruh Indonesia. Tarif per kg jelas, cek ongkir online, respon cepat via WhatsApp.",
    changeFrequency: "weekly",
    priority: 1,
  },
  cekOngkir: {
    path: "/cek-ongkir",
    title: "Cek Ongkir Cargo Udara",
    description: "Cek ongkir cargo udara dari Bandara Soekarno-Hatta (CGK) ke kota tujuan di seluruh Indonesia. Hitung tarif per kg dan biaya penanganan admin dengan mudah.",
    changeFrequency: "daily",
    priority: 0.9,
  },
  layanan: {
    path: "/layanan",
    title: "Layanan Cargo Udara Reguler & Express",
    description: "Pilih layanan cargo udara dari Soekarno-Hatta (CGK): Reguler hemat, Express prioritas, Same Day. Port to port, jadwal harian, tarif per kg transparan.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  kotaTujuan: {
    path: "/kota-tujuan",
    title: "Kota Tujuan & Rute Cargo Udara",
    description: "Daftar kota tujuan dan rute cargo udara dari Bandara Soekarno-Hatta (CGK) ke Sumatera, Jawa, Kalimantan, Sulawesi, Bali, Nusa Tenggara, hingga Papua.",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  tentangKami: {
    path: "/tentang-kami",
    title: "Agen Cargo Udara Resmi Soekarno-Hatta",
    description: "Kenali Lion Cargo Logistik, agen cargo udara di Terminal Kargo Soekarno-Hatta (CGK) yang melayani pengiriman antar kota dengan penanganan aman dan transparan.",
    changeFrequency: "yearly",
    priority: 0.6,
  },
  artikel: {
    path: "/artikel",
    title: "Artikel & Tips Cargo Udara",
    description: "Panduan kirim barang lewat cargo udara: prosedur, tips packing, regulasi bandara, dan strategi logistik dari tim Lion Cargo Logistik di Bandara Soekarno-Hatta.",
    changeFrequency: "weekly",
    priority: 0.7,
  },
  faq: {
    path: "/faq",
    title: "FAQ Pengiriman Cargo Udara",
    description: "Jawaban pertanyaan umum soal cargo udara: cara kirim, dokumen, estimasi waktu, barang terlarang, berat volumetrik, tarif, dan pembayaran di Lion Cargo Logistik.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  kontak: {
    path: "/kontak",
    title: "Kontak & Lokasi Kantor CGK",
    description: "Hubungi Lion Cargo Logistik di Gedung RA Gatrans, Terminal Kargo Bandara Soekarno-Hatta. Buka Senin - Minggu 24 jam. Konsultasi tarif dan rute via WhatsApp.",
    changeFrequency: "yearly",
    priority: 0.7,
  },
} satisfies Record<string, PageSeo>;

export type PageKey = keyof typeof pageSeo;
