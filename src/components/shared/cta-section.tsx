"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface CtaSectionProps {
  whatsappUrl: string;
}

export function CtaSection({ whatsappUrl }: CtaSectionProps) {
  const t = useTranslations("common.cta");

  return (
    <div className="-mt-4 sm:-mt-6 pb-2 pt-2 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Title */}
          <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight mb-4">
            {t("title.before")} <span className="text-red-600">{t("title.highlight")}</span>
          </motion.h2>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.15,
            }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-red-600 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-red-600/20 hover:bg-red-700 hover:shadow-red-600/40 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              {t("button")}
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("ariaLabel")}
              className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 text-white shadow-md shadow-red-600/20 hover:bg-red-700 hover:shadow-red-600/40 hover:scale-110 hover:rotate-12 active:scale-95 transition-all duration-300"
            >
              <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.3,
            }}
            className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl"
          >
            <span className="font-bold text-slate-900">{t("brand")}</span>, <span className="text-red-600 font-semibold">{t("tagline")}</span> – {t("description")}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
