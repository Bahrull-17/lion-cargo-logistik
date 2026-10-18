"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

// Foto di sisi kanan (masuk dari kanan)
const fotoKanan = {
  src: "/images/hero-2.jpg",
  alt: "Barang cargo siap dikirim di area bandara",
};

// Foto di sisi kiri (masuk dari kiri)
const fotoKiri = {
  src: "/images/hero-3.jpg",
  alt: "Barang cargo yang ditata rapi untuk pengiriman udara",
};

const slideIn: Variants = {
  hidden: (from: string) => ({ opacity: 0, x: from }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

function Reveal({ variants, custom, className, children }: { variants: Variants; custom?: string; className?: string; children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div className="h-full" initial={reduceMotion ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
      <motion.div custom={custom} variants={variants} className={className}>
        {children}
      </motion.div>
    </motion.div>
  );
}

function Foto({ src, alt, from }: { src: string; alt: string; from: string }) {
  return (
    <Reveal variants={slideIn} custom={from} className="relative aspect-4/3 overflow-hidden rounded-lg bg-secondary">
      <Image src={src} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
    </Reveal>
  );
}

export function PhotoMarquee() {
  return (
    <section aria-labelledby="pengantar-heading" className="overflow-hidden bg-white py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 md:gap-6 lg:px-8">
        <Reveal variants={fadeUp} className="flex h-full flex-col justify-center text-center md:pr-6 md:text-left">
          <h2 id="pengantar-heading" className="text-balance text-2xl font-extrabold leading-tight text-charcoal sm:text-4xl">
            Agen Cargo Udara dari Bandara Soekarno-Hatta untuk Pengiriman ke Seluruh Indonesia
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Lion Cargo Logistik membantu pengiriman barang dan dokumen lewat pesawat dari Jakarta ke bandara tujuan di berbagai kota di Indonesia. Tarif dihitung per kg dan bisa dicek lebih dulu, sehingga biaya kirim jelas sebelum Anda
            memesan. Cocok untuk kebutuhan pribadi, toko online, maupun usaha yang rutin mengirim barang antarpulau, dengan layanan pelanggan yang mudah dihubungi lewat WhatsApp.
          </p>
        </Reveal>

        <Foto {...fotoKanan} from="80%" />

        <Foto {...fotoKiri} from="-80%" />

        <Reveal variants={fadeUp} className="flex h-full flex-col justify-center text-center md:pl-6 md:text-left">
          <h3 className="text-balance text-2xl font-extrabold leading-tight text-charcoal sm:text-4xl">Kirim Barang Antarpulau Lebih Mudah dan Jelas</h3>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Mengirim barang lewat pesawat tidak perlu rumit. Tentukan kota tujuan dan perkirakan berat barang, lalu hitung biaya kirimnya dari tarif per kg yang tersedia. Jika sudah cocok, hubungi kami lewat WhatsApp untuk mengatur
            pengiriman dari Bandara Soekarno-Hatta. Dengan begitu Anda sudah tahu biayanya sejak awal, dan barang dikirim melalui jalur udara ke kota tujuan.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
