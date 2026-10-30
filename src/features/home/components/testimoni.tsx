"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { waLink } from "@/lib/wa-link";

interface TestimonialItem {
  id: number;
  name: string;
  timeAgo: string;
  avatar?: string;
  initials?: string;
  rating: number;
  review: string;
  source: string;
}

function GoogleIcon() {
  return (
    <svg className="size-4 shrink-0" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  );
}

export function Testimoni() {
  const t = useTranslations("pages.home.testimoni");
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const testimonialsData = t.raw("items") as TestimonialItem[];
  const whatsappUrl = waLink("Halo Lion Cargo Logistik, saya ingin kirim barang sekarang.");

  // AUTO SLIDE
  useEffect(() => {
    if (reduceMotion) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const scrollAmount = clientWidth < 640 ? 300 : 380;

        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [reduceMotion]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <section aria-label="Ulasan Pelanggan" className="bg-white py-12 sm:py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          {/* HEADER TESTIMONI */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                {t("title")}
                <span className="text-red-600"> {t("highlight")}</span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleScroll("left")}
                aria-label="Ulasan Sebelumnya"
                className="p-3 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 shadow-xs active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={() => handleScroll("right")}
                aria-label="Ulasan Selanjutnya"
                className="p-3 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 shadow-xs active:scale-95 cursor-pointer"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </motion.div>

          {/* CAROUSEL */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 pt-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonialsData.map((item) => (
              <div
                key={item.id}
                className="snap-start shrink-0 w-72.5 sm:w-87.5 lg:w-95 p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {item.avatar ? (
                      <Image src={item.avatar} alt={item.name} width={44} height={44} className="rounded-full object-cover" />
                    ) : (
                      <div className="size-11 rounded-full bg-slate-700 text-white font-bold text-sm flex items-center justify-center">{item.initials}</div>
                    )}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">{item.name}</h3>
                        <GoogleIcon />
                      </div>
                      <span className="text-xs text-slate-400 font-medium">{item.timeAgo}</span>
                    </div>
                  </div>

                  {/* RATING */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* REVIEW */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium line-clamp-4">&ldquo;{item.review}&rdquo;</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="-mt-4 sm:-mt-6 pb-6 pt-2 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight mb-4">
              {t("cta.titleBefore")}
              <span className="text-red-600"> {t("cta.titleHighlight")}</span>
            </motion.h2>

            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }} className="flex items-center justify-center gap-3 mb-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-red-600 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-red-600/20 hover:bg-red-700 hover:shadow-red-600/40 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {t("cta.button")}
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
              <span className="font-bold text-slate-900">{t("cta.descriptionBefore")}</span>, <span className="text-red-600 font-semibold">{t("cta.hashtag")}</span> {t("cta.descriptionAfter")}
            </motion.p>
          </div>
        </div>
      </section>
    </>
  );
}
