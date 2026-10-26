"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Ikon 1: Kardus Ditumpuk & Diikat Tali (Harga Termurah)
function IconBoxes({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="32" width="22" height="18" rx="1" />
      <rect x="32" y="32" width="26" height="18" rx="1" />
      <rect x="18" y="14" width="22" height="16" rx="1" />
      <path d="M6 50h52" />
      <path d="M12 50V32" />
      <path d="M48 50V32" />
      <path d="M24 30V14" />
      <path d="M34 30V14" />
      <path d="M8 12l21 21M44 12L23 33" strokeWidth="2" />
    </svg>
  );
}

// Ikon 2: Crane / Derek Kontainer Kargo (Bergaransi)
function IconCrane({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 52V16l24-6" />
      <path d="M10 22h32l10 10" />
      <path d="M22 13v9" />
      <path d="M32 10v12" />
      <path d="M42 32v12" />
      <rect x="6" y="36" width="16" height="16" rx="1" />
      <rect x="24" y="36" width="16" height="16" rx="1" />
      <path d="M10 40h8M10 44h8M10 48h8" strokeWidth="1.5" />
      <path d="M28 40h8M28 44h8M28 48h8" strokeWidth="1.5" />
    </svg>
  );
}

// Ikon 3: Tangan Menopang Paket Kargo (Tepat Waktu)
function IconHandBox({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 16l14-7 14 7-14 7-14-7z" />
      <path d="M24 16v14l14 7V23" />
      <path d="M52 16v14l-14 7" />
      <path d="M38 23l-14-7" />
      <path d="M6 38h14l8 6h18a4 4 0 0 0 4-4v-2" />
      <path d="M6 46h16l10-4" />
    </svg>
  );
}

const dataKeunggulan = [
  {
    Icon: IconBoxes,
    title: "Harga Termurah",
    text: "Kami selalu memberikan penawaran harga yang terbaik setiap layanan pengiriman barang.",
  },
  {
    Icon: IconCrane,
    title: "Bergaransi",
    text: "Kami memberikan garansi keamanan dan kecepatan pada setiap pengiriman barang klien.",
  },
  {
    Icon: IconHandBox,
    title: "Tepat Waktu",
    text: "Ketepatan pengiriman setiap barang merupakan hal yang selalu kami utamakan.",
  },
];

export function KeunggulanBar() {
  return (
    <section aria-label="Keunggulan dan Operasional Lion Cargo Logistik" className="bg-[#f8f9fa] py-10 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* BAGIAN 1: 3 KEUNGGULAN UTAMA (MUNCUL HALUS SAAT SCROLL) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-slate-200/80"
        >
          {dataKeunggulan.map(({ Icon, title, text }, idx) => (
            <div key={title} className={`flex items-start gap-4 sm:gap-6 ${idx === 0 ? "md:pr-8" : idx === 1 ? "md:px-8" : "md:pl-8"}`}>
              <div className="shrink-0 text-[#E65100]">
                <Icon className="size-12 sm:size-14" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{title}</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">{text}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* BAGIAN 2: FOTO & TEKS BERGERAK DUA ARAH SAAT SCROLL (TANPA KOTAK) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2">
          {/* Sisi Kiri: Foto Meluncur dari Kiri saat di-Scroll (Tanpa Border/Card) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative aspect-16/10 w-full overflow-hidden rounded-2xl group shadow-sm"
          >
            <Image
              src="/images/home/keunggulan-logistik.jpg"
              alt="Armada dan Fasilitas Logistik Kargo Udara Bandara Soekarno-Hatta"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </motion.div>

          {/* Sisi Kanan: Teks Meluncur dari Kanan saat di-Scroll */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="lg:col-span-6 space-y-4">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Terhubung Langsung dengan <span className="text-red-600">Penerbangan Harian Nusantara</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm lg:text-base leading-relaxed text-slate-600 font-medium">
              <p>
                Didukung oleh jaringan penanganan kargo udara terpadu langsung dari <strong className="text-slate-900">Terminal Kargo Bandara Internasional Soekarno-Hatta (CGK)</strong>.
              </p>
              <p>Setiap muatan diproses melalui standar inspeksi ketat dan pengawalan slot penerbangan agar komoditas serta paket kiriman bisnis Anda siap terbang tepat jadwal tanpa penundaan.</p>
            </div>

            <div className="pt-2 flex flex-wrap gap-2 text-xs sm:text-sm">
              <span className="px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 font-semibold text-slate-700 shadow-2xs">🏢 Hub Bandara CGK</span>
              <span className="px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 font-semibold text-slate-700 shadow-2xs">🔒 Security Inspection</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
