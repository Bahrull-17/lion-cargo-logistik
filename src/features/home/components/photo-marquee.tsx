"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { MapPin, MessageCircle, Plane, Scale, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const fotoKanan = {
  src: "/images/home/marquee-kanan.jpg",
};

const fotoKiri = {
  src: "/images/home/marquee-kiri.jpg",
};

const slideIn: Variants = {
  hidden: (from: string) => ({
    opacity: 0,
    x: from,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Tag rich-text untuk t.rich().
 * Tag didefinisikan di JSON, misalnya <highlight>...</highlight>.
 */
const richTags = {
  highlight: (chunks: React.ReactNode) => <span className="text-red-600">{chunks}</span>,
  brand: (chunks: React.ReactNode) => <strong className="font-semibold text-slate-900">{chunks}</strong>,
  emphasis: (chunks: React.ReactNode) => <span className="rounded border border-amber-200/60 bg-amber-50 px-1.5 py-0.5 font-semibold text-slate-900">{chunks}</span>,
};

function Reveal({ variants, custom, className, children }: { variants: Variants; custom?: string; className?: string; children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div className={className} initial={reduceMotion ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <motion.div custom={custom} variants={variants} className="h-full">
        {children}
      </motion.div>
    </motion.div>
  );
}

function Foto({ src, alt, from }: { src: string; alt: string; from: string }) {
  return (
    <Reveal variants={slideIn} custom={from} className="group relative aspect-4/3 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100 shadow-xs">
      <Image src={src} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
    </Reveal>
  );
}

function Badge({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2 font-semibold text-slate-700">
      <Icon className="size-4 shrink-0 text-red-600" aria-hidden="true" />
      {children}
    </div>
  );
}

export function PhotoMarquee() {
  const t = useTranslations("pages.home.photoMarquee");

  return (
    <section aria-labelledby="photo-marquee-heading" className="overflow-hidden bg-white py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-2 md:gap-10 lg:px-8">
        {/* BLOK 1 */}
        <Reveal variants={fadeUp} className="order-1 flex h-full flex-col justify-center text-left md:pr-4">
          <h2 id="photo-marquee-heading" className="text-balance text-2xl font-extrabold leading-tight text-charcoal sm:text-3xl lg:text-4xl">
            {t.rich("intro.heading", richTags)}
          </h2>

          <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
            <p>{t.rich("intro.paragraph1", richTags)}</p>

            <p>{t.rich("intro.rate", richTags)}</p>

            <p className="pb-2">{t("intro.paragraph3")}</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-2 text-xs sm:text-sm">
            <Badge icon={Plane}>{t("intro.badges.flight")}</Badge>
            <Badge icon={Scale}>{t("intro.badges.rate")}</Badge>
          </div>
        </Reveal>

        {/* FOTO 1 */}
        <div className="order-2">
          <Foto {...fotoKanan} alt={t("images.right")} from="60px" />
        </div>

        {/* BLOK 2 */}
        <Reveal variants={fadeUp} className="order-3 flex h-full flex-col justify-center text-left md:order-4 md:pl-4">
          <h3 className="mt-2 text-balance text-2xl font-extrabold leading-tight text-charcoal sm:text-3xl lg:text-4xl">{t.rich("guide.heading", richTags)}</h3>

          <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
            <p>{t("guide.paragraph1")}</p>

            <p>{t("guide.paragraph2")}</p>

            <p className="pb-2">{t("guide.paragraph3")}</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-2 text-xs sm:text-sm">
            <Badge icon={MessageCircle}>{t("guide.badges.response")}</Badge>
            <Badge icon={MapPin}>{t("guide.badges.port")}</Badge>
          </div>
        </Reveal>

        {/* FOTO 2 */}
        <div className="order-4 md:order-3">
          <Foto {...fotoKiri} alt={t("images.left")} from="-60px" />
        </div>
      </div>
    </section>
  );
}
