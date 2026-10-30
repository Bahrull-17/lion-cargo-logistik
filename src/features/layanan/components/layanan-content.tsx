"use client";

import { useReducedMotion, motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { LayananHero } from "./layanan-hero";
import { LayananServiceList } from "./layanan-service-list";
import { LayananPackageList } from "./layanan-package-list";
import { CtaSection } from "@/components/shared/cta-section";
import { waLink } from "@/lib/wa-link";

type SpecialCargoItem = {
  category: string;
  desc: string;
  note: string;
};

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

const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -45 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

export function LayananContent() {
  // Sesuaikan namespace dengan cara kamu menggabungkan file pages/services.json
  const t = useTranslations("pages.services");
  const reduceMotion = useReducedMotion() ?? false;
  const whatsappUrl = waLink(t("whatsappMessage"));
  const specialCargoList = t.raw("special.items") as SpecialCargoItem[];

  return (
    <div className="bg-white text-slate-800 selection:bg-red-600 selection:text-white overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <LayananHero />

      {/* 2. ZIG-ZAG SERVICE LIST SECTION */}
      <LayananServiceList reduceMotion={reduceMotion} />

      {/* 3. ALUR PENGIRIMAN (4 FOTO PAKET DIPROSES) */}
      <LayananPackageList reduceMotion={reduceMotion} />

      {/* 4. SPECIAL CARGO (Digabung Langsung di Sini) */}
      <section className="py-10 sm:py-16 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div className="lg:col-span-5 space-y-3" initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={slideFromLeft}>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {t.rich("special.title", {
                  highlight: (chunks) => <span className="text-red-600">{chunks}</span>,
                })}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t("special.description")}</p>
            </motion.div>

            <div className="lg:col-span-7 space-y-3">
              {specialCargoList.map((item, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  initial={reduceMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={slideUpSmooth}
                  className="p-5 rounded-xl bg-white border border-slate-200/80 space-y-1.5 hover:border-red-300 hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-sm font-black text-slate-900">{item.category}</h3>
                  <p className="text-xs text-slate-600">{item.desc}</p>
                  <p className="text-xs font-bold text-red-600 pt-1">
                    💡 {t("special.termsLabel")}: <span className="font-normal text-slate-600">{item.note}</span>
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION DENGAN JARAK KHUSUS */}
      <div className="pb-8 sm:pb-12">
        <CtaSection whatsappUrl={whatsappUrl} />
      </div>
    </div>
  );
}
