"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ShieldCheck, Award, Building2, Plane, ArrowRight, Sparkles } from "lucide-react";

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

export function TentangKamiSection() {
  const reduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide setiap 4 detik berganti gambar
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#f8fafc] text-slate-800 min-h-screen pb-20 sm:pb-28 overflow-hidden relative">
      {/* ==========================================
          1. HERO SLIDER (FULL LAYAR PENUH DI LAPTOP, RESPONSIF DI HP, TANPA BURAM & TANPA TEKS)
      ========================================== */}
      <section className="w-full pt-0 pb-6">
        <div className="w-full">
          <div className="relative w-full h-64 sm:h-[420px] lg:h-[560px] overflow-hidden bg-slate-100 shadow-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute inset-0 w-full h-full"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? false : { opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <img src={heroImages[currentIndex].src} alt={heroImages[currentIndex].alt} className="w-full h-full object-cover object-center" />
              </motion.div>
            </AnimatePresence>

            {/* Indikator Titik Slider di Pojok Kanan Bawah */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 flex items-center gap-1.5 bg-slate-900/50 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`size-2 sm:size-2.5 rounded-full transition-all cursor-pointer ${currentIndex === idx ? "bg-red-500 w-6 sm:w-8" : "bg-white/70"}`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          2. KONTEN H1 DENGAN DESAIN HIDUP & PROFIL LION CARGO
      ========================================== */}
      <div className="relative pt-6 pb-12 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-red-50/40 via-transparent to-transparent pointer-events-none" />

        <motion.div
          className="relative max-w-4xl mx-auto text-center space-y-4"
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-red-200 text-red-600 text-xs font-extrabold uppercase tracking-wider shadow-xs">
            <Sparkles className="size-3.5 text-red-600 fill-red-100" /> Agen Kargo Udara Resmi Bandara Soekarno-Hatta
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight leading-[1.15]">
            Mengenal Lebih Dekat <br />
            <span className="text-red-600 font-extrabold underline decoration-red-300 decoration-wavy decoration-1 underline-offset-8">Lion Cargo Logistik</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed pt-2">
            <strong className="text-slate-900">Lion Cargo Logistik</strong> (<span className="text-red-600 font-semibold">lioncargologistik.com</span>) hadir sebagai solusi terdepan dalam layanan ekspedisi muatan udara cepat berstandar
            profesional. Berpusat langsung di Terminal Kargo Bandar Udara Internasional Soekarno-Hatta (CGK), kami mendedikasikan layanan pengiriman kargo *port-to-port* yang aman, tepat waktu, dan transparan ke seluruh wilayah Nusantara.
          </p>
        </motion.div>

        {/* Kotak Keunggulan / Profil Singkat */}
        <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center hover:border-red-200 transition-all">
            <div className="size-12 mx-auto rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold mb-3">
              <Plane className="size-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Direct Flight Hub CGK</h3>
            <p className="text-xs text-slate-500">Pemberangkatan kargo udara langsung dari bandara utama tanpa perantara.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center hover:border-red-200 transition-all">
            <div className="size-12 mx-auto rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold mb-3">
              <ShieldCheck className="size-6 text-red-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Aman & Terpercaya</h3>
            <p className="text-xs text-slate-500">Standar keamanan penerbangan resmi dengan penanganan kargo yang handal.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center hover:border-red-200 transition-all">
            <div className="size-12 mx-auto rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold mb-3">
              <Award className="size-6 text-red-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Hotline WhatsApp</h3>
            <p className="text-xs text-slate-500 font-bold text-red-600 mt-1">+6282121213025</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-6 sm:p-8 text-white text-center shadow-xl">
          <h3 className="text-xl sm:text-2xl font-black mb-2">Butuh Konsultasi Pengiriman Kargo Hari Ini?</h3>
          <p className="text-xs sm:text-sm text-red-100 mb-6 max-w-xl mx-auto">Hubungi layanan pelanggan kami via WhatsApp di nomor +6282121213025 untuk informasi tarif, slot penerbangan, dan penanganan dokumen kargo.</p>
          <a
            href={waLink("Halo Lion Cargo Logistik (+6282121213025), saya ingin berkonsultasi mengenai pengiriman kargo udara.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-red-600 hover:bg-slate-100 font-bold py-3.5 px-6 rounded-2xl text-xs sm:text-sm transition-all shadow-md cursor-pointer"
          >
            <span>Hubungi WhatsApp (+6282121213025)</span>
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
