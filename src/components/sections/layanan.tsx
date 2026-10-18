"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { waLink } from "@/utils/wa-link";

interface ItemLayanan {
  id: string;
  no: string;
  nama: string;
  badge: string;
  estimasi: string;
  tagline: string;
  deskripsi: string;
  imageSrc: string;
  imageAlt: string;
  ctaText: string;
  ctaHref: string;
  isExternal?: boolean;
}

const daftarLayanan: ItemLayanan[] = [
  {
    id: "reguler",
    no: "01",
    nama: "Cargo Reguler",
    badge: "Paling Hemat",
    estimasi: "2 - 4 Hari",
    tagline: "Pengiriman Rutin Antarpulau Hemat & Terjadwal",
    deskripsi: "Pengiriman barang umum via penerbangan berjadwal dari Bandara Soekarno-Hatta (CGK) ke berbagai kota tujuan di Indonesia. Cocok untuk paket toko online, suku cadang, hingga pengiriman berkala.",
    imageSrc: "/images/hero-5.jpg", // Ganti dengan foto kargo umum/kardus
    imageAlt: "Foto Cargo Reguler",
    ctaText: "Cek Tarif Reguler",
    ctaHref: "/cek-ongkir",
  },
  {
    id: "express",
    no: "02",
    nama: "Cargo Express",
    badge: "Prioritas Slot",
    estimasi: "1 - 2 Hari",
    tagline: "Prioritas Muat Penerbangan Pertama dari CGK",
    deskripsi: "Layanan kargo berkecepatan tinggi yang mendapatkan slot prioritas muatan pesawat. Sangat pas untuk makanan/produk segar dan barang berharga yang mengejar waktu.",
    imageSrc: "/images/hero-4.png", // Ganti dengan foto kargo express/pesawat
    imageAlt: "Foto Cargo Express",
    ctaText: "Tanyakan Express via WA",
    ctaHref: waLink("Halo Lion Cargo Logistik, saya ingin bertanya layanan Cargo Express."),
    isExternal: true,
  },
  {
    id: "sameday",
    no: "03",
    nama: "Same Day Service",
    badge: "Terbang Hari Ini",
    estimasi: "Tiba Hari Ini*",
    tagline: "Kirim Pagi, Tiba di Kota Tujuan Hari Ini Juga",
    deskripsi: "Layanan kilat khusus untuk dokumen atau paket yang sangat mendesak. Paket diantar pagi ke Terminal Kargo Soekarno-Hatta dan langsung diterbangkan di penerbangan harian paling awal.",
    imageSrc: "/images/hero-6.jpg", // Ganti dengan foto kargo kilat/dokumen
    imageAlt: "Foto Same Day Service",
    ctaText: "Konsultasi Same Day",
    ctaHref: waLink("Halo Lion Cargo Logistik, saya butuh layanan Same Day hari ini."),
    isExternal: true,
  },
];

// Animasi Meluncur Halus dari Bawah ke Atas
const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Layanan() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="layanan-heading" className="bg-white py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div className="max-w-3xl" initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={slideUp}>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand">Layanan Cargo Udara Soetta</span>
          <h2 id="layanan-heading" className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-charcoal leading-tight">
            Pilihan Layanan Sesuai Kebutuhan Anda
          </h2>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted-foreground">Pengiriman langsung dari Bandara Soekarno-Hatta (CGK) dengan estimasi waktu yang jelas dan tarif dihitung per kilogram.</p>
        </motion.div>

        {/* List Layanan (Gambar Ekstra Kecil) */}
        <div className="mt-14 sm:mt-20 space-y-12 sm:space-y-20">
          {daftarLayanan.map((item) => (
            <motion.div key={item.id} initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={slideUp} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Kolom GAMBAR (Ekstra Kecil: col-span-3, max-w-[280px]) */}
              <div className="lg:col-span-3 flex justify-start">
                <div className="relative aspect-4/3 w-full max-w-[280px] overflow-hidden rounded-xl bg-secondary shadow-2xs">
                  <Image src={item.imageSrc} alt={item.imageAlt} fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover transition-transform duration-500 hover:scale-105" />
                </div>
              </div>

              {/* Kolom TEKS (Dominan: col-span-9) */}
              <div className="lg:col-span-9 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand bg-brand/10 px-3 py-1 rounded-full">{item.badge}</span>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Estimasi: {item.estimasi}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">{item.nama}</h3>

                <p className="text-base sm:text-lg font-bold text-brand">{item.tagline}</p>

                <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-3xl">{item.deskripsi}</p>

                {/* Tombol Aksi */}
                <div className="pt-2">
                  {item.isExternal ? (
                    <a
                      href={item.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-brand text-white font-bold px-5 py-3 rounded-xl text-sm shadow-2xs hover:bg-brand/90 transition-all active:scale-[0.98]"
                    >
                      <MessageCircle className="size-4" />
                      <span>{item.ctaText}</span>
                    </a>
                  ) : (
                    <Link href={item.ctaHref} className="inline-flex items-center gap-2 bg-brand text-white font-bold px-5 py-3 rounded-xl text-sm shadow-2xs hover:bg-brand/90 transition-all active:scale-[0.98]">
                      <span>{item.ctaText}</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Link Footer */}
        <motion.div className="mt-16 text-center" initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true }} variants={slideUp}>
          <Link href="/layanan" className="inline-flex items-center gap-2 text-sm font-bold text-charcoal hover:text-brand transition-colors">
            Lihat daftar rute & semua layanan lengkap &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
