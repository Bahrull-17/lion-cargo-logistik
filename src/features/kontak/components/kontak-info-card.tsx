"use client";

import { Phone, Mail, MapPin, Clock, Building2 } from "lucide-react";
import { waLink } from "@/lib/wa-link";

export function KontakInfoCard() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
          <Building2 className="size-5 text-red-600" />
          Kantor &amp; Terminal Kargo
        </h2>
        <p className="text-xs text-slate-500 mt-1">Pusat layanan ekspedisi &amp; operasional kargo udara.</p>
      </div>

      <div className="space-y-5 text-xs sm:text-sm">
        {/* ALAMAT */}
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-2xl bg-red-50 text-red-600 shrink-0 mt-0.5">
            <MapPin className="size-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900">Alamat Operasional</h3>
            <p className="text-slate-600 mt-0.5 leading-relaxed">Area Terminal Kargo Domestik, Bandara Internasional Soekarno-Hatta (CGK), Pajang, Kec. Benda, Kota Tangerang, Banten 15126.</p>
          </div>
        </div>

        {/* TELEPON & WHATSAPP */}
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-2xl bg-red-50 text-red-600 shrink-0 mt-0.5">
            <Phone className="size-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900">Customer Service / WA</h3>
            <p className="text-slate-600 mt-0.5">
              <a href={waLink("Halo CS Lion Cargo Logistik...")} target="_blank" rel="noopener noreferrer" className="hover:text-red-600 font-semibold underline">
                +62 821-2121-3025
              </a>
            </p>
          </div>
        </div>

        {/* EMAIL */}
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-2xl bg-red-50 text-red-600 shrink-0 mt-0.5">
            <Mail className="size-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900">Email Resmi</h3>
            <p className="text-slate-600 mt-0.5 font-mono">lioncargologistiklioncargo@gmail.com</p>
          </div>
        </div>

        {/* JAM OPERASIONAL */}
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-2xl bg-red-50 text-red-600 shrink-0 mt-0.5">
            <Clock className="size-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900">Jam Operasional Terminal</h3>
            <p className="text-slate-600 mt-0.5 leading-relaxed">
              Senin – Minggu: <strong className="text-slate-900">24 Jam Nonstop</strong> <br />
              (Layanan Penimbangan &amp; Flight Express)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
