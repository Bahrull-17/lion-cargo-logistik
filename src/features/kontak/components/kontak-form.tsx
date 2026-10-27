"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { waLink } from "@/lib/wa-link";

export function KontakForm() {
  const [formData, setFormData] = useState({
    nama: "",
    noHp: "",
    email: "",
    subjek: "Konsultasi Pengiriman",
    pesan: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format pesan WhatsApp otomatis dari isi formulir
    const pesanWa = `Halo Lion Cargo Logistik, saya ${formData.nama} (${formData.noHp}).\n\nSubjek: ${formData.subjek}\nPesan: ${formData.pesan}`;

    // Redirect ke WhatsApp
    window.open(waLink(pesanWa), "_blank");
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
      <div className="border-b border-slate-100 pb-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">Kirim Pesan atau Pertanyaan</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Isi formulir di bawah ini untuk terhubung langsung dengan tim marketing kami.</p>
      </div>

      {isSubmitted ? (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="size-10" />
          </div>
          <h3 className="text-lg font-black text-slate-900">Pesan Terkirim!</h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">Terima kasih telah menghubungi kami. Anda sedang dihubungkan ke WhatsApp Customer Service kami.</p>
          <button onClick={() => setIsSubmitted(false)} className="mt-4 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all cursor-pointer">
            Kirim Pesan Lain
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* NAMA LENGKAP */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Nama Lengkap *</label>
              <input
                type="text"
                required
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                placeholder="Contoh: Budi Santoso"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:border-red-600 focus:bg-white focus:outline-hidden transition-all"
              />
            </div>

            {/* NOMOR HP / WHATSAPP */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Nomor WhatsApp *</label>
              <input
                type="tel"
                required
                value={formData.noHp}
                onChange={(e) => setFormData({ ...formData, noHp: e.target.value })}
                placeholder="Contoh: 081234567890"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:border-red-600 focus:bg-white focus:outline-hidden transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* EMAIL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Email (Opsional)</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="budi@email.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:border-red-600 focus:bg-white focus:outline-hidden transition-all"
              />
            </div>

            {/* SUBJEK PERTANYAAN */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Subjek Topik</label>
              <select
                value={formData.subjek}
                onChange={(e) => setFormData({ ...formData, subjek: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:border-red-600 focus:bg-white focus:outline-hidden transition-all cursor-pointer"
              >
                <option value="Konsultasi Pengiriman">Konsultasi Pengiriman Kargo</option>
                <option value="Cek Tarif & Rute">Cek Tarif &amp; Rute Spesial</option>
                <option value="Pengiriman Hewan / Live Animal">Pengiriman Hewan (Live Animal)</option>
                <option value="Kerjasama Korporat / B2B">Kerjasama Korporat / B2B</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          {/* ISI PESAN */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Pesan Detail *</label>
            <textarea
              required
              rows={4}
              value={formData.pesan}
              onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
              placeholder="Tuliskan kota tujuan, perkiraan berat barang, atau pertanyaan Anda..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:border-red-600 focus:bg-white focus:outline-hidden transition-all placeholder:text-slate-400"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-red-600/20 hover:shadow-red-600/40 active:scale-98 transition-all cursor-pointer"
          >
            <Send className="size-4" />
            <span>Kirim Pesan via WhatsApp</span>
          </button>

          <p className="text-[11px] text-center text-slate-400 pt-1">Pesan Anda akan langsung dikirimkan ke WhatsApp Customer Service resmi kami.</p>
        </form>
      )}
    </div>
  );
}
