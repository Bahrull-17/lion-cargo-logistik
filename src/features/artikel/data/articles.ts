export interface ArtikelDetail {
  id: string;
  slug: string;
  judul: string;
  excerpt: string;
  kategori: "Tips Pengiriman" | "Regulasi Kargo" | "Info Bandara" | "Bisnis & Logistik";
  tanggal: string;
  waktuBaca: string;
  penulis: string;
  gambar: string;
  isFeatured?: boolean;
  isiHtml: string;
}

export const daftarArtikel: ArtikelDetail[] = [
  {
    id: "1",
    slug: "panduan-lengkap-kirim-barang-lewat-kargo-udara-soekarno-hatta",
    judul: "Panduan Lengkap Kirim Barang Lewat Kargo Udara dari Bandara Soekarno-Hatta (CGK)",
    excerpt: "Ketahui prosedur, dokumen yang diperlukan, serta tips packing aman agar kiriman paket kilat Anda cepat sampai tujuan tanpa kendala di bandara.",
    kategori: "Tips Pengiriman",
    tanggal: "24 Oktober 2026",
    waktuBaca: "5 Menit Baca",
    penulis: "Tim Operasional Lion Cargo",
    gambar: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    isFeatured: true,
    isiHtml: `
      <p class="text-base sm:text-lg text-slate-700 leading-relaxed font-normal mb-6">
        Pengiriman barang menggunakan penerbangan kargo udara merupakan solusi tercepat untuk mendistribusikan komoditas bisnis, dokumen penting, maupun produk UMKM ke berbagai pelosok Indonesia. Namun, bagi Anda yang baru pertama kali mengirim barang via Terminal Kargo Bandara Soekarno-Hatta (CGK), ada beberapa tahapan penting yang wajib dipahami.
      </p>
      <h2 class="text-xl sm:text-2xl font-black text-slate-900 mt-8 mb-4">1. Menyiapkan Dokumen &amp; Identitas Pengirim</h2>
      <p class="text-slate-700 leading-relaxed mb-4">Pastikan Anda menyiapkan KTP asli dan data penerima secara lengkap dan valid.</p>
      <h2 class="text-xl sm:text-2xl font-black text-slate-900 mt-8 mb-4">2. Memastikan Standar Kemasan (Packing)</h2>
      <p class="text-slate-700 leading-relaxed mb-6">Gunakan karton tebal atau packing kayu untuk melindungi barang selama penerbangan.</p>
    `,
  },
  {
    id: "2",
    slug: "syarat-dan-ketentuan-pengiriman-hewan-peliharaan-via-kargo",
    judul: "Syarat dan Ketentuan Penting Pengiriman Hewan Peliharaan (Live Animal) via Kargo",
    excerpt: "Mengirim anabul kesayangan menggunakan pesawat membutuhkan surat karantina, kandang standar penerbangan, dan penanganan khusus.",
    kategori: "Regulasi Kargo",
    tanggal: "22 Oktober 2026",
    waktuBaca: "4 Menit Baca",
    penulis: "Dokter Hewan Karantina Kargo",
    gambar: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1200&auto=format&fit=crop",
    isiHtml: `
      <p class="text-base sm:text-lg text-slate-700 leading-relaxed font-normal mb-6">
        Mengirim hewan peliharaan seperti anjing atau kucing kesayangan menggunakan pesawat membutuhkan perhatian khusus demi kenyamanan dan keselamatan sang hewan.
      </p>
      <h2 class="text-xl sm:text-2xl font-black text-slate-900 mt-8 mb-4">1. Surat Keterangan Kesehatan Hewan (SKKH)</h2>
      <p class="text-slate-700 leading-relaxed mb-4">Hewan harus diperiksa oleh dokter hewan resmi dan dilengkapi buku vaksinasi.</p>
      <h2 class="text-xl sm:text-2xl font-black text-slate-900 mt-8 mb-4">2. Kandang Standar Penerbangan (IATA Standard)</h2>
      <p class="text-slate-700 leading-relaxed mb-6">Kandang wajib berukuran cukup untuk hewan berdiri, memiliki ventilasi udara yang baik, serta alas penyerap cairan.</p>
    `,
  },
  {
    id: "3",
    slug: "keunggulan-pengiriman-port-to-port-vs-door-to-door",
    judul: "Mana yang Lebih Efisien? Memahami Perbedaan Port-to-Port dan Door-to-Door",
    excerpt: "Analisis mendalam bagi pelaku bisnis dalam memilih layanan ekspedisi kargo udara yang paling hemat biaya dan efisien waktu.",
    kategori: "Bisnis & Logistik",
    tanggal: "19 Oktober 2026",
    waktuBaca: "6 Menit Baca",
    penulis: "Logistik Strategist",
    gambar: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop",
    isiHtml: `
      <p class="text-base sm:text-lg text-slate-700 leading-relaxed font-normal mb-6">
        Dalam dunia ekspedisi kargo udara, pemilihan jenis layanan pengiriman sangat memengaruhi anggaran operasional perusahaan Anda.
      </p>
      <h2 class="text-xl sm:text-2xl font-black text-slate-900 mt-8 mb-4">1. Layanan Port-to-Port</h2>
      <p class="text-slate-700 leading-relaxed mb-4">Pengirim mengantar barang ke bandara asal, dan penerima mengambil di bandara tujuan.</p>
      <h2 class="text-xl sm:text-2xl font-black text-slate-900 mt-8 mb-4">2. Layanan Door-to-Door</h2>
      <p class="text-slate-700 leading-relaxed mb-6">Kurir kami menjemput barang langsung dari alamat Anda hingga sampai di alamat tujuan akhir.</p>
    `,
  },
  {
    id: "4",
    slug: "mengenal-alur-operasional-terminal-kargo-cgk",
    judul: "Mengenal Alur Operasional di Terminal Kargo Internasional & Domestik CGK",
    excerpt: "Bagaimana proses dari penimbangan barang, pemeriksaan X-ray, hingga muat ke lambung pesawat kargo udara komersial.",
    kategori: "Info Bandara",
    tanggal: "15 Oktober 2026",
    waktuBaca: "4 Menit Baca",
    penulis: "Airport Operations Team",
    gambar: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
    isiHtml: `
      <p class="text-base sm:text-lg text-slate-700 leading-relaxed font-normal mb-6">
        Pernahkah Anda bertanya-tanya bagaimana proses paket Anda dari saat diserahkan hingga akhirnya mendarat di pulau seberang? Berikut adalah transparansi alur kerja di Terminal Kargo CGK.
      </p>
    `,
  },
  {
    id: "5",
    slug: "tips-packing-barang-pecah-belah-untuk-kargo-pesawat",
    judul: "Tips Packing Kayu & Pelindung Barang Pecah Belah untuk Kargo Pesawat",
    excerpt: "Lindungi barang elektronik dan keramik Anda dari benturan ekstrem selama proses penerbangan antarpulau di Indonesia.",
    kategori: "Tips Pengiriman",
    tanggal: "10 Oktober 2026",
    waktuBaca: "5 Menit Baca",
    penulis: "Packing Specialist",
    gambar: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop",
    isiHtml: `
      <p class="text-base sm:text-lg text-slate-700 leading-relaxed font-normal mb-6">
        Barang pecah belah seperti keramik, akuarium, atau perangkat elektronik sensitif membutuhkan perlindungan ekstra berupa *bubble wrap* tebal dan peti kayu solid.
      </p>
    `,
  },
  {
    id: "6",
    slug: "strategi-logistik-umkm-ekspansi-pasar-luar-jawa",
    judul: "Strategi Logistik bagi UMKM untuk Melakukan Ekspansi Pasar ke Luar Jawa",
    excerpt: "Manfaatkan kecepatan jalur udara untuk mengirimkan produk kuliner, fashion, dan kerajinan tangan ke seluruh Nusantara.",
    kategori: "Bisnis & Logistik",
    tanggal: "05 Oktober 2026",
    waktuBaca: "7 Menit Baca",
    penulis: "Business Developer",
    gambar: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=1200&auto=format&fit=crop",
    isiHtml: `
      <p class="text-base sm:text-lg text-slate-700 leading-relaxed font-normal mb-6">
        Kecepatan pengiriman adalah kunci utama kepuasan pelanggan online shop. Dengan memanfaatkan jalur kargo udara harian, UMKM lokal dapat memperluas jangkauan pasar hingga ke pulau terluar.
      </p>
    `,
  },
];

// Helper function untuk mengambil artikel berdasarkan slug
export function getArtikelBySlug(slug: string): ArtikelDetail | undefined {
  return daftarArtikel.find((item) => item.slug === slug);
}
