"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Plane, Box, Zap, FileCheck, ChevronRight, ArrowUpRight, Navigation, Radio } from "lucide-react";

const waLink = (message: string) => {
  return `https://wa.me/6282121213025?text=${encodeURIComponent(message)}`;
};

const heroImages = [
  {
    src: "/images/hero-8.jpg",
    alt: "Terminal Cargo Bandara Soekarno Hatta - Lion Cargo Logistik",
  },
  {
    src: "/images/hero-9.jpg",
    alt: "Armada dan Pesawat Kargo Udara - Lion Cargo Logistik",
  },
  {
    src: "/images/hero-10.jpg",
    alt: "Penanganan Kargo Profesional - Lion Cargo Logistik",
  },
];

// Node rute ekspedisi kargo udara ramai & beragam
const routeNodes = [
  { code: "KNO", city: "Medan", left: "6%", top: "12%", delay: 0 },
  { code: "PLM", city: "Palembang", left: "8%", top: "36%", delay: 0.4 },
  { code: "SUB", city: "Surabaya", left: "48%", top: "78%", delay: 0.8 },
  { code: "BPN", city: "Balikpapan", left: "60%", top: "10%", delay: 1.2 },
  { code: "PNK", city: "Pontianak", left: "40%", top: "28%", delay: 1.4 },
  { code: "UPG", city: "Makassar", left: "78%", top: "32%", delay: 1.6 },
  { code: "DPS", city: "Denpasar", left: "70%", top: "82%", delay: 2.0 },
  { code: "DJJ", city: "Jayapura", left: "76%", top: "56%", delay: 2.4 },
];

export function TentangKamiSection() {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentImage = heroImages[currentIndex] ?? heroImages[0];

  return (
    <div className="bg-[#f8fafc] text-slate-800 min-h-screen pb-20 sm:pb-28 overflow-hidden relative">
      {/* ==========================================
          1. HERO SLIDER FOTO
      ========================================== */}
      <section className="w-full pt-0 pb-4">
        <div className="w-full">
          <div className="relative w-full h-48 sm:h-72 lg:h-80 overflow-hidden bg-slate-900 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute inset-0 w-full h-full"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={currentImage?.src} alt={currentImage?.alt} className="w-full h-full object-cover object-[center_35%]" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 z-10 flex items-center gap-1.5 bg-slate-900/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`size-2 sm:size-2.5 rounded-full transition-all cursor-pointer ${currentIndex === idx ? "bg-red-500 w-5 sm:w-7" : "bg-white/70"}`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          2. SEKSI PENGENALAN BRAND & KINETIC NODE MAP
      ========================================== */}
      <div className="relative pt-2 sm:pt-4 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        {/* Pattern Akses Garis Latar */}
        <div className="absolute inset-0 bg-linear-to-b from-red-50/40 via-slate-50/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-size-[3rem_3rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb Navigasi (MASUK DARI ATAS) */}
          <motion.nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 sm:mb-8"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link href="/" className="hover:text-red-600 transition-colors flex items-center gap-1 text-slate-600">
              Beranda
            </Link>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="text-red-600 font-bold">Tentang Kami</span>
          </motion.nav>

          {/* EDITORIAL CUSTOM HEADING & KINETIC NODE MAP */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* KIRI: HEADING & PARAGRAF PENJELASAN */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              {/* Running Tag Header (MASUK DARI ATAS) */}
              <motion.div
                className="flex items-center gap-3"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <span className="h-px w-8 sm:w-10 bg-red-600"></span>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-red-600">PROFILE // LION CARGO LOGISTIK</span>
              </motion.div>

              {/* HEADING EDITORIAL (MASUK DARI KIRI KE TENGAH) */}
              <motion.div
                className="space-y-2 sm:space-y-3"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                  Solusi Ekspedisi <br />
                  <span className="font-light italic text-slate-600">Kargo Udara Cepat</span> <br />
                  <span className="inline-block mt-1.5 sm:mt-2 px-3.5 sm:px-4 py-1 sm:py-1.5 bg-red-600 text-white rounded-xl sm:rounded-2xl shadow-lg shadow-red-600/20 font-extrabold transform -rotate-1">Langsung dari CGK</span>
                </h1>
              </motion.div>

              {/* PARAGRAF PENJELASAN (MASUK DARI BAWAH KE ATAS) */}
              <motion.div
                className="pl-4 sm:pl-5 border-l-2 border-red-500 space-y-3"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              >
                <p className="text-xs sm:text-base text-slate-700 font-medium leading-relaxed">
                  Setiap pengiriman memiliki cerita dan tujuan yang berbeda. Bagi kami, <strong className="text-slate-900">Cargo</strong> bukan hanya tentang memindahkan barang dari satu tempat ke tempat lain, tetapi tentang menjaga
                  kepercayaan yang diberikan oleh setiap pelanggan.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">Lion Cargo Logistik</strong> hadir sebagai penyedia jasa ekspedisi kargo udara resmi kargo udara <em>port-to-port</em> dengan operasional yang terhubung langsung melalui{" "}
                  <strong className="text-slate-800">Terminal Kargo Bandara Internasional Soekarno-Hatta (CGK)</strong> untuk mendukung kebutuhan pengiriman ke berbagai kota tujuan di Indonesia.
                </p>
              </motion.div>

              {/* BADGE HIGHLIGHT (NONGCUL DARI BAWAH BERGANTIAN) */}
              <motion.div
                className="pt-1 flex flex-wrap gap-2.5 sm:gap-3 text-xs font-bold text-slate-800"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-xs">
                  <Plane className="size-4 text-red-600 shrink-0" />
                  <span>Penerbangan Langsung (Direct Flight)</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-xs">
                  <FileCheck className="size-4 text-red-600 shrink-0" />
                  <span>Dokumen SMU Resmi</span>
                </div>
              </motion.div>
            </div>

            {/* KANAN: ELEMEN KINETIC FLIGHT DISPATCH NODE MAP (MASUK DARI KANAN KE TENGAH + FLOATING ANIMATION) */}
            <motion.div
              className="lg:col-span-5 relative h-96 sm:h-112.5 w-full flex items-center justify-center select-none"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Tipografi Raksasa "CGK" Transparan & Responsif */}
              <span className="absolute text-[26vw] lg:text-[160px] font-black text-slate-200/60 font-mono tracking-tighter select-none pointer-events-none -z-10 leading-none">CGK</span>

              {/* Radar Sweeper Circle Effect */}
              <div className="absolute size-52 sm:size-72 rounded-full border border-dashed border-red-300/40 pointer-events-none -z-10 animate-spin-slow" />
              <div className="absolute size-80 sm:size-96 rounded-full border border-slate-200/60 pointer-events-none -z-10" />

              {/* Canvas SVG Garis Lintasan Terhubung */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-red-500/50" viewBox="0 0 400 300" fill="none" strokeWidth="1.8" strokeDasharray="4 4">
                {/* Lintasan Garis ke Berbagai Kota */}
                <path d="M 130 150 Q 70 60 30 40" />
                <path d="M 130 150 Q 70 120 35 110" />
                <path d="M 130 150 Q 170 200 200 235" />
                <path d="M 130 150 Q 210 60 250 35" />
                <path d="M 130 150 Q 150 100 170 85" />
                <path d="M 130 150 Q 240 110 320 95" />
                <path d="M 130 150 Q 220 220 290 250" />
                <path d="M 130 150 Q 260 170 310 170" />
              </svg>

              {/* MINI BADGE LIVE DISPATCH (DARI ATAS) */}
              <motion.div
                className="absolute top-1 left-1 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-200/90 shadow-xs text-[10px] font-mono font-bold text-slate-800 z-30"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Radio className="size-3 text-red-600 animate-pulse" />
                <span>CGK LIVE DISPATCH</span>
              </motion.div>

              {/* MINI BADGE KECEPATAN (DARI KANAN) */}
              <motion.div
                className="absolute top-1 right-1 bg-linear-to-r from-red-600 to-red-700 text-white px-2.5 py-1 rounded-xl shadow-md text-[10px] font-bold z-30 flex items-center gap-1"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Zap className="size-3 text-amber-300" />
                <span>1-2 HARI PORT TO PORT</span>
              </motion.div>

              {/* PUSAT UTAMA CGK: TERMINAL KARGO SOEKARNO-HATTA */}
              <div className="absolute left-[32%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 z-20 group">
                <div className="relative flex items-center justify-center">
                  <span className="absolute size-14 sm:size-16 rounded-full bg-red-500/20 animate-ping"></span>
                  <div className="size-11 sm:size-12 rounded-2xl bg-linear-to-br from-red-600 to-red-700 text-white flex items-center justify-center shadow-xl shadow-red-600/40 font-bold z-10 cursor-pointer group-hover:scale-110 transition-all">
                    <Plane className="size-6 transform rotate-45" />
                  </div>
                </div>

                {/* Badge CGK Label */}
                <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-red-200 text-[10px] sm:text-[11px] font-black text-slate-900 shadow-md flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-red-600 animate-pulse"></span>
                  <span>TERMINAL KARGO CGK</span>
                </div>
              </div>

              {/* NODE RUTE TUJUAN KOTA BANYAK (FLOAT LOOP ANIMATION) */}
              {routeNodes.map((node, i) => (
                <motion.div key={i} className="absolute z-10" style={{ left: node.left, top: node.top }} animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}>
                  <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xl border border-slate-200/90 shadow-sm hover:border-red-500 hover:shadow-md transition-all cursor-pointer group whitespace-nowrap">
                    <span className="size-2 rounded-full bg-emerald-500 shrink-0"></span>
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-900">{node.code}</span>
                    <span className="text-[9px] sm:text-[10px] text-slate-600 font-bold">· {node.city}</span>
                    <Navigation className="size-3 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity transform rotate-45 shrink-0" />
                  </div>
                </motion.div>
              ))}

              {/* BADGE MINIMUM WEIGHT KARGO (BAWAH KIRI DARI BAWAH) */}
              <motion.div
                className="absolute bottom-2 left-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-1.5 text-[10px] font-bold text-slate-800 z-30"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Box className="size-3.5 text-red-600" />
                <span>MIN. 10 KG</span>
              </motion.div>

              {/* FLOATING ACTION BUTTON UNTUK CEK RUTE (BAWAH KANAN DARI KANAN) */}
              <motion.div
                className="absolute bottom-1 right-1 z-30"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <a
                  href={waLink("Halo Lion Cargo Logistik (+6282121213025), saya ingin berkonsultasi mengenai pengiriman kargo udara.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-red-600 text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-xs font-bold transition-all shadow-lg group cursor-pointer"
                >
                  <span>Cek Rute Flight</span>
                  <ArrowUpRight className="size-4 text-red-400 group-hover:text-white transition-colors" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
