"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fiturUnggulan = [
  {
    image: "/images/tentang-kami/respon.jpg",
    alt: "Respon Operasional 24/7",
  },
  {
    image: "/images/tentang-kami/keamanan.jpg",
    alt: "Keamanan Fisik Muatan",
  },
  {
    image: "/images/tentang-kami/konsultasi.jpg",
    alt: "Pendampingan Sahabat & Konsultasi",
  },
];

interface TentangFeatureListProps {
  shouldReduceMotion: boolean;
}

export function TentangFeatureList({ shouldReduceMotion }: TentangFeatureListProps) {
  return (
    <>
      {/* 1. TAMPILAN MOBILE (Vertical Timeline) */}
      <div className="block md:hidden relative pl-6 space-y-4">
        <div className="absolute top-4 bottom-8 left-4.75 w-0.5 bg-linear-to-b from-red-600 via-red-400 to-rose-200" />
        {fiturUnggulan.map((item, idx) => (
          <motion.div key={idx} className="relative pl-6" initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}>
            <div className="absolute top-3 size-8 rounded-full bg-red-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-md shadow-red-600/30 z-10 border-2 border-white">0{idx + 1}</div>
            <div className="group relative flex flex-col items-center p-3 rounded-2xl bg-linear-to-b from-slate-50 via-white to-slate-50/50 border border-slate-200/80 shadow-xs hover:border-red-300 transition-all duration-300 overflow-hidden">
              <div className="relative w-full rounded-xl overflow-hidden">
                <Image src={item.image} alt={item.alt} width={400} height={300} className="w-full h-auto object-contain block rounded-xl" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 2. TAMPILAN DESKTOP (Grid 3 Kolom Berjajar) */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 sm:gap-8 pt-2">
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
            <div className="relative w-full max-w-55 md:max-w-none rounded-2xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
              <Image src={item.image} alt={item.alt} width={400} height={300} className="w-full h-auto object-contain block rounded-2xl" />
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
