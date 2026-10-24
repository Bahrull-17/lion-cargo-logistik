"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Workflow, ArrowRight, MessageCircle, Plane, ChevronRight, Calculator, CheckCircle2, ShieldCheck, Clock, Navigation, Layers, ShieldAlert, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion, Variants } from "framer-motion";
import { waLink } from "@/utils/wa-link";

/* Kota tujuan yang bergulir di kalimat penawaran hero. */
const KOTA_TUJUAN = ["Denpasar", "Makassar", "Medan", "Balikpapan", "Surabaya", "Manado", "Jayapura"];
const KOTA_TERPANJANG = "Balikpapan";

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

const alurPengiriman = [
  {
    image: "/images/tarif.png",
    alt: "Konsultasi & Cek Tarif",
  },
  {
    image: "/images/penyerahan.png",
    alt: "Penyerahan & Penimbangan",
  },
  {
    image: "/images/otorisasi.jpg",
    alt: "Clearance & Flight Slot",
  },
  {
    image: "/images/tiba.jpg",
    alt: "Tiba & Handover",
  },
];

const specialCargoList = [
  {
    category: "Perishable Goods (Barang Mudah Rusak)",
    desc: "Pengiriman makanan segar, buah-buahan, sayur, hasil laut (seafood), & daging beku.",
    note: "Wajib menggunakan paking styrofoam kedap air & es kering/cool pack standar IATA.",
  },
  {
    category: "Dangerous Goods / DG (Barang Berbahaya)",
    desc: "Baterai lithium, cairan kimia, aerosol, parfum, & bahan mudah terbakar.",
    note: "Melalui proses pemeriksaan tim BTT, dokumen MSDS, & paking berlabel DG resmi.",
  },
  {
    category: "Valuable Cargo (Barang Berharga Tinggi)",
    desc: "Perangkat elektronik premium, perhiasan, dokumen resmi negara, & aset bernilai tinggi.",
    note: "Disertai skema asuransi pengiriman penuh & pengawalan ekstra dari agen.",
  },
];

/* Varian Animasi Elegan untuk Scroll */
const slideUpSmooth: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      delay: i * 0.18,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
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

const bannerSlideFromRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
  },
};

/* Komponen Sub-heading: Garis Merah -> Ikon -> Teks */
function TechSubheading({ text, icon: Icon }: { text: string; icon?: React.ElementType }) {
  return (
    <div className="inline-flex items-center gap-2 mb-2">
      <span className="w-8 h-[1.5px] bg-red-600 block"></span>
      {Icon && <Icon className="size-4 text-red-600 shrink-0" />}
      <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-red-600 font-mono">{text}</span>
    </div>
  );
}

/* ================= JUDUL HERO ================= */
function JudulHero({ reduceMotion }: { reduceMotion: boolean | null }) {
  const ukuranNormal = "text-2xl sm:text-4xl lg:text-5xl font-black";
  const easeMasuk = [0.16, 1, 0.3, 1] as const;
  const easeTerbang = [0.65, 0, 0.35, 1] as const;

  return (
    <div className="tracking-tight text-slate-700 space-y-0.5 sm:space-y-1">
      <TechSubheading text="SERVICES // LION CARGO LOGISTIK" />

      <span className="block overflow-hidden">
        <motion.span className={`block leading-tight ${ukuranNormal}`} initial={reduceMotion ? false : { y: "108%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.1, ease: easeMasuk }}>
          Layanan Kargo Udara
        </motion.span>
      </span>

      <span className="block overflow-hidden py-0.5">
        <motion.span className="block w-fit" initial={reduceMotion ? false : { y: "108%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.25, ease: easeMasuk }}>
          <span className="relative block w-fit">
            <span className={`block leading-tight text-slate-200 ${ukuranNormal}`}>Terpercaya</span>

            <motion.span
              aria-hidden="true"
              className={`absolute inset-0 block leading-tight text-red-600 ${ukuranNormal}`}
              initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.6, delay: 0.9, ease: easeTerbang }}
            >
              Terpercaya
            </motion.span>

            {!reduceMotion && (
              <motion.span
                aria-hidden="true"
                className="absolute top-1/2 z-10 block"
                style={{ x: "-50%", y: "-50%" }}
                initial={{ left: "0%", opacity: 1 }}
                animate={{ left: "100%", opacity: 0 }}
                transition={{
                  left: { duration: 1.6, delay: 0.9, ease: easeTerbang },
                  opacity: { duration: 0.4, delay: 2.5 },
                }}
              >
                <Plane className="size-6 rotate-45 fill-slate-500 text-slate-500 drop-shadow-md sm:size-8" />
              </motion.span>
            )}
          </span>
        </motion.span>
      </span>

      <div className="pt-1">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.45, ease: easeMasuk }} className="inline-block">
          <span className="inline-block px-3.5 sm:px-5 py-1 sm:py-1.5 bg-red-600 text-white text-xl sm:text-3xl lg:text-4xl rounded-xl sm:rounded-2xl shadow-lg shadow-red-600/25 font-black tracking-tight transform -rotate-1">
            Seluruh Indonesia
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/* ================= NAMA KOTA YANG BERGULIR ================= */
function KotaBergulir({ reduceMotion }: { reduceMotion: boolean | null }) {
  const [indeks, setIndeks] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => setIndeks((n) => (n + 1) % KOTA_TUJUAN.length), 2400);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  return (
    <span className="relative inline-flex min-w-37.5 sm:min-w-47.5 overflow-hidden border-b-2 border-dashed border-red-300 align-bottom px-1">
      <span className="invisible select-none" aria-hidden="true">
        {KOTA_TERPANJANG}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={KOTA_TUJUAN[indeks]}
          className="absolute left-1 top-0 font-black text-red-600 whitespace-nowrap"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {KOTA_TUJUAN[indeks]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function LayananContent() {
  const reduceMotion = useReducedMotion();
  const whatsappUrl = waLink("Halo Lion Cargo Logistik, saya ingin kirim barang sekarang.");

  return (
    <div className="bg-white text-slate-800 selection:bg-red-600 selection:text-white overflow-x-hidden">
      {/* ================= BANNER HERO ================= */}
      <section className="w-full bg-white border-b border-slate-100 overflow-hidden">
        <motion.div initial={reduceMotion ? false : "hidden"} animate="visible" variants={bannerSlideFromRight} className="w-full relative">
          <Image src="/images/layanan.jpg" alt="Banner Utama Layanan Kargo Udara Lion Cargo Logistik" width={1920} height={800} priority className="w-full h-auto object-cover block" />
        </motion.div>
      </section>

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-white pt-2 pb-12 sm:pt-4 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-size-[28px_28px] opacity-40 mask-[linear-gradient(to_bottom,black,transparent_85%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Breadcrumb */}
          <nav className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500 sm:mb-4 sm:text-sm">
            <Link href="/" className="transition-colors hover:text-red-600">
              Beranda
            </Link>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="font-bold text-red-600">Layanan</span>
          </nav>

          <JudulHero reduceMotion={reduceMotion} />

          {/* Grid Layout Hero */}
          <motion.div
            className="relative z-10 mt-4 sm:mt-6 grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-10"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Sisi Kiri: Deskripsi & CTA */}
            <div className="space-y-5 lg:col-span-7">
              <div className="space-y-3">
                <p className="text-lg font-bold leading-snug tracking-tight text-slate-700 sm:text-xl">
                  Kirim dari CGK ke <KotaBergulir reduceMotion={reduceMotion} />, setiap hari.
                </p>

                <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                  <strong className="font-semibold text-slate-900">Lion Cargo Logistik</strong> menyediakan jaringan pengiriman kargo udara terpadu yang memprioritaskan kepastian slot penerbangan harian, kecepatan distribusi antarpulau,
                  serta transparansi tarif per kilogram langsung dari <strong className="font-semibold text-slate-900">Terminal Kargo Bandara Internasional Soekarno-Hatta (CGK)</strong>
                </p>
              </div>

              {/* Tombol CTA Responsif */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                <Link
                  href="/cek-ongkir"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-red-600 px-7 py-3.5 text-xs font-black text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-700 active:scale-[0.98] sm:text-sm"
                >
                  <Calculator className="size-4 shrink-0" />
                  <span>Cek Ongkir Sekarang</span>
                  <ArrowRight className="size-4 shrink-0" />
                </Link>

                <a
                  href={waLink("Halo Lion Cargo Logistik, saya mau konsultasi tarif pengiriman kargo udara.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 px-7 py-3.5 text-xs font-bold text-slate-800 transition-all sm:text-sm"
                >
                  <MessageCircle className="size-4 shrink-0 text-emerald-600" />
                  <span>Tanya via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Sisi Kanan: Live Flight Hub Sangat Mentok ke Atas */}
            <motion.div
              className="lg:col-span-5 lg:-mt-32 xl:-mt-44 self-start w-full"
              initial={reduceMotion ? false : { opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative p-5 sm:p-6 rounded-3xl bg-linear-to-br from-white via-red-50/50 to-white border-2 border-red-500/80 shadow-xl shadow-red-500/10 space-y-4 sm:space-y-5 overflow-hidden group hover:border-red-600 transition-colors">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-red-500/25 transition-all duration-500" />

                <div className="absolute top-3 right-3 opacity-10 pointer-events-none">
                  <Plane className="size-28 sm:size-32 text-red-600 -rotate-12" />
                </div>

                <div className="flex items-center justify-between border-b border-red-100 pb-3 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                    </span>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-900">CGK Direct Hub</span>
                  </div>
                  <span className="text-[10px] font-extrabold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">LIVE STATUS</span>
                </div>

                <div className="space-y-1 relative z-10">
                  <h3 className="text-sm sm:text-base font-black text-slate-900">Pemberangkatan Harian Terjadwal</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">Prioritas muat langsung dari Terminal Kargo Soekarno-Hatta ke seluruh bandara Nusantara.</p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 relative z-10">
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-red-100 shadow-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-red-600 text-[10px] font-bold uppercase tracking-wider">
                      <Clock className="size-3.5" /> Slot Terbang
                    </div>
                    <p className="text-xs font-black text-slate-900">Flight Pertama</p>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-red-100 shadow-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-red-600 text-[10px] font-bold uppercase tracking-wider">
                      <ShieldCheck className="size-3.5" /> Keamanan
                    </div>
                    <p className="text-xs font-black text-slate-900">Standar IATA</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-red-100 text-[11px] text-slate-500 relative z-10">
                  <span className="flex items-center gap-1.5 font-bold text-slate-700">
                    <Navigation className="size-3.5 text-red-600" /> Soekarno-Hatta (CGK)
                  </span>
                  <span className="font-extrabold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-md border border-red-200">Fast Track</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= 3 LAYANAN MODE ZIG-ZAG ================= */}
      <section className="-mt-2 sm:-mt-4 pt-0 pb-10 sm:pb-16 bg-slate-50/60 relative z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={slideUpSmooth}>
            <TechSubheading text="OPTIONS // PILIHAN EKSPEDISI" icon={Layers} />
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Opsi Ekspedisi Udara <span className="text-red-600">Sesuai Kebutuhan</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 text-left leading-relaxed">
              Tingkatkan efisiensi rantai pasok bisnis Anda dengan memilih fleksibilitas kecepatan dan kepastian estimasi waktu penerbangan terbaik. Baik untuk pengiriman{" "}
              <strong className="font-semibold text-slate-900">kargo reguler</strong> yang ekonomis, prioritas kilat harian, hingga layanan darurat yang tiba hari ini juga, kami siap memastikan setiap paket muatan Anda mendarat tepat waktu
              dengan jaminan keamanan profesional langsung dari <strong className="font-semibold text-slate-900">Bandara Soekarno-Hatta</strong> ke seluruh penjuru Nusantara.
            </p>
          </motion.div>

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
        </div>
      </section>

      {/* ================= ALUR PENGIRIMAN ================= */}
      <section className="-mt-6 sm:-mt-10 py-6 sm:py-12 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={slideUpSmooth}>
            <TechSubheading text="PROCEDURE // ALUR CARGO" icon={Workflow} />
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight text-center">
              Bagaimana Paket <span className="text-red-600">Anda Diproses?</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 text-center leading-relaxed max-w-2xl mx-auto">
              Pahami setiap tahapan operasional ekspedisi <strong className="font-semibold text-slate-900">kargo</strong> udara kami yang dirancang secara terstruktur, sistematis, dan aman. Mulai dari proses penimbangan muatan di{" "}
              <strong className="font-semibold text-slate-900">terminal kargo Bandara Soekarno-Hatta (CGK)</strong> , pemeriksaan keamanan X-Ray, penerbitan Surat Muatan Udara (SMU), hingga pengelolaan slot penerbangan harian antar pulau
              untuk menjamin paket Anda mendarat tepat waktu di kota tujuan.
            </p>
          </motion.div>

          {/* ========================================================
              1. TAMPILAN MOBILE (Vertical Connected Timeline ala Gojek/Tokopedia)
                 Hanya tampil di Layar HP (block lg:hidden)
          ======================================================== */}
          <div className="block lg:hidden relative pl-6 sm:pl-8 space-y-4">
            {/* Garis Vertikal Merah yang Menghubungkan Semua Step */}
            <div className="absolute top-4 bottom-8 left-4.75 sm:-left-6.75 w-0.5 bg-linear-to-b from-red-600 via-red-400 to-rose-200" />

            {alurPengiriman.map((step, idx) => (
              <motion.div key={idx} custom={idx} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={slideUpSmooth} className="relative pl-6 sm:pl-8">
                {/* Badge Nomor Bulat di Garis Alur */}
                <div className="absolute -left-4.75 sm:-left-6.75 top-3 size-8 sm:size-10 rounded-full bg-red-600 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center shadow-md shadow-red-600/30 z-10 border-2 border-white">
                  0{idx + 1}
                </div>

                {/* Card Gambar Kualitas Penuh & Sangat Jelas */}
                <div className="group relative flex items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-linear-to-b from-slate-50 via-white to-slate-50/50 border border-slate-200/80 shadow-xs hover:border-red-300 transition-all duration-300 overflow-hidden">
                  <div className="relative w-full rounded-xl overflow-hidden">
                    <Image src={step.image} alt={step.alt} width={400} height={300} className="w-full h-auto object-contain block rounded-xl" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ========================================================
              2. TAMPILAN DESKTOP (4 Kolom Berjejer Rapi)
                 Tampil di Laptop/Tablet (hidden lg:grid)
          ======================================================== */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            {alurPengiriman.map((step, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={slideUpSmooth}
                className="group relative flex items-center justify-center p-3 sm:p-4 rounded-3xl bg-linear-to-b from-slate-50 via-white to-slate-50/50 border border-slate-200/80 shadow-xs hover:shadow-2xl hover:border-red-300 transition-all duration-500 overflow-hidden"
              >
                {/* Accent Line Atas saat Hover */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-linear-to-r from-red-600 to-rose-500 group-hover:w-full transition-all duration-500" />

                {/* Container Gambar Responsif Desktop */}
                <div className="relative w-full max-w-52.5 sm:max-w-none rounded-2xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  <Image src={step.image} alt={step.alt} width={400} height={300} className="w-full h-auto object-contain block rounded-2xl" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SPECIAL CARGO ================= */}
      <section className="py-10 sm:py-16 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div className="lg:col-span-5 space-y-3" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={slideFromLeft}>
              <TechSubheading text="COMPLIANCE // SPECIAL CARGO" icon={ShieldAlert} />
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Penanganan <span className="text-red-600">Special Cargo</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Pengalaman profesional menangani jenis muatan khusus yang membutuhkan sertifikasi karantina, standar kemasan ekstra, maupun izin penerbangan berjadwal.</p>
            </motion.div>

            <div className="lg:col-span-7 space-y-3">
              {specialCargoList.map((item, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={slideUpSmooth}
                  className="p-5 rounded-xl bg-white border border-slate-200/80 space-y-1.5 hover:border-red-300 hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-sm font-black text-slate-900">{item.category}</h3>
                  <p className="text-xs text-slate-600">{item.desc}</p>
                  <p className="text-xs font-bold text-red-600 pt-1">
                    💡 Ketentuan: <span className="font-normal text-slate-700">{item.note}</span>
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION (CTA) ================= */}
      <section className="-mt-6 sm:-mt-10 pt-2 pb-6 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            {/* Headline Besar */}
            <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight mb-4">
              Kirim barang <span className="text-red-600">sekarang !</span>
            </motion.h2>

            {/* Group Tombol CTA */}
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }} className="flex items-center justify-center gap-3 mb-4">
              {/* Tombol Utama */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-red-600 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-red-600/20 hover:bg-red-700 hover:shadow-red-600/40 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                HUBUNGI KAMI
              </a>

              {/* Tombol Icon Panah di Samping */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hubungi kami melalui WhatsApp"
                className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 text-white shadow-md shadow-red-600/20 hover:bg-red-700 hover:shadow-red-600/40 hover:scale-110 hover:rotate-12 active:scale-95 transition-all duration-300"
              >
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </motion.div>

            {/* Tagline Footer Section */}
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl">
              <span className="font-bold text-slate-900">Lion Cargo Logistik</span>, <span className="text-red-600 font-semibold">#KirimAmanSampaiTujuan</span> – Solusi logistik kargo udara lengkap & terpercaya dari Bandara Soekarno-Hatta!
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
}
