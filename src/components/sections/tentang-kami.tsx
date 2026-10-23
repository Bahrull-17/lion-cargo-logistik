"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Plane, Box, Zap, FileCheck, ChevronRight, ArrowUpRight, Navigation, Radio, HeartHandshake, Layers } from "lucide-react";

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

const fiturUnggulan = [
  {
    image: "/images/respon.jpg",
    alt: "Respon Operasional 24/7",
  },
  {
    image: "/images/keamanan.jpg",
    alt: "Keamanan Fisik Muatan",
  },
  {
    image: "/images/konsultasi.jpg",
    alt: "Pendampingan Sahabat & Konsultasi",
  },
];

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

  const whatsappUrl = waLink("Halo Lion Cargo Logistik (+6282121213025), saya ingin berkonsultasi mengenai pengiriman kargo udara.");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Menggunakan fallback non-null assertion (!) atau pengaman agar TypeScript tidak warning undefined
  const currentImage = heroImages[currentIndex] ?? heroImages[0]!;

  return (
    <div className="bg-[#f8fafc] text-slate-800 min-h-screen pb-12 sm:pb-16 overflow-hidden relative">
      {/* ==========================================
          1. HERO SLIDER FOTO
      ========================================== */}
      <section className="w-full pt-0 pb-2">
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
                <Image src={currentImage.src} alt={currentImage.alt} fill priority sizes="100vw" className="object-cover object-[center_35%]" />
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
      <div className="relative pt-2 sm:pt-4 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-linear-to-b from-red-50/40 via-slate-50/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-size-[3rem_3rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-4 sm:mb-6"
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* KIRI: HEADING & PARAGRAF PENJELASAN */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
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

              <motion.div
                className="space-y-2 sm:space-y-3"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                  Solusi Ekspedisi <br />
                  <span className="font-light italic text-slate-600">Kargo Udara Cepat</span> <br />
                  <span className="inline-block mt-1.5 sm:mt-2 px-3.5 sm:px-4 py-1 sm:py-1.5 bg-red-600 text-white rounded-xl sm:rounded-2xl shadow-lg shadow-red-600/20 font-extrabold transform -rotate-1">Langsung dari CGK</span>
                </h1>
              </motion.div>

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

            {/* KANAN: ELEMEN KINETIC FLIGHT DISPATCH NODE MAP */}
            <motion.div
              className="lg:col-span-5 relative h-96 sm:h-112.5 w-full flex items-center justify-center select-none"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="absolute text-[26vw] lg:text-[160px] font-black text-slate-200/60 font-mono tracking-tighter select-none pointer-events-none -z-10 leading-none">CGK</span>

              <div className="absolute size-52 sm:size-72 rounded-full border border-dashed border-red-300/40 pointer-events-none -z-10 animate-spin-slow" />
              <div className="absolute size-80 sm:size-96 rounded-full border border-slate-200/60 pointer-events-none -z-10" />

              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-red-500/50" viewBox="0 0 400 300" fill="none" strokeWidth="1.8" strokeDasharray="4 4">
                <path d="M 130 150 Q 70 60 30 40" />
                <path d="M 130 150 Q 70 120 35 110" />
                <path d="M 130 150 Q 170 200 200 235" />
                <path d="M 130 150 Q 210 60 250 35" />
                <path d="M 130 150 Q 150 100 170 85" />
                <path d="M 130 150 Q 240 110 320 95" />
                <path d="M 130 150 Q 220 220 290 250" />
                <path d="M 130 150 Q 260 170 310 170" />
              </svg>

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

              <div className="absolute left-[32%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 z-20 group">
                <div className="relative flex items-center justify-center">
                  <span className="absolute size-14 sm:size-16 rounded-full bg-red-500/20 animate-ping"></span>
                  <div className="size-11 sm:size-12 rounded-2xl bg-linear-to-br from-red-600 to-red-700 text-white flex items-center justify-center shadow-xl shadow-red-600/40 font-bold z-10 cursor-pointer group-hover:scale-110 transition-all">
                    <Plane className="size-6 transform rotate-45" />
                  </div>
                </div>

                <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-red-200 text-[10px] sm:text-[11px] font-black text-slate-900 shadow-md flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-red-600 animate-pulse"></span>
                  <span>TERMINAL KARGO CGK</span>
                </div>
              </div>

              {routeNodes.map((node, i) => (
                <motion.div
                  key={i}
                  className="absolute z-10"
                  style={{ left: node.left, top: node.top }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    delay: node.delay,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xl border border-slate-200/90 shadow-sm hover:border-red-500 hover:shadow-md transition-all cursor-pointer group whitespace-nowrap">
                    <span className="size-2 rounded-full bg-emerald-500 shrink-0"></span>
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-900">{node.code}</span>
                    <span className="text-[9px] sm:text-[10px] text-slate-600 font-bold">· {node.city}</span>
                    <Navigation className="size-3 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity transform rotate-45 shrink-0" />
                  </div>
                </motion.div>
              ))}

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

              <motion.div
                className="absolute bottom-1 right-1 z-30"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <a
                  href={whatsappUrl}
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

      {/* ==========================================
          4. SEKSI IKATAN TULUS LAYAKNYA SAHABAT
      ========================================== */}
      <div className="pt-4 sm:pt-6 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* KIRI: HUMANISE HEADING (H2 SAHABAT) */}
            <motion.div className="lg:col-span-6 space-y-3.5" initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono font-bold text-red-600 uppercase tracking-widest">
                <span className="h-px w-8 sm:w-10 bg-red-600"></span>
                <div className="flex items-center gap-1.5">
                  <HeartHandshake className="size-4 text-red-600" />
                  <span>PARTNERSHIP // NILAI UTAMA KAMI</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Melayani dan Membangun Ikatan yang <span className="text-red-600">Tulus Layaknya Sahabat</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pt-0.5">
                Di industri <strong className="text-slate-900">ekspedisi</strong> yang serba cepat, kami menyadari bahwa <strong className="text-slate-900">Terminal kargo</strong> Anda bukan sekadar paket berbobot kilogram, tetapi merupakan
                komitmen bisnis, reputasi usaha, dan harapan yang harus tiba tepat waktu.
              </p>
            </motion.div>

            {/* KANAN: TEKS EDITORIAL PENDAMPING */}
            <motion.div
              className="lg:col-span-6 space-y-3 pl-4 sm:pl-6 border-l-2 border-red-600"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Karena itulah, <strong className="text-slate-900">Lion Cargo Logistik</strong> tidak pernah memosisikan diri hanya sebagai vendor ekspedisi biasa. Kami hadir sebagai mitra strategis yang mendengarkan, memahami dinamika
                kebutuhan pengiriman Anda, serta memberikan solusi terbaik dengan pendekatan transparan dan kekeluargaan.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dari koordinasi di pintu penerimaan <strong className="text-slate-900">Terminal Kargo Soekarno-Hatta (CGK)</strong>, pengurusan dokumen Surat Muatan Udara (SMU), hingga konfirmasi kargo tiba di bandara tujuan, tim kami siap
                mendampingi setiap langkah pengiriman Anda secara responsif layaknya seorang sahabat yang selalu dapat diandalkan.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ==========================================
          5. SEKSI SHOWCASE HERO-11.PNG
      ========================================== */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* EDITORIAL DESKRIPSI EMOSIONAL & AMANAH */}
            <motion.div
              className="lg:col-span-5 space-y-4 order-2 lg:order-1"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono font-bold text-red-600 uppercase tracking-widest">
                <span className="h-px w-8 sm:w-10 bg-red-600"></span>
                <div className="flex items-center gap-1.5">
                  <Layers className="size-4 text-red-600" />
                  <span>RAGAM AMANAH // SATU INTEGRITAS</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Memahami Setiap <span className="text-red-600">Karakter Pengiriman Anda</span>
              </h2>

              <div className="pl-4 sm:pl-5 border-l-2 border-red-500 space-y-3">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Di balik setiap muatan <strong className="text-slate-900">Kargo</strong> mulai dari dus produksi usaha kecil, pasokan garmen antarpulau, suku cadang vital, hingga dokumen berharga terdapat cerita perjuangan dan
                  kepercayaaan yang Anda titipkan.
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Tim operasional kami di <strong className="text-slate-900">Kargo Bandara Soekarno-Hatta Tangerang</strong> hadir untuk memastikan bahwa apapun bentuk dan kebutuhan muatan Anda, perlakuan yang kami berikan tetap sama: penuh
                  rasa tanggung jawab, cermat, dan berdedikasi tinggi.
                </p>
              </div>
            </motion.div>

            {/* FOTO HERO-11 DENGAN EFEK KINETIC PERSPECTIVE 3D UNFOLD */}
            <div className="lg:col-span-7 order-1 lg:order-2 perspective-1000">
              <motion.div
                className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 group transform-gpu"
                initial={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : {
                        opacity: 0,
                        scale: 0.85,
                        rotateX: 18,
                        rotateY: -12,
                        y: 50,
                      }
                }
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  rotateX: 0,
                  rotateY: 0,
                  y: 0,
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1],
                  scale: { duration: 0.9, ease: "easeOut" },
                }}
                whileHover={{
                  scale: 1.02,
                  rotateY: 2,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="absolute -inset-1 bg-linear-to-r from-red-600/20 to-amber-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

                <Image
                  src="/images/hero-11.png"
                  alt="Ragam Amanah Pengiriman - Lion Cargo Logistik"
                  width={800}
                  height={500}
                  className="w-full h-auto max-h-112.5 object-cover object-center transform group-hover:scale-103 transition-transform duration-700 ease-out"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          6. SEKSI PENUTUP & CTA
      ========================================== */}
      <div className="pt-8 sm:pt-12 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADER PENUTUP */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-3 text-[10px] sm:text-xs font-mono font-bold text-red-600 uppercase tracking-widest">
              <span className="h-px w-8 sm:w-12 bg-red-600"></span>
              <span>KOMITMEN PENUTUP</span>
              <span className="h-px w-8 sm:w-12 bg-red-600"></span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Siap Mengirim Kargo Anda <span className="text-red-600">Tanpa Ragu</span>
            </h2>
            <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Setiap tahapan pengiriman kargo udara dari Terminal <strong className="text-slate-900">Kargo Bandara Soekarno-Hatta Tangerang</strong> dikelola secara transparan, aman, dan profesional untuk memastikan paket serta barang Anda
              tiba tepat waktu di kota tujuan.
            </p>
          </div>

          {/* DAFTAR FITUR UNGGULAN GAMBAR */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-2">
            {fiturUnggulan.map((item, idx) => (
              <motion.div
                key={idx}
                className="group relative flex flex-col items-center md:items-start p-4 sm:p-5 rounded-3xl bg-linear-to-b from-slate-50 via-white to-slate-50/50 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-red-300 transition-all duration-500 overflow-hidden"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-linear-to-r from-red-600 to-rose-500 group-hover:w-full transition-all duration-500" />

                {/* Diperbarui dari max-w-[220px] menjadi max-w-55 sesuai saran Tailwind */}
                <div className="relative w-full max-w-55 md:max-w-none rounded-2xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  <Image src={item.image} alt={item.alt} width={400} height={300} className="w-full h-auto object-contain block rounded-2xl" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* CALL TO ACTION (CTA) - Rapat tanpa space kosong bawah */}
          <section className="-mt-4 sm:-mt-6 pb-2 pt-2 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex flex-col items-center text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight mb-4"
                >
                  Kirim barang <span className="text-red-600">sekarang !</span>
                </motion.h2>

                <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }} className="flex items-center justify-center gap-3 mb-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-red-600 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-red-600/20 hover:bg-red-700 hover:shadow-red-600/40 hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    HUBUNGI KAMI
                  </a>

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

                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl">
                  <span className="font-bold text-slate-900">Lion Cargo Logistik</span>, <span className="text-red-600 font-semibold">#KirimAmanSampaiTujuan</span> – Solusi logistik kargo udara lengkap & terpercaya dari Bandara
                  Soekarno-Hatta!
                </motion.p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
