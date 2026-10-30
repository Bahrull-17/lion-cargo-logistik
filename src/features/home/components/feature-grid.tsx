"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function FeatureGrid() {
  const t = useTranslations("pages.home.featureGrid");

  return (
    <section aria-label="Informasi Cepat Lion Cargo Logistik" className="bg-white py-4 sm:py-6">
      {/* Container Full Width Rata Kanan Kiri */}
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 shadow-sm"
        >
          {/* KOTAK 1: MERAH BRAND (PENGIRIMAN CEPAT) */}
          <div className="bg-brand text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 min-h-80 sm:min-h-105">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-white/15 text-[11px] font-bold tracking-wider uppercase border border-white/20">{t("priority.badge")}</span>

              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-none uppercase">
                {t("priority.title.line1")}
                <br />
                {t("priority.title.line2")}
              </h3>

              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium max-w-xs">{t("priority.description")}</p>
            </div>

            {/* Tombol dengan Animasi Masuk saat Scroll */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link href="/kontak" className="inline-block px-7 py-3 border-2 border-white text-white font-extrabold text-xs uppercase tracking-widest hover:bg-white hover:text-brand transition-all rounded-none active:scale-95 shadow-2xs">
                {t("priority.button")}
              </Link>
            </motion.div>
          </div>

          {/* KOTAK 2: GAMBAR (MAPS / PESAWAT) */}
          <div className="relative aspect-4/3 sm:aspect-auto sm:min-h-105 bg-slate-900 overflow-hidden group">
            <Image
              src="/images/home/lokasi-paket.jpg"
              alt="Paket kargo dalam penanda lokasi, ilustrasi layanan antar ke seluruh Indonesia"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>
          {/* KOTAK 3: WARNA CUSTOM UNTUK LOKASI & MAPS */}
          <div className="bg-[#424E4D] text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 min-h-80 sm:min-h-105">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/15 flex items-center justify-center border border-white/20 shadow-2xs">
                <MapPin className="size-6 text-white" />
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-none uppercase">
                {t("location.title.line1")}
                <br />
                {t("location.title.line2")}
              </h3>

              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium max-w-xs">{t("location.description")}</p>
            </div>

            {/* Tombol dengan Animasi Masuk saat Scroll */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <a
                href="https://maps.app.goo.gl/TgZ4SZVXi367Ht2e6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-7 py-3 border-2 border-white text-white font-extrabold text-xs uppercase tracking-widest hover:bg-white hover:text-[#424E4D] transition-all rounded-none active:scale-95 shadow-2xs"
              >
                {t("location.button")}
              </a>
            </motion.div>
          </div>

          {/* KOTAK 4: GAMBAR (PESAWAT / MAPS) */}
          <div className="relative aspect-4/3 sm:aspect-auto sm:min-h-105 bg-slate-900 overflow-hidden group">
            <Image src="/images/home/armada-pesawat.jpg" alt="Armada pesawat kargo udara Lion Cargo Logistik di apron bandara" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
