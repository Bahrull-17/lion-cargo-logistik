"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ShieldCheck, Building2, Plane, ArrowRight, Sparkles, CheckCircle2, BadgePercent, Box, MapPin, Clock, Zap, FileCheck } from "lucide-react";

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

const coreFeatures = [
  {
    icon: Building2,
    badge: "01 / PUSAT OPERASIONAL",
    title: "Direct Access Hub Terminal Kargo CGK",
    desc: "Berlokasi strategis di area Terminal Kargo Bandara Internasional Soekarno-Hatta. Seluruh dokumen SMU (Surat Muatan Udara) dan proses penimbangan kargo diproses langsung tanpa melalui rantai perantara.",
    highlights: ["Gudang kargo utama CGK", "Pemberangkatan penerbangan harian"],
    color: "from-red-500 to-red-600",
  },
  {
    icon: BadgePercent,
    badge: "02 / TARIF TRANSPARAN",
    title: "Simulasi Biaya & Kargo Udara Murah",
    desc: "Menyediakan transparansi perhitungan biaya pengiriman udara secara realtime. Menerapkan standar rumus internasional (P x L x T / 6000) serta biaya admin tetap bandara tanpa hidden fees.",
    highlights: ["Sistem kalkulator tarif otomatis", "Fixed admin fee Rp 30.000"],
    color: "from-amber-500 to-amber-600",
  },
  {
    icon: ShieldCheck,
    badge: "03 / KEAMANAN TERJAMIN",
    title: "Standar Penerbangan Sipil & General Cargo",
    desc: "Penanganan paket dan barang kiriman disesuaikan dengan regulasi keselamatan penerbangan. Didukung tim operasional ahli untuk pemeriksaan label kargo, packing kayu, dan pengawalan dokumen.",
    highlights: ["Pemeriksaan regulasi ketat", "Keamanan port-to-port terjamin"],
    color: "from-emerald-500 to-emerald-600",
  },
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

  // Pengaman aman untuk mencegah error undefined jika array kosong
  const currentImage = heroImages[currentIndex] ?? heroImages[0];

  return (
    <div className="bg-[#f8fafc] text-slate-800 min-h-screen pb-20 sm:pb-28 overflow-hidden relative">
      {/* ==========================================
          1. HERO SLIDER FOTO
      ========================================== */}
      <section className="w-full pt-0 pb-6">
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
          2. SEKSI PENGENALAN BRAND & PROFIL
      ========================================== */}
      <div className="relative pt-6 pb-12 px-4 sm:px-6">
        <div className="absolute inset-0 bg-linear-to-b from-red-50/40 via-transparent to-transparent pointer-events-none" />

        <motion.div
          className="relative max-w-4xl mx-auto text-center space-y-4"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
            <strong className="text-slate-900">Lion Cargo Logistik</strong> (<span className="text-red-600 font-semibold">lioncargologistik.com</span>) adalah penyedia layanan{" "}
            <strong className="text-slate-800">ekspedisi kargo udara cepat</strong> yang berfokus pada pengiriman paket dan muatan *port-to-port* ke seluruh wilayah Indonesia. Berpusat langsung di{" "}
            <strong className="text-slate-800">Terminal Kargo Bandara Internasional Soekarno-Hatta (CGK)</strong>, kami hadir memberikan kecepatan, efisiensi tarif, serta kemudahan proses pengiriman barang tanpa hambatan.
          </p>
        </motion.div>

        {/* ==========================================
            3. CARD PENGENALAN INTERAKTIF & KEUNGGULAN
        ========================================== */}
        <div className="max-w-5xl mx-auto mt-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-50 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <motion.div className="space-y-4" initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-xs font-extrabold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100 inline-block">Solusi Pengiriman Cepat</span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 leading-snug">Mitra Utama Pengiriman Udara Anda dari Hub Utama Jakarta</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Kami memahami pentingnya waktu dalam siklus bisnis maupun pengiriman pribadi Anda. Dengan jangkauan penerbangan kargo udara yang terhubung ke puluhan bandara tujuan di Sumatra, Jawa, Kalimantan, Sulawesi, Bali, hingga Papua,
                kami siap menangani kebutuhan <strong className="text-slate-800">General Cargo</strong> dengan penanganan terbaik.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-bold text-slate-800">
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                  <Plane className="size-4 text-red-600 shrink-0" />
                  <span>Penerbangan Langsung (Direct Flight)</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                  <FileCheck className="size-4 text-red-600 shrink-0" />
                  <span>Surat Muatan Udara (SMU) Resmi</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="grid grid-cols-2 gap-4" initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="bg-linear-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-lg border border-slate-700 hover:scale-[1.02] transition-all">
                <Clock className="size-6 text-red-500 mb-2" />
                <h3 className="text-2xl font-heading font-black text-white">1 - 3 Hari</h3>
                <p className="text-[11px] text-slate-300 mt-1">Estimasi pengiriman kargo port-to-port tiba di kota tujuan.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:scale-[1.02] transition-all">
                <Box className="size-6 text-red-600 mb-2" />
                <h3 className="text-2xl font-heading font-black text-slate-900">10 Kg</h3>
                <p className="text-[11px] text-slate-500 mt-1">Batas minimum kiriman hemat & terjangkau.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:scale-[1.02] transition-all">
                <MapPin className="size-6 text-red-600 mb-2" />
                <h3 className="text-2xl font-heading font-black text-slate-900">CGK Hub</h3>
                <p className="text-[11px] text-slate-500 mt-1">Area Gudang Terminal Kargo Soekarno-Hatta.</p>
              </div>

              <div className="bg-linear-to-br from-red-600 to-red-700 text-white p-5 rounded-2xl shadow-lg hover:scale-[1.02] transition-all">
                <Zap className="size-6 text-amber-300 mb-2" />
                <h3 className="text-2xl font-heading font-black">24/7</h3>
                <p className="text-[11px] text-red-100 mt-1">Layanan konsultasi WhatsApp & cek status tarif.</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ==========================================
            4. GRID TRUST SIGNALS
        ========================================== */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900">Mengapa Layanan Kami Paling Bisa Diandalkan?</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">Tiga pilar operasional yang membedakan kami dari ekspedisi kargo biasa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {coreFeatures.map((item, index) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all relative overflow-hidden group"
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div className={`size-14 rounded-2xl bg-linear-to-r ${item.color} text-white flex items-center justify-center font-bold mb-5 shadow-md`}>
                    <IconComp className="size-7" />
                  </div>

                  <span className="text-[10px] font-mono font-extrabold text-red-600 uppercase tracking-widest bg-red-50 px-2.5 py-1 rounded-md border border-red-100">{item.badge}</span>

                  <h3 className="text-lg font-heading font-black text-slate-900 mt-3 mb-2">{item.title}</h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>

                  <ul className="mt-5 space-y-2 text-xs font-medium text-slate-700 border-t border-slate-100 pt-4">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            5. CTA SECTION
        ========================================== */}
        <motion.div
          className="max-w-4xl mx-auto mt-16 bg-linear-to-r from-red-600 to-red-700 rounded-3xl p-6 sm:p-10 text-white text-center shadow-xl relative overflow-hidden"
          initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <h3 className="text-xl sm:text-3xl font-black mb-2 font-heading">Siap Mengirim Kargo Udara Hari Ini?</h3>
          <p className="text-xs sm:text-sm text-red-100 mb-6 max-w-xl mx-auto leading-relaxed">
            Dapatkan kepastian rute, jadwal penerbangan, dan penawaran harga terbaik langsung dari tim operasional kami di Terminal Kargo CGK Soekarno-Hatta.
          </p>
          <a
            href={waLink("Halo Lion Cargo Logistik (+6282121213025), saya ingin berkonsultasi mengenai pengiriman kargo udara.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-red-600 hover:bg-slate-100 font-bold py-3.5 px-7 rounded-2xl text-xs sm:text-sm transition-all shadow-md cursor-pointer hover:scale-105"
          >
            <span>Hubungi WhatsApp (+6282121213025)</span>
            <ArrowRight className="size-4" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
