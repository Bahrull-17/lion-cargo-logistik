"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function TentangHeroSlider() {
  const t = useTranslations("pages.about.hero");

  const heroImages = t.raw("images") as {
    src: string;
    alt: string;
  }[];

  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Otomatis scroll ke paling atas saat halaman dimuat
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Timer slider otomatis berganti setiap 4 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Mengatasi kemungkinan data kosong
  const currentImage = heroImages[currentIndex] ?? heroImages[0];

  if (!currentImage) return null;

  return (
    <section className="w-full pt-0 pb-2">
      <div className="w-full">
        <div className="relative w-full h-64 sm:h-80 lg:h-112.5 overflow-hidden bg-slate-900 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute inset-0 w-full h-full"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            >
              <Image src={currentImage.src} alt={currentImage.alt} fill priority sizes="100vw" className="object-cover object-center w-full h-full" />
            </motion.div>
          </AnimatePresence>

          {/* Overlay gradien */}
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

          {/* Indikator Titik Slider */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-10 flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
            {heroImages.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentIndex(idx)} className={`h-2 rounded-full transition-all cursor-pointer ${currentIndex === idx ? "bg-red-500 w-6 sm:w-8" : "bg-white/70 w-2"}`} aria-label={`Slide ${idx + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
