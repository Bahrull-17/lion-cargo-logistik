"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Plane, ChevronRight, Calculator, ShieldCheck, Clock, Navigation } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion, Variants } from "framer-motion";
import { waLink } from "@/lib/wa-link";

/* Kota tujuan yang bergulir di kalimat penawaran hero. */
const KOTA_TUJUAN = ["Denpasar", "Makassar", "Medan", "Balikpapan", "Surabaya", "Manado", "Jayapura"];
const KOTA_TERPANJANG = "Balikpapan";

const bannerSlideFromRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ================= JUDUL HERO ================= */
function JudulHero({ reduceMotion }: { reduceMotion: boolean | null }) {
  const ukuranNormal = "text-2xl sm:text-4xl lg:text-5xl font-black";
  const easeMasuk = [0.16, 1, 0.3, 1] as const;
  const easeTerbang = [0.65, 0, 0.35, 1] as const;

  return (
    <div className="tracking-tight text-slate-700 space-y-0.5 sm:space-y-1">
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

export function LayananHero() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <>
      {/* ================= BANNER HERO ================= */}
      <section className="w-full bg-white border-b border-slate-100 overflow-hidden">
        <motion.div initial={reduceMotion ? false : "hidden"} animate="visible" variants={bannerSlideFromRight} className="w-full relative">
          <Image src="/images/layanan/layanan.jpg" alt="Banner Utama Layanan Kargo Udara Lion Cargo Logistik" width={1920} height={800} priority className="w-full h-auto object-cover block" />
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

              {/* Tombol CTA dengan Animasi Muncul dari Bawah ke Atas Saat D-scroll (whileInView) */}
              <motion.div
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1"
                initial={reduceMotion ? false : { opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href="/cek-ongkir"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-red-600 px-7 py-3.5 text-xs font-black text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] sm:text-sm"
                >
                  <Calculator className="size-4 shrink-0" />
                  <span>Cek Ongkir Sekarang</span>
                  <ArrowRight className="size-4 shrink-0" />
                </Link>

                <a
                  href={waLink("Halo Lion Cargo Logistik, saya mau konsultasi tarif pengiriman kargo udara.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 px-7 py-3.5 text-xs font-bold text-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98] sm:text-sm"
                >
                  <MessageCircle className="size-4 shrink-0 text-emerald-600" />
                  <span>Tanya via WhatsApp</span>
                </a>
              </motion.div>
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
    </>
  );
}
