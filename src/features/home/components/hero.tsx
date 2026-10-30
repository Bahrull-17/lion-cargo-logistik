import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { waLink } from "@/lib/wa-link";

/* Teks putih */
const headlineStyle: CSSProperties = {
  WebkitTextStroke: "2px rgba(11, 31, 58, 0.45)",
  paintOrder: "stroke fill",
  textShadow: "0 2px 12px rgba(11, 31, 58, 0.55), 0 6px 32px rgba(11, 31, 58, 0.45)",
};

/* Teks merah */
const accentStyle: CSSProperties = {
  WebkitTextStroke: "0.6px rgba(11, 31, 58, 0.18)",
  paintOrder: "stroke fill",
  textShadow: "0 2px 10px rgba(11, 31, 58, 0.4), 0 6px 26px rgba(11, 31, 58, 0.3)",
};

/* Body */
const bodyStyle: CSSProperties = {
  WebkitTextStroke: "1.5px rgba(11, 31, 58, 0.4)",
  paintOrder: "stroke fill",
  textShadow: "0 1px 8px rgba(11, 31, 58, 0.55), 0 3px 22px rgba(11, 31, 58, 0.4)",
};

export default async function Hero() {
  const t = await getTranslations("pages.home.hero");
  const c = await getTranslations("common");

  return (
    <section className="relative isolate flex min-h-152 items-end justify-center overflow-hidden bg-charcoal lg:min-h-176">
      <Image src="/images/home/hero.jpg" alt="Pengiriman cargo udara Lion Cargo Logistik melalui pesawat" aria-hidden="true" fill priority quality={90} sizes="100vw" className="object-cover object-top" />

      <div className="relative mx-auto max-w-3xl px-4 pb-10 pt-56 text-center text-white sm:px-6 lg:pb-14 lg:pt-72">
        <h1 style={headlineStyle} className="text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
          {t("title")}{" "}
          <span style={accentStyle} className="text-[#ff3b57]">
            {t("highlight")}
          </span>
        </h1>

        <p style={bodyStyle} className="mx-auto mt-5 max-w-xl text-lg font-semibold leading-relaxed text-white sm:text-xl">
          {t("description")}
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Reveal delay={150} className="w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="group h-14 w-full rounded-lg bg-brand px-8 text-base font-bold tracking-wide shadow-lg shadow-brand/40 transition-all duration-300 hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/50 active:scale-[0.98] sm:w-auto"
            >
              <Link href="/cek-ongkir">
                {c("checkRate")}
                <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </Reveal>

          <Reveal delay={350} className="w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 w-full rounded-lg border-white/70 bg-[#0b1f3a]/50 px-8 text-base font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-charcoal active:scale-[0.98] sm:w-auto"
            >
              <a href={waLink("Halo Lion Cargo Logistik, saya ingin bertanya tentang pengiriman cargo.")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-5" />
                {c("contactUs")}
              </a>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
