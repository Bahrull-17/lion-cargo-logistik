"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { waLink } from "@/utils/wa-link";

interface ItemLayanan {
  id: string;
  nama: string;
  badge: string;
  estimasi: string;
  tagline: string;
  deskripsi: string[];
  imageSrc: string;
  imageAlt: string;
  ctaText: string;
  ctaHref: string;
  isExternal?: boolean;
  features: string[];
  peruntukan: string;
}

const daftarLayanan: ItemLayanan[] = [
  {
    id: "reguler",
    nama: "Cargo Reguler",
    badge: "PALING HEMAT",
    estimasi: "Estimasi: 2 - 3 Hari",
    tagline: "Pengiriman Rutin Antarpulau Hemat & Terjadwal",
    deskripsi: [
      "Pengiriman barang umum via penerbangan berjadwal dari Terminal Kargo Bandara Soekarno-Hatta (CGK) ke berbagai bandara tujuan di seluruh Indonesia.",
      "Layanan eksekusi ekspedisi kargo udara hemat ini sangat cocok untuk pengiriman paket toko online, suku cadang, komoditas daerah, hingga kirim barang pindahan antarpulau dengan perhitungan tarif per kilogram yang transparan.",
      "Mendukung opsi layanan Port to Port maupun Port to Door dengan jaminan penanganan muatan yang aman, teratur, dan mudah dipantau.",
    ],
    imageSrc: "/images/hero-5.jpg",
    imageAlt: "Foto Cargo Reguler Lion Cargo Logistik Bandara Soekarno Hatta",
    ctaText: "Cek Tarif Reguler",
    ctaHref: "/cek-ongkir",
    features: ["⚖️ Tarif per Kg Transparan", "📦 Port to Port / Door", "✈️ Jadwal Terbang Rutin"],
    peruntukan: "Rekomendasi: Toko Online, Distributor, Sparepart, Garmen, & Pindahan.",
  },
  {
    id: "express",
    nama: "Cargo Express",
    badge: "PRIORITAS SLOT",
    estimasi: "Estimasi: 1 - 2 Hari",
    tagline: "Prioritas Muat Penerbangan Pertama dari CGK",
    deskripsi: [
      "Layanan kargo udara berkecepatan tinggi yang mendapatkan kepastian slot prioritas muatan pada jadwal penerbangan paling awal dari Bandara Internasional Soekarno-Hatta.",
      "Sangat direkomendasikan untuk pengiriman barang berharga, sampel industri mendesak, hingga produk makanan segar (perishable goods) yang membutuhkan waktu penanganan minim di perjalanan.",
      "Proses clearance kargo dilakukan secara cepat di terminal pengiriman sehingga paket Anda tiba di kota tujuan dengan estimasi waktu yang efisien dan aman.",
    ],
    imageSrc: "/images/hero-4.png",
    imageAlt: "Foto Cargo Express Prioritas Pesawat Bandara Soetta",
    ctaText: "Tanyakan Express via WA",
    ctaHref: waLink("Halo Lion Cargo Logistik, saya ingin bertanya pengiriman cepat via Cargo Express."),
    isExternal: true,
    features: ["⚡ Flight Slot Pertama", "🍎 Produk Segar & Berharga", "🚀 Fast Track Clearance"],
    peruntukan: "Rekomendasi: Seafood, Makanan Segar, Sampel Pabrik, & Barang Mahal.",
  },
  {
    id: "sameday",
    nama: "Same Day Service",
    badge: "TERBANG HARI INI",
    estimasi: "Estimasi: Tiba Hari Ini",
    tagline: "Kirim Pagi, Tiba di Kota Tujuan Hari Ini Juga",
    deskripsi: [
      "Layanan kilat khusus untuk pengiriman dokumen penting dan paket super mendesak dari Jakarta langsung terbang ke kota tujuan di hari yang sama.",
      "Paket diantar pada pagi hari ke agen kargo Bandara Soekarno-Hatta dan diproses langsung pada jadwal penerbangan komersial harian paling pagi.",
      "Solusi terbaik bagi Anda yang membutuhkan kecepatan waktu pengiriman ekstrem antarpulau tanpa penundaan transit.",
    ],
    imageSrc: "/images/hero-6.jpg",
    imageAlt: "Foto Same Day Service Kargo Udara Kilat",
    ctaText: "Konsultasi Same Day",
    ctaHref: waLink("Halo Lion Cargo Logistik, saya butuh layanan kilat Same Day Service hari ini."),
    isExternal: true,
    features: ["⏱️ Tiba Dalam 24 Jam", "📄 Dokumen & Paket Urgent", "🎯 Direct Flight Priority"],
    peruntukan: "Rekomendasi: Dokumen Tender, Medis/Obat Urgent, & Paspor/Surat Vital.",
  },
];

/* Varian Animasi Elegan untuk Scroll */
const slideUpSmooth: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -45 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 45 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Layanan() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="layanan-heading" className="py-10 sm:py-16 bg-slate-50/60 relative z-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section Layanan */}
        <motion.div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={slideUpSmooth}>
          <h2 id="layanan-heading" className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Opsi Ekspedisi Udara <span className="text-red-600">Sesuai Kebutuhan</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 text-center leading-relaxed">
            Pilih fleksibilitas kecepatan dan kepastian estimasi waktu penerbangan terbaik langsung dari <strong className="font-semibold text-slate-900">Bandara Soekarno-Hatta</strong> ke seluruh penjuru Nusantara.
          </p>
        </motion.div>

        {/* Daftar 3 Layanan Mode Zig-Zag */}
        <div className="space-y-8 sm:space-y-12">
          {daftarLayanan.map((item, index) => {
            const isEven = index % 2 === 1;
            return (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-8 shadow-xs hover:shadow-xl hover:border-red-200 transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-red-600 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Header Khusus Mobile */}
                <div className="lg:hidden space-y-2 mb-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-0.5 rounded-md border border-red-100">{item.badge}</span>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">{item.estimasi}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">{item.nama}</h3>
                  <p className="text-xs font-bold text-red-600">{item.tagline}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                  <motion.div
                    className={`lg:col-span-5 space-y-3 ${isEven ? "lg:order-2" : "lg:order-1"}`}
                    initial={reduceMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={isEven ? slideFromRight : slideFromLeft}
                  >
                    <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl bg-slate-100 border border-slate-200">
                      <Image src={item.imageSrc} alt={item.imageAlt} fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>

                    <div className="grid grid-cols-1 gap-1.5">
                      {item.features.map((ft, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700">
                          <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                          <span>{ft}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    className={`lg:col-span-7 space-y-3.5 ${isEven ? "lg:order-1" : "lg:order-2"}`}
                    initial={reduceMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={isEven ? slideFromLeft : slideFromRight}
                  >
                    <div className="hidden lg:block space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-0.5 rounded-md border border-red-100">{item.badge}</span>
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">{item.estimasi}</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{item.nama}</h3>
                      <p className="text-sm font-bold text-red-600">{item.tagline}</p>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                      {item.deskripsi.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-red-800 bg-red-50/80 border border-red-100 px-3 py-2 rounded-lg inline-block">📌 {item.peruntukan}</p>
                    </div>

                    <div className="pt-1">
                      {item.isExternal ? (
                        <a
                          href={item.ctaHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                        >
                          <MessageCircle className="size-4" />
                          <span>{item.ctaText}</span>
                        </a>
                      ) : (
                        <Link
                          href={item.ctaHref}
                          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                        >
                          <span>{item.ctaText}</span>
                          <ArrowRight className="size-4" />
                        </Link>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
        {/* TOMBOL LINK MELUNCUR DARI KIRI KE KANAN */}
        <motion.div
          initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-16 flex justify-center text-center"
        >
          <Link
            href="/layanan"
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-red-50/80 hover:bg-red-100/80 text-red-600 border border-red-200/80 font-extrabold text-xs sm:text-sm tracking-wide rounded-none transition-all duration-300 group shadow-2xs active:scale-[0.98]"
          >
            <span>Lihat Daftar Rute & Semua Layanan Lengkap</span>
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
