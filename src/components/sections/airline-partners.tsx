"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const airlineLogos = [
  { name: "Citilink", logo: "/images/citilink.png" },
  { name: "Garuda Indonesia", logo: "/images/garuda.png" },
  { name: "Wings Air", logo: "/images/wings.png" },
  { name: "Batik Air", logo: "/images/batik.png" },
  { name: "Sriwijaya Air", logo: "/images/sriwijaya.png" },
  { name: "Lion Air", logo: "/images/lion.png" },
  { name: "Rimbun Air", logo: "/images/rimbun.png" },
  { name: "Eka Cargo / ECA", logo: "/images/eca.png" },
];

export function AirlinePartners() {
  const reduceMotion = useReducedMotion();

  // Duplikasi array agar pergerakan infinite marquee mulus tanpa patah
  const duplicatedLogos = [...airlineLogos, ...airlineLogos, ...airlineLogos];

  return (
    <section aria-label="Mitra Maskapai Penerbangan dan Kargo Udara" className="bg-white py-12 sm:py-16 border-b border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* HEADER & SEO KEYWORDS */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight">
            Armada Penerbangan Domestik & <span className="text-red-600">Ekspedisi Kargo Udara Terpercaya</span>
          </h2>

          <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
            Lion Cargo Logistik bermitra strategis dengan maskapai penerbangan nasional terkemuka seperti Lion Air, Garuda Indonesia, Citilink, dan Batik Air. Melayani jasa pengiriman barang kilat, kargo bandara ke bandara (*port to port*),
            serta logistik door-to-door dengan tarif per kg murah dan jadwal penerbangan harian tepat waktu ke seluruh wilayah Indonesia.
          </p>
        </motion.div>

        {/* INFINITE MARQUEE CONTAINER (BERGERAK KIRI KE KANAN TERUS MENERUS) */}
        <div className="relative w-full overflow-hidden mask-gradient py-4">
          {/* Efek gradasi pudar di sisi kiri dan kanan */}
          <div className="absolute left-0 inset-y-0 w-16 sm:w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-16 sm:w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={reduceMotion ? {} : { x: ["0%", "-33.33%"] }}
            transition={{
              duration: 25,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex items-center gap-4 sm:gap-6 w-max"
          >
            {duplicatedLogos.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="flex items-center justify-center px-6 py-4 bg-slate-50/80 border border-slate-200/60 rounded-xl hover:border-red-200 hover:bg-white hover:shadow-sm transition-all duration-300 shrink-0 w-40 sm:w-50 h-18.75 sm:h-22.5 group"
                title={item.name}
              >
                <div className="relative h-8 sm:h-11 w-full">
                  <Image src={item.logo} alt={`Logo Maskapai Kargo ${item.name}`} fill sizes="(min-width: 1024px) 180px, 120px" className="object-contain" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
