"use client";

import { MapPin, ArrowUpRight } from "lucide-react";

export function KontakMap() {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <MapPin className="size-5 text-red-600" />
              Peta Lokasi Lion Cargo Logistik (CGK)
            </h2>
            <p className="text-xs text-slate-500">Gunakan navigasi peta interaktif di bawah untuk menuju titik lokasi penimbangan kargo kami. Gedung RA Gatrans Bandar Udara Internasional Soekarno–Hatta</p>
          </div>
          <a href="https://maps.app.goo.gl/TgZ4SZVXi367Ht2e6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-extrabold text-red-600 hover:text-red-700 hover:underline shrink-0">
            <span>Buka Aplikasi Google Maps</span>
            <ArrowUpRight className="size-4" />
          </a>
        </div>

        {/* KOTAK PETA BESAR (FULL CONTAINER) */}
        <div className="w-full h-100 sm:h-125 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative shadow-inner">
          <iframe
            title="Peta Lokasi Lion Cargo Logistik Bandara Soekarno-Hatta"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.985012351234!2d106.6508900!3d-6.1327100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a0280efefb2ef%3A0x6b84eb43b3df8f9b!2sTerminal%20Kargo%20Soekarno-Hatta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
