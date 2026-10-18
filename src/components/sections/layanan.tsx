"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { waLink } from "@/utils/wa-link";

interface ItemLayanan {
  id: string;
  nama: string;
  badge: string;
  estimasi: string;
  tagline: string;
  deskripsiSeo: string[];
  imageSrc: string;
  imageAlt: string;
  ctaText: string;
  ctaHref: string;
  isExternal?: boolean;
  features: string[];
}

const daftarLayanan: ItemLayanan[] = [
  {
    id: "reguler",
    nama: "Cargo Reguler",
    badge: "PALING HEMAT",
    estimasi: "Estimasi: 2 - 4 Hari",
    tagline: "Pengiriman Rutin Antarpulau Hemat & Terjadwal",
    deskripsiSeo: [
      "Pengiriman barang umum via penerbangan berjadwal dari Terminal Kargo Bandara Soekarno-Hatta (CGK) ke berbagai bandara tujuan di seluruh Indonesia.",
      "Layanan eksekusi ekspedisi kargo udara hemat ini sangat cocok untuk pengiriman paket toko online, suku cadang, komoditas daerah, hingga kirim barang pindahan antarpulau dengan perhitungan tarif per kilogram yang transparan.",
      "Mendukung opsi layanan Port to Port maupun Port to Door dengan jaminan penanganan muatan yang aman, teratur, dan mudah dipantau.",
    ],
    imageSrc: "/images/hero-5.jpg",
    imageAlt: "Foto Cargo Reguler Lion Cargo Logistik Bandara Soekarno Hatta",
    ctaText: "Cek Tarif Reguler",
    ctaHref: "/cek-ongkir",
    features: ["⚖️ Tarif per Kg Transparan", "📦 Port to Port / Door", "✈️ Jadwal Terbang Rutin"],
  },
  {
    id: "express",
    nama: "Cargo Express",
    badge: "PRIORITAS SLOT",
    estimasi: "Estimasi: 1 - 2 Hari",
    tagline: "Prioritas Muat Penerbangan Pertama dari CGK",
    deskripsiSeo: [
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
  },
  {
    id: "sameday",
    nama: "Same Day Service",
    badge: "TERBANG HARI INI",
    estimasi: "Estimasi: Tiba Hari Ini",
    tagline: "Kirim Pagi, Tiba di Kota Tujuan Hari Ini Juga",
    deskripsiSeo: [
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
  },
];

// Animasi Slow-Motion & Ultra Smooth (Durasi 1.0s - 1.2s)
const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
  },
};

const slideFromBottom: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 },
  },
};

const fadeUpHeader: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Layanan() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="layanan-heading" className="bg-white pt-1 pb-8 sm:pt-2 sm:pb-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div className="max-w-3xl mb-6 sm:mb-8" initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpHeader}>
          <span className="w-fit inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Layanan Cargo Bandara Soekarno-Hatta
          </span>
          <h2 id="layanan-heading" className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-charcoal leading-tight">
            Pilihan Layanan Sesuai <span className="text-brand">Kebutuhan Anda</span>
          </h2>

          <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-muted-foreground">
            Pengiriman langsung dari Terminal Kargo Bandara Soekarno-Hatta (CGK) dengan kepastian penerbangan harian, estimasi waktu yang jelas, serta tarif dihitung transparan per kilogram.
          </p>
        </motion.div>

        {/* List 3 Layanan */}
        <div className="space-y-8 sm:space-y-10">
          {daftarLayanan.map((item) => (
            <div key={item.id} className="border-b border-slate-100 pb-6 sm:pb-8 last:border-b-0 last:pb-0">
              {/* Judul & Badge Khusus Layar HP */}
              <div className="lg:hidden space-y-1 mb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand bg-brand/10 px-2.5 py-0.5 rounded-full">{item.badge}</span>
                  <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">{item.estimasi}</span>
                </div>

                <h3 className="text-xl font-extrabold text-charcoal tracking-tight">{item.nama}</h3>

                <p className="text-sm font-bold text-brand">{item.tagline}</p>
              </div>

              {/* GRID LAYOUT */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
                {/* KOLOM KIRI (Foto + Feature Cards Bergerak Pelan) */}
                <motion.div className="lg:col-span-5 space-y-2.5" initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={slideFromLeft}>
                  <div className="relative aspect-4/3 w-full max-w-[320px] lg:max-w-none overflow-hidden rounded-xl bg-secondary shadow-2xs border border-slate-100">
                    <Image src={item.imageSrc} alt={item.imageAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover transition-transform duration-700 ease-out hover:scale-105" />
                  </div>

                  {/* Feature Cards Masuk dari Bawah dengan Pelan */}
                  <motion.div className="grid grid-cols-1 gap-1.5" initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={slideFromBottom}>
                    {item.features.map((ft, idx) => (
                      <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs">
                        <span>{ft}</span>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* KOLOM KANAN (Teks Deskripsi Masuk dari Kanan secara Pelan) */}
                <motion.div className="lg:col-span-7 space-y-2.5" initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={slideFromRight}>
                  {/* Judul & Badge Khusus Laptop */}
                  <div className="hidden lg:block space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand bg-brand/10 px-3 py-1 rounded-full">{item.badge}</span>
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">{item.estimasi}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight pt-0.5">{item.nama}</h3>

                    <p className="text-base font-bold text-brand">{item.tagline}</p>
                  </div>

                  {/* Deskripsi SEO */}
                  <div className="space-y-1.5 text-sm sm:text-base leading-relaxed text-muted-foreground pt-0.5">
                    {item.deskripsiSeo.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Tombol Aksi / Chat */}
                  <div className="pt-2">
                    {item.isExternal ? (
                      <a
                        href={item.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-brand text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-2xs hover:bg-brand/90 transition-all active:scale-[0.98]"
                      >
                        <MessageCircle className="size-4" />
                        <span>{item.ctaText}</span>
                      </a>
                    ) : (
                      <Link href={item.ctaHref} className="inline-flex items-center gap-2 bg-brand text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-2xs hover:bg-brand/90 transition-all active:scale-[0.98]">
                        <span>{item.ctaText}</span>
                        <ArrowRight className="size-4" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        {/* Link Footer */}
        <motion.div className="mt-8 text-center" initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true }} variants={fadeUpHeader}>
          <Link href="/layanan" className="inline-flex items-center gap-2 text-sm font-bold text-charcoal hover:text-brand transition-colors">
            Lihat daftar rute & semua layanan lengkap &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
