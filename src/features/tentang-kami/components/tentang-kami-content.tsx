"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TentangHeroSlider } from "./tentang-hero-slider";
import { TentangFeatureList } from "./tentang-feature-list";
import FlightMap from "./flight-map";
import { CtaSection } from "@/components/shared/cta-section";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Plane, FileCheck, ChevronRight } from "lucide-react";
import { waLink } from "@/lib/wa-link";

// Penanda tag di about.json -> elemen dengan class yang sama seperti desain awal
const richTags = {
  strong: (chunks: ReactNode) => <strong className="text-slate-900">{chunks}</strong>,
  strongSoft: (chunks: ReactNode) => <strong className="text-slate-800">{chunks}</strong>,
  em: (chunks: ReactNode) => <em>{chunks}</em>,
  red: (chunks: ReactNode) => <span className="text-red-600">{chunks}</span>,
};

export function TentangKamiContent() {
  const t = useTranslations("pages.about.content");
  const shouldReduceMotion = useReducedMotion() ?? false;
  const whatsappUrl = waLink(t("whatsappMessage"));

  return (
    <div className="bg-[#f8fafc] text-slate-800 min-h-screen pb-12 sm:pb-16 overflow-hidden relative">
      <TentangHeroSlider />

      {/* 2. SEKSI PENGENALAN BRAND & KINETIC NODE MAP */}
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
              {t("breadcrumb.home")}
            </Link>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="text-red-600 font-bold">{t("breadcrumb.current")}</span>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* KIRI: HEADING & PARAGRAF PENJELASAN */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <motion.div
                className="space-y-2 sm:space-y-3"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                  {t("intro.titleLine1")} <br />
                  <span className="font-light italic text-slate-600">{t("intro.titleItalic")}</span> <br />
                  <span className="inline-block mt-1.5 sm:mt-2 px-3.5 sm:px-4 py-1 sm:py-1.5 bg-red-600 text-white rounded-xl sm:rounded-2xl shadow-lg shadow-red-600/20 font-extrabold transform -rotate-1">{t("intro.titleBadge")}</span>
                </h1>
              </motion.div>

              <motion.div
                className="pl-4 sm:pl-5 border-l-2 border-red-500 space-y-3"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              >
                <p className="text-xs sm:text-base text-slate-700 font-medium leading-relaxed">{t.rich("intro.paragraph1", richTags)}</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t.rich("intro.paragraph2", richTags)}</p>
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
                  <span>{t("intro.badgeDirectFlight")}</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-xs">
                  <FileCheck className="size-4 text-red-600 shrink-0" />
                  <span>{t("intro.badgeSmu")}</span>
                </div>
              </motion.div>
            </div>

            {/* KANAN: FLIGHT MAP */}
            <motion.div className="lg:col-span-5" initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut" }}>
              <FlightMap />
            </motion.div>
          </div>
        </div>
      </div>

      {/* 4. SEKSI IKATAN TULUS LAYAKNYA SAHABAT */}
      <div className="pt-4 sm:pt-6 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <motion.div className="lg:col-span-6 space-y-3.5" initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">{t.rich("friendship.title", richTags)}</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pt-0.5">{t.rich("friendship.paragraph1", richTags)}</p>
            </motion.div>

            <motion.div
              className="lg:col-span-6 space-y-3 pl-4 sm:pl-6 border-l-2 border-red-600"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{t.rich("friendship.paragraph2", richTags)}</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t.rich("friendship.paragraph3", richTags)}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 5. SEKSI SHOWCASE AMANAH */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <motion.div
              className="lg:col-span-5 space-y-4 order-2 lg:order-1"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">{t.rich("showcase.title", richTags)}</h2>
              <div className="pl-4 sm:pl-5 border-l-2 border-red-500 space-y-3">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t.rich("showcase.paragraph1", richTags)}</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t.rich("showcase.paragraph2", richTags)}</p>
              </div>
            </motion.div>

            <div className="lg:col-span-7 order-1 lg:order-2 perspective-1000">
              <motion.div
                className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 group transform-gpu"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.85, rotateX: 18, rotateY: -12, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], scale: { duration: 0.9, ease: "easeOut" } }}
                whileHover={{ scale: 1.02, rotateY: 2, transition: { duration: 0.3 } }}
              >
                <div className="absolute -inset-1 bg-linear-to-r from-red-600/20 to-amber-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                <Image
                  src="/images/tentang-kami/amanah.png"
                  alt={t("showcase.imageAlt")}
                  width={800}
                  height={500}
                  className="w-full h-auto max-h-112.5 object-cover object-center transform group-hover:scale-103 transition-transform duration-700 ease-out"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. SEKSI PENUTUP & CTA */}
      <div className="pt-8 sm:pt-12 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">{t.rich("closing.title", richTags)}</h2>
            <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">{t.rich("closing.description", richTags)}</p>
          </div>

          <TentangFeatureList shouldReduceMotion={shouldReduceMotion} />

          <CtaSection whatsappUrl={whatsappUrl} />
        </div>
      </div>
    </div>
  );
}
