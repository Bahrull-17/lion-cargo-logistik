"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Phone, Mail, MapPin, Clock, Send, Building2, CheckCircle2, ArrowUpRight } from "lucide-react";
import { waLink } from "@/utils/wa-link";

export function KontakContent() {
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
    <div className="bg-slate-50 text-slate-800 min-h-screen pb-12 sm:pb-16 overflow-hidden relative">
      {/* 1. HERO SECTION */}
      <section className="w-full bg-white border-b border-slate-200/60 pt-6 pb-10 sm:pb-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-4 sm:mb-6">
            <Link href="/" className="hover:text-red-600 transition-colors flex items-center gap-1 text-slate-600">
              Beranda
            </Link>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="text-red-600 font-bold">Hubungi Kami</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Siap Membantu Kebutuhan <br className="hidden sm:inline" />
              <span className="inline-block mt-1 px-4 py-1 bg-red-600 text-white rounded-2xl shadow-lg shadow-red-600/20 transform -rotate-1">Kargo Udara Anda</span>
            </h1>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto pt-1">
              Punya pertanyaan seputar tarif, rute penerbangan, atau jadwal penjemputan barang? Tim <strong className="text-slate-900">Lion Cargo Logistik Bandara Soekarno-Hatta (CGK)</strong> siap melayani Anda 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* 2. GRID INFO KONTAK & FORM PESAN */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* INFORMASI KONTAK & OPERASIONAL (LEFT COLUMN) */}
          <div className="lg:col-span-5 space-y-6">
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
                        +62 812-3456-7890
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
                    <p className="text-slate-600 mt-0.5 font-mono">lioncargologistiklioncargo@gamil.com</p>
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
          </div>

          {/* FORMULIR KIRIM PESAN (RIGHT COLUMN) */}
          <div className="lg:col-span-7">
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

                  {/* ISi PESAN */}
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

                  <p className="text-[11px] text-center text-slate-400 pt-1">* Pesan Anda akan langsung dikirimkan ke WhatsApp Customer Service resmi kami.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PETA LOKASI GOOGLE MAPS EMBED */}
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
    </div>
  );
}
