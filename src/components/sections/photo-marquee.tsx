"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const fotoKanan = {
  src: "/images/hero-2.jpg",
  alt: "Barang cargo siap dikirim di area bandara",
};

const fotoKiri = {
  src: "/images/hero-3.jpg",
  alt: "Barang cargo yang ditata rapi untuk pengiriman udara",
};

const slideIn: Variants = {
  hidden: (from: string) => ({ opacity: 0, x: from }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  },
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
    <Reveal variants={slideIn} custom={from} className="relative aspect-4/3 overflow-hidden rounded-xl bg-slate-100 shadow-xs border border-slate-200/80 group">
      <Image src={src} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
    </Reveal>
  );
}

export function PhotoMarquee() {
  return (
    <section aria-labelledby="pengantar-heading" className="overflow-hidden bg-white py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-2 md:gap-10 lg:px-8">
        {/* BLOK 1: TEKS KIRI (Order 1 di HP & Desktop) */}
        <Reveal variants={fadeUp} className="order-1 flex h-full flex-col justify-center text-left md:pr-4">
          <h2 id="pengantar-heading" className="text-balance text-2xl font-extrabold leading-tight text-charcoal sm:text-3xl lg:text-4xl">
            Agen Cargo Udara dari <span className="text-red-600">Bandara Soekarno-Hatta</span> untuk Pengiriman ke Seluruh Indonesia
          </h2>

          <div className="mt-4 space-y-3 text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
            <p>
              <strong className="text-slate-900 font-semibold">Lion Cargo Logistik</strong> membantu pengiriman barang dan dokumen lewat pesawat dari Jakarta ke bandara tujuan di berbagai kota di Indonesia.
            </p>
            <p>
              Tarif dihitung <span className="font-semibold text-slate-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">per kilogram</span> dan bisa dicek lebih dulu, sehingga biaya kirim jelas transparan sebelum Anda
              memesan.
            </p>
            <p className="pb-2">Cocok untuk kebutuhan pribadi, toko online, maupun usaha yang rutin mengirim barang antar kota, dengan layanan pelanggan yang responsif lewat WhatsApp.</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:text-sm pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 font-semibold text-slate-700">✈️ Penerbangan Harian</div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 font-semibold text-slate-700">⚖️ Tarif Per Kg Jelas</div>
          </div>
        </Reveal>

        {/* FOTO 1 (Order 2 di HP, Order 2 di Desktop) */}
        <div className="order-2">
          <Foto {...fotoKanan} from="60px" />
        </div>

        {/* BLOK 2: TEKS KANAN (Order 3 di HP, Order 4 di Desktop) */}
        <Reveal variants={fadeUp} className="order-3 md:order-4 flex h-full flex-col justify-center text-left md:pl-4">
          <h3 className="mt-2 text-balance text-2xl font-extrabold leading-tight text-charcoal sm:text-3xl lg:text-4xl">
            Kirim Barang Antar Kota Lebih <span className="text-red-600">Mudah dan Jelas</span>
          </h3>

          <div className="mt-4 space-y-3 text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
            <p>Mengirim barang lewat pesawat tidak perlu rumit. Tentukan kota tujuan dan perkirakan berat barang, lalu hitung biaya kirimnya dari tarif per kg yang tersedia.</p>
            <p>
              Jika sudah cocok, hubungi kami lewat <strong className="text-slate-900 font-semibold">WhatsApp</strong> untuk mengatur pengiriman dari Bandara Soekarno-Hatta.
            </p>
            <p className="pb-2">Dengan begitu Anda sudah tahu biayanya sejak awal, dan barang langsung dikirim melalui jalur udara ke kota tujuan secara aman.</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:text-sm pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 font-semibold text-slate-700">💬 Fast Response WA</div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 font-semibold text-slate-700">📍 Port-to-Port / Door</div>
          </div>
        </Reveal>

        {/* FOTO 2 (Order 4 di HP, Order 3 di Desktop) */}
        <div className="order-4 md:order-3">
          <Foto {...fotoKiri} from="-60px" />
        </div>
      </div>
    </section>
  );
}
