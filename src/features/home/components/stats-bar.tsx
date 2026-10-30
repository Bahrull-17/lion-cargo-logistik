"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Activity, ShieldCheck, Award, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

interface StatItem {
  numericValue: number;
  suffix: string;
  key: string;
  icon: React.ElementType;
}

const statsData: StatItem[] = [
  {
    numericValue: 99,
    suffix: "%",
    key: "customer",
    icon: ShieldCheck,
  },
  {
    numericValue: 249,
    suffix: "+",
    key: "shipment",
    icon: Award,
  },
  {
    numericValue: 43,
    suffix: "+",
    key: "client",
    icon: Activity,
  },
  {
    numericValue: 24,
    suffix: "/7",
    key: "tracking",
    icon: Clock,
  },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  const motionValue = useMotionValue(0);

  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 15,
    restDelta: 0.01,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest) + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function StatsBar() {
  const reduceMotion = useReducedMotion();

  const t = useTranslations("pages.home.statsBar");

  return (
    <section aria-label="Statistik Lion Cargo Logistik" className="bg-white pt-2 pb-10 sm:pt-4 sm:pb-14 border-b border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* HEADER SECTION METRICS */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 15,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-slate-100 pb-4"
        >
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              {t("headingBefore")} <span className="text-red-600">{t("headingHighlight")}</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md leading-relaxed">{t("description")}</p>
        </motion.div>
        {/* STATISTIK GRID 4 KOLOM */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {statsData.map(({ numericValue, suffix, key, icon: Icon }) => (
            <div
              key={key}
              className="relative p-5 sm:p-6 rounded-2xl bg-linear-to-b from-red-50/70 via-red-50/30 to-white border border-red-100/80 shadow-2xs hover:border-red-300 hover:shadow-md transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-white border border-red-100 text-red-600 shadow-2xs group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="size-5 sm:size-6" />
                </div>

                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-600 bg-red-100/60 px-2 py-0.5 rounded">{t("verified")}</span>
              </div>

              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none text-red-600 block">
                  <AnimatedNumber value={numericValue} suffix={suffix} />
                </span>

                <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight pt-1">{t(`stats.${key}.label`)}</h3>

                <p className="text-xs text-slate-500 font-medium leading-snug">{t(`stats.${key}.sublabel`)}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
