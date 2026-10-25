import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Layanan } from "@/components/sections/layanan";
import { PhotoMarquee } from "@/components/sections/photo-marquee";
import { StatsBar } from "@/components/sections/stats-bar";
import { AirlinePartners } from "@/components/sections/airline-partners";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { KeunggulanBar } from "@/components/sections/keunggulan-bar";
import { Testimoni } from "@/components/sections/testimoni";
import { waLink } from "@/utils/wa-link";

/* Teks putih: outline tipis + bayangan lembut */
const headlineStyle: CSSProperties = {
  WebkitTextStroke: "2px rgba(11, 31, 58, 0.45)",
  paintOrder: "stroke fill",
  textShadow: "0 2px 12px rgba(11, 31, 58, 0.55), 0 6px 32px rgba(11, 31, 58, 0.45)",
};

/* Teks merah: jauh lebih tipis supaya tidak terlihat seperti garis */
const accentStyle: CSSProperties = {
  WebkitTextStroke: "0.6px rgba(11, 31, 58, 0.18)",
  paintOrder: "stroke fill",
  textShadow: "0 2px 10px rgba(11, 31, 58, 0.4), 0 6px 26px rgba(11, 31, 58, 0.3)",
};

const bodyStyle: CSSProperties = {
  WebkitTextStroke: "1.5px rgba(11, 31, 58, 0.4)",
  paintOrder: "stroke fill",
  textShadow: "0 1px 8px rgba(11, 31, 58, 0.55), 0 3px 22px rgba(11, 31, 58, 0.4)",
};

export default function HomePage() {
  return (
    <>
      <section className="relative isolate flex min-h-152 items-end justify-center overflow-hidden bg-charcoal lg:min-h-176">
        {/* Gambar asli, tanpa overlay */}
        <Image src="/images/hero.jpg" alt="" aria-hidden="true" fill priority quality={90} sizes="100vw" className="object-cover object-top" />

        <div className="relative mx-auto max-w-3xl px-4 pb-10 pt-56 text-center text-white sm:px-6 lg:pb-14 lg:pt-72">
          <h1 style={headlineStyle} className="text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
            Kirim Cargo Udara ke Seluruh Indonesia{" "}
            <span style={accentStyle} className="text-[#ff3b57]">
              Cepat, Aman, Tarif Jelas
            </span>
          </h1>

          <p style={bodyStyle} className="mx-auto mt-5 max-w-xl text-lg font-semibold leading-relaxed text-white sm:text-xl">
            Barang dan dokumen dari Jakarta lewat Bandara Soekarno-Hatta sampai tujuan dengan proses mudah. Cek tarif per kg sekarang, tanpa ribet.
          </p>

          {/* Tombol muncul dari bawah ke atas, bergantian */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Reveal delay={150} className="w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                className="group h-14 w-full rounded-lg bg-brand px-8 text-base font-bold tracking-wide shadow-lg shadow-brand/40 transition-all duration-300 hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/50 active:scale-[0.98] sm:w-auto"
              >
                <Link href="/cek-ongkir">
                  Cek Ongkir
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
                  Hubungi Kami
                </a>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <PhotoMarquee />

      {/* 3 KEUNGGULAN UTAMA DILAKUKAN DI SINI */}
      <KeunggulanBar />

      {/* STATS BAR */}
      <StatsBar />

      {/* LAYANAN ZIG-ZAG */}
      <Layanan />

      <AirlinePartners />

      {/* FEATURE GRID BANNER */}
      <FeatureGrid />

      <Testimoni />
    </>
  );
}
