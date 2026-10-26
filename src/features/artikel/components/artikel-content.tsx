"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, ArrowUpRight, Clock, Calendar, Sparkles, BookOpen } from "lucide-react";
import { waLink } from "@/lib/wa-link";

export interface ArtikelItem {
  id: string;
  slug: string;
  judul: string;
  excerpt: string;
  kategori: "Tips Pengiriman" | "Regulasi Kargo" | "Info Bandara" | "Bisnis & Logistik";
  tanggal: string;
  waktuBaca: string;
  gambar: string;
  isFeatured?: boolean;
}

const daftarKategori = [
  { key: "semua", label: "Semua Artikel" },
  { key: "Tips Pengiriman", label: "Tips Pengiriman" },
  { key: "Regulasi Kargo", label: "Regulasi Kargo" },
  { key: "Info Bandara", label: "Info Bandara" },
  { key: "Bisnis & Logistik", label: "Bisnis & Logistik" },
];

const daftarArtikelDummy: ArtikelItem[] = [
  {
    id: "1",
    slug: "panduan-lengkap-kirim-barang-lewat-kargo-udara-soekarno-hatta",
    judul: "Panduan Lengkap Kirim Barang Lewat Kargo Udara dari Bandara Soekarno-Hatta (CGK)",
    excerpt: "Ketahui prosedur, dokumen yang diperlukan, serta tips packing aman agar kiriman paket kilat Anda cepat sampai tujuan tanpa kendala di bandara.",
    kategori: "Tips Pengiriman",
    tanggal: "24 Oktober 2026",
    waktuBaca: "5 Menit Baca",
    gambar: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    isFeatured: true,
  },
  {
    id: "2",
    slug: "syarat-dan-ketentuan-pengiriman-hewan-peliharaan-via-kargo",
    judul: "Syarat dan Ketentuan Penting Pengiriman Hewan Peliharaan (Live Animal) via Kargo",
    excerpt: "Mengirim anabul kesayangan menggunakan pesawat membutuhkan surat karantina, kandang standar penerbangan, dan penanganan khusus.",
    kategori: "Regulasi Kargo",
    tanggal: "22 Oktober 2026",
    waktuBaca: "4 Menit Baca",
    gambar: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    slug: "keunggulan-pengiriman-port-to-port-vs-door-to-door",
    judul: "Mana yang Lebih Efisien? Memahami Perbedaan Port-to-Port dan Door-to-Door",
    excerpt: "Analisis mendalam bagi pelaku bisnis dalam memilih layanan ekspedisi kargo udara yang paling hemat biaya dan efisien waktu.",
    kategori: "Bisnis & Logistik",
    tanggal: "19 Oktober 2026",
    waktuBaca: "6 Menit Baca",
    gambar: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    slug: "mengenal-alur-operasional-terminal-kargo-cgk",
    judul: "Mengenal Alur Operasional di Terminal Kargo Internasional & Domestik CGK",
    excerpt: "Bagaimana proses dari penimbangan barang, pemeriksaan X-ray, hingga muat ke lambung pesawat kargo udara komersial.",
    kategori: "Info Bandara",
    tanggal: "15 Oktober 2026",
    waktuBaca: "4 Menit Baca",
    gambar: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "5",
    slug: "tips-packing-barang-pecah-belah-untuk-kargo-pesawat",
    judul: "Tips Packing Kayu & Pelindung Barang Pecah Belah untuk Kargo Pesawat",
    excerpt: "Lindungi barang elektronik dan keramik Anda dari benturan ekstrem selama proses penerbangan antarpulau di Indonesia.",
    kategori: "Tips Pengiriman",
    tanggal: "10 Oktober 2026",
    waktuBaca: "5 Menit Baca",
    gambar: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "6",
    slug: "strategi-logistik-umkm-ekspansi-pasar-luar-jawa",
    judul: "Strategi Logistik bagi UMKM untuk Melakukan Ekspansi Pasar ke Luar Jawa",
    excerpt: "Manfaatkan kecepatan jalur udara untuk mengirimkan produk kuliner, fashion, dan kerajinan tangan ke seluruh Nusantara.",
    kategori: "Bisnis & Logistik",
    tanggal: "05 Oktober 2026",
    waktuBaca: "7 Menit Baca",
    gambar: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=800&auto=format&fit=crop",
  },
];

export function ArtikelContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("semua");

  const filteredArtikel = useMemo(() => {
    return daftarArtikelDummy.filter((item) => {
      const matchSearch = item.judul.toLowerCase().includes(searchQuery.toLowerCase()) || item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchKategori = selectedKategori === "semua" || item.kategori === selectedKategori;

      return matchSearch && matchKategori;
    });
  }, [searchQuery, selectedKategori]);

  const featuredArtikel = daftarArtikelDummy.find((item) => item.isFeatured);

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen pb-12 sm:pb-16 overflow-hidden relative">
      {/* 1. HEADER & HERO SECTION */}
      <section className="w-full bg-white border-b border-slate-200/60 pt-6 pb-10 sm:pb-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-4 sm:mb-6">
            <Link href="/" className="hover:text-red-600 transition-colors flex items-center gap-1 text-slate-600">
              Beranda
            </Link>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="text-red-600 font-bold">Artikel &amp; Panduan</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Pusat Informasi &amp; <br className="hidden sm:inline" />
              <span className="inline-block mt-1 px-4 py-1 bg-red-600 text-white rounded-2xl shadow-lg shadow-red-600/20 transform -rotate-1">Wawasan Kargo Udara</span>
            </h1>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto pt-1">
              Temukan berbagai panduan lengkap seputar prosedur pengiriman barang, tips keamanan packing, regulasi bandara, serta strategi logistik terpercaya langsung dari para ahli{" "}
              <strong className="text-slate-900">Lion Cargo Logistik Bandara Soekarno-Hatta (CGK)</strong>.
            </p>

            <div className="pt-3 max-w-xl mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-4 size-5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari artikel, tips pengiriman, atau regulasi kargo..."
                  className="w-full pl-12 pr-4 py-3.5 sm:py-4 bg-white rounded-2xl border-2 border-slate-200 text-xs sm:text-sm text-slate-900 font-semibold shadow-xs focus:border-red-600 focus:outline-hidden transition-all placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-4 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer">
                    Hapus
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED ARTICLE BANNER */}
      {!searchQuery && selectedKategori === "semua" && featuredArtikel && (
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase font-mono">
            <Sparkles className="size-4 text-red-600" />
            <span>ARTIKEL UNGGULAN PILIHAN</span>
          </div>

          <Link
            href={`/artikel/${featuredArtikel.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-red-300 transition-all duration-300"
          >
            <div className="lg:col-span-6 relative min-h-60 sm:min-h-75 overflow-hidden bg-slate-100">
              <Image src={featuredArtikel.gambar} alt={featuredArtikel.judul} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-lg tracking-wider shadow-md">{featuredArtikel.kategori}</div>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3.5 text-red-600" />
                    {featuredArtikel.tanggal}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5 text-red-600" />
                    {featuredArtikel.waktuBaca}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-red-600 transition-colors leading-tight">{featuredArtikel.judul}</h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">{featuredArtikel.excerpt}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-red-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Baca Selengkapnya <ChevronRight className="size-4" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* 3. FILTER KATEGORI & GRID ARTIKEL */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-4 mb-6 sm:mb-8 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {daftarKategori.map((kat) => {
            const isActive = selectedKategori === kat.key;
            return (
              <button
                key={kat.key}
                onClick={() => setSelectedKategori(kat.key)}
                className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  isActive ? "bg-red-600 text-white shadow-md shadow-red-600/25 scale-[1.02]" : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {kat.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between mb-4 text-xs font-mono font-bold text-slate-500">
          <span>MENAMPILKAN {filteredArtikel.length} ARTIKEL</span>
          {searchQuery && <span className="text-red-600">Pencarian: &quot;{searchQuery}&quot;</span>}
        </div>

        {filteredArtikel.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredArtikel.map((item) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="group flex flex-col justify-between bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-red-300 transition-all duration-300"
                >
                  <div>
                    <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                      <Image src={item.gambar} alt={item.judul} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-lg tracking-wider shadow-xs">{item.kategori}</div>
                    </div>

                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3 text-red-600" />
                          {item.tanggal}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3 text-red-600" />
                          {item.waktuBaca}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">{item.judul}</h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">{item.excerpt}</p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pt-0">
                    <Link
                      href={`/artikel/${item.slug}`}
                      className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl bg-slate-50 group-hover:bg-red-600 border border-slate-200 group-hover:border-red-600 text-xs font-bold text-slate-800 group-hover:text-white transition-all shadow-xs"
                    >
                      <span>Baca Artikel</span>
                      <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6">
            <BookOpen className="size-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">Artikel Tidak Ditemukan</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Maaf, topik atau kata kunci artikel yang Anda cari tidak tersedia. Silakan gunakan kata kunci lain.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedKategori("semua");
              }}
              className="mt-4 inline-flex items-center gap-2 bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md hover:bg-red-700 transition-all cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        )}
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="mt-8 pb-4 pt-6 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight mb-4">
              Punya pertanyaan seputar <span className="text-red-600">pengiriman kargo ?</span>
            </motion.h2>

            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }} className="flex items-center justify-center gap-3 mb-4">
              <a
                href={waLink("Halo Lion Cargo Logistik, saya ingin berkonsultasi mengenai pengiriman kargo.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-red-600 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-red-600/20 hover:bg-red-700 hover:shadow-red-600/40 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                KONSULTASI VIA WHATSAPP
              </a>

              <a
                href={waLink("Halo Lion Cargo Logistik, saya ingin berkonsultasi mengenai pengiriman kargo.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Konsultasi melalui WhatsApp"
                className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 text-white shadow-md shadow-red-600/20 hover:bg-red-700 hover:shadow-red-600/40 hover:scale-110 hover:rotate-12 active:scale-95 transition-all duration-300"
              >
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl">
              <span className="font-bold text-slate-900">Lion Cargo Logistik</span>, <span className="text-red-600 font-semibold">#KirimAmanSampaiTujuan</span> – Solusi logistik kargo udara lengkap &amp; terpercaya dari Bandara
              Soekarno-Hatta!
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
}
