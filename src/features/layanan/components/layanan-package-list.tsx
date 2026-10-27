"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const alurPengiriman = [
  {
    image: "/images/layanan/tarif.png",
    alt: "Konsultasi & Cek Tarif",
  },
  {
    image: "/images/layanan/penyerahan.png",
    alt: "Penyerahan & Penimbangan",
  },
  {
    image: "/images/layanan/otorisasi.jpg",
    alt: "Clearance & Flight Slot",
  },
  {
    image: "/images/layanan/tiba.jpg",
    alt: "Tiba & Handover",
  },
];

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

interface LayananPackageListProps {
  reduceMotion?: boolean;
}

export function LayananPackageList({ reduceMotion = false }: LayananPackageListProps) {
  return (
    <section className="-mt-6 sm:-mt-10 py-6 sm:py-12 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16" initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={slideUpSmooth}>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight text-center">
            Bagaimana Paket <span className="text-red-600">Anda Diproses?</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 text-center leading-relaxed max-w-2xl mx-auto">
            Pahami setiap tahapan operasional ekspedisi <strong className="font-semibold text-slate-900">kargo</strong> udara kami yang dirancang secara terstruktur, sistematis, dan aman. Mulai dari proses penimbangan muatan di{" "}
            <strong className="font-semibold text-slate-900">terminal kargo Bandara Soekarno-Hatta (CGK)</strong>, pemeriksaan keamanan X-Ray, penerbitan Surat Muatan Udara (SMU), hingga pengelolaan slot penerbangan harian antar pulau untuk
            menjamin paket Anda mendarat tepat waktu di kota tujuan.
          </p>
        </motion.div>

        {/* 1. TAMPILAN MOBILE (Vertical Connected Timeline) */}
        <div className="block lg:hidden relative pl-6 sm:pl-8 space-y-4">
          <div className="absolute top-4 bottom-8 left-4.75 sm:-left-6.75 w-0.5 bg-linear-to-b from-red-600 via-red-400 to-rose-200" />

          {alurPengiriman.map((step, idx) => (
            <motion.div key={idx} custom={idx} initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={slideUpSmooth} className="relative pl-6 sm:pl-8">
              <div className="absolute -left-4.75 sm:-left-6.75 top-3 size-8 sm:size-10 rounded-full bg-red-600 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center shadow-md shadow-red-600/30 z-10 border-2 border-white">
                {idx + 1}
              </div>

              <div className="group relative flex items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-linear-to-b from-slate-50 via-white to-slate-50/50 border border-slate-200/80 shadow-xs hover:border-red-300 transition-all duration-300 overflow-hidden">
                <div className="relative w-full rounded-xl overflow-hidden">
                  <Image src={step.image} alt={step.alt} width={400} height={300} className="w-full h-auto object-contain block rounded-xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2. TAMPILAN DESKTOP (4 Kolom Berjejer Rapi) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {alurPengiriman.map((step, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideUpSmooth}
              className="group relative flex items-center justify-center p-3 sm:p-4 rounded-3xl bg-linear-to-b from-slate-50 via-white to-slate-50/50 border border-slate-200/80 shadow-xs hover:shadow-2xl hover:border-red-300 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-linear-to-r from-red-600 to-rose-500 group-hover:w-full transition-all duration-500" />

              <div className="relative w-full max-w-52.5 sm:max-w-none rounded-2xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                <Image src={step.image} alt={step.alt} width={400} height={300} className="w-full h-auto object-contain block rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
