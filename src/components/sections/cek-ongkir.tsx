"use client";

import { useState, useId } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plane, Scale, Send, ArrowRight, ShieldCheck, MapPin, Sparkles, Zap, Calculator, Search, ChevronLeft, ChevronRight, PackageCheck, Info } from "lucide-react";
import { waLink } from "@/utils/wa-link";
import type { Destination } from "@/types/tarif";

const formatRupiah = (value: number) => value.toLocaleString("id-ID");

interface CekOngkirSectionProps {
  destinations: Destination[];
}

export function CekOngkirSection({ destinations }: CekOngkirSectionProps) {
  const reduceMotion = useReducedMotion();
  const selectId = useId();
  const weightInputId = useId();

  const [selectedDestination, setSelectedDestination] = useState(destinations[0]?.slug ?? "");

  // SOLUSI BUG BERAT: Menggunakan string agar leluasa dihapus & diketik ulang di HP
  const [beratInputStr, setBeratInputStr] = useState<string>("10");

  // State pengontrol hasil kalkulasi setelah klik 'Cek Ongkir'
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  // State pencarian & paginasi tabel
  const [searchTableQuery, setSearchTableQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 15;

  const currentCity = destinations.find((c) => c.slug === selectedDestination) ?? destinations[0];

  // Aturan Operasional Kargo Udara Reguler
  const MINIMUM_WEIGHT_KG = 10;
  const BIAYA_HANDLING = 30000; // Rp 30.000

  // Perhitungan Tarif
  const parsedBerat = beratInputStr === "" ? 0 : Number(beratInputStr);
  const beratFinal = Math.max(parsedBerat, MINIMUM_WEIGHT_KG);
  const pricePerKg = currentCity?.pricePerKg ?? 0;
  const subtotalBiaya = pricePerKg * beratFinal;
  const totalBiaya = subtotalBiaya > 0 ? subtotalBiaya + BIAYA_HANDLING : 0;

  // Filter & Paginasi Tabel
  const filteredDestinations = destinations.filter((item) => item.name.toLowerCase().includes(searchTableQuery.toLowerCase()) || (item.code && item.code.toLowerCase().includes(searchTableQuery.toLowerCase())));

  const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDestinations = filteredDestinations.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setHasCalculated(true);
  };

  const handleSearchChange = (query: string) => {
    setSearchTableQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#f8fafc] text-slate-800 min-h-screen pb-20 sm:pb-28 overflow-hidden relative">
      {/* ==========================================
          1. HERO BANNER: UKURAN SESUAI PERMINTAAN
      ========================================== */}
      <motion.div
        className="w-full bg-white border-b border-slate-200/80 pt-2 pb-4 sm:pb-8 px-3 sm:px-6 lg:px-8"
        initial={reduceMotion ? false : { opacity: 0, y: -60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-6xl mx-auto relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-50">
          <div className="relative w-full h-auto flex items-center justify-center">
            <Image src="/images/hero-7.png" alt="Tarif Pengiriman Cargo Udara Bandara Soekarno Hatta - Lion Cargo Logistik" width={1400} height={650} priority className="w-full h-auto object-contain rounded-2xl sm:rounded-3xl" />
          </div>

          <div className="hidden sm:flex absolute bottom-4 left-4 items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/60 shadow-md">
            <span className="size-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <div className="text-[11px] leading-tight">
              <span className="font-extrabold text-slate-900 block">Status Flight Aktif</span>
              <span className="text-[10px] text-slate-600">Terminal Cargo CGK Soekarno-Hatta</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ==========================================
          2. HEADER JUDUL
      ========================================== */}
      <div className="relative pt-8 sm:pt-12 pb-6 px-4 sm:px-6">
        <div className="absolute inset-0 bg-linear-to-b from-red-50/50 via-slate-50/30 to-transparent pointer-events-none" />

        <motion.div
          className="relative max-w-4xl mx-auto text-center"
          initial={reduceMotion ? false : { opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-red-200 text-red-600 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="size-3.5 text-red-600 fill-red-100" /> Direct Flight Hub Soekarno-Hatta (CGK)
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight leading-[1.15]">
            Cek Ongkir Cargo Udara <br />
            <span className="text-red-600 font-extrabold">Pengiriman Cepat Port to Port</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Hitung estimasi ongkos kirim kargo udara secara akurat dan transparan bersama Lion Cargo. Dapatkan simulasi biaya pengiriman general cargo cepat via pesawat udara langsung dari Terminal Cargo Bandara Soekarno-Hatta (CGK) ke
            seluruh kota dan bandara destinasi di Indonesia, lengkap dengan rincian biaya penanganan admin bandara secara terperinci.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-bold text-slate-800">
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-slate-200/90 shadow-xs">
              <Zap className="size-4 text-amber-500 fill-amber-400" />
              <span>Prioritas Flight Langsung</span>
            </div>

            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-slate-200/90 shadow-xs">
              <PackageCheck className="size-4 text-red-600" />
              <span>Min. Pengiriman 10 Kg</span>
            </div>

            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-slate-200/90 shadow-xs">
              <ShieldCheck className="size-4 text-emerald-600" />
              <span>Penanganan Admin Rp 30.000</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ==========================================
          3. FORM KALKULATOR
      ========================================== */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20 relative z-10">
        <motion.div
          className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border-t-4 border-t-red-600 border-x border-b border-slate-200 shadow-xl"
          initial={reduceMotion ? false : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="size-10 sm:size-11 rounded-xl sm:rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold shadow-md shadow-red-600/30 shrink-0">
                <Calculator className="size-5 sm:size-6" />
              </div>
              <div>
                <h2 className="text-base sm:text-xl font-heading font-extrabold text-slate-900">Kalkulator Tarif Cargo Udara</h2>
                <p className="text-[11px] sm:text-xs text-slate-500">Pilih kota tujuan & masukkan berat kargo</p>
              </div>
            </div>

            <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200">
              <ShieldCheck className="size-4 text-emerald-600" /> Penanganan Admin Rp 30.000
            </span>
          </div>

          <form onSubmit={handleCalculate} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Select Kota Tujuan */}
              <div>
                <label htmlFor={selectId} className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Kota / Bandara Tujuan
                </label>
                <div className="relative">
                  <select
                    id={selectId}
                    value={selectedDestination}
                    onChange={(e) => {
                      setSelectedDestination(e.target.value);
                      setHasCalculated(false);
                    }}
                    className="w-full h-14 pl-4 pr-10 rounded-xl sm:rounded-2xl border-2 border-slate-200 bg-slate-50 text-xs sm:text-sm font-extrabold text-slate-900 focus:outline-none focus:border-red-600 focus:bg-white transition-all cursor-pointer appearance-none shadow-xs"
                  >
                    {destinations.map((kota) => (
                      <option key={kota.slug} value={kota.slug}>
                        {kota.name} {kota.code ? `(${kota.code})` : ""}
                      </option>
                    ))}
                  </select>
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-red-600 pointer-events-none" />
                </div>
              </div>

              {/* Input Berat Barang (FIXED: string-based agar mudah dihapus di HP) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor={weightInputId} className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Scale className="size-4 text-red-600" /> Berat Total Barang (Kg)
                  </label>
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-red-600 bg-red-50 px-2 sm:px-2.5 py-0.5 rounded-full border border-red-200">Min. {MINIMUM_WEIGHT_KG} Kg</span>
                </div>
                <div className="relative flex items-center">
                  <input
                    id={weightInputId}
                    type="number"
                    min={1}
                    value={beratInputStr}
                    onChange={(e) => {
                      setBeratInputStr(e.target.value);
                      setHasCalculated(false);
                    }}
                    className="w-full h-14 pl-4 pr-12 rounded-xl sm:rounded-2xl border-2 border-slate-200 bg-slate-50 text-base sm:text-lg font-mono font-bold text-slate-900 focus:outline-none focus:border-red-600 focus:bg-white transition-all shadow-xs"
                    placeholder="Contoh: 15"
                  />
                  <span className="absolute right-4 text-xs font-mono font-bold text-slate-400">KG</span>
                </div>
              </div>
            </div>

            {/* RUMUS PERHITUNGAN TRANSPARAN */}
            <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200/80 text-slate-800 text-xs leading-relaxed">
              <div className="flex items-center gap-2 font-bold text-red-700 mb-1.5">
                <Info className="size-4 shrink-0 text-red-600" />
                <span>Rumus Perhitungan Tarif Resmi Lion Cargo:</span>
              </div>
              <div className="font-mono bg-white p-2.5 rounded-xl border border-red-200/90 text-slate-900 font-extrabold text-[11px] sm:text-xs overflow-x-auto my-1.5 shadow-2xs">
                Total Biaya = (Tarif per Kg × Berat Tagihan) + Biaya Penanganan Admin (Rp 30.000)
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                Ketentuan: Minimal berat pengiriman adalah <strong className="text-slate-900">10 Kg</strong>. Pengiriman di bawah 10 Kg tetap dikenakan tarif minimal 10 Kg.
              </p>
            </div>

            {/* Tombol Cek Ongkir */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-2xl text-sm sm:text-base transition-all shadow-lg shadow-red-600/25 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Calculator className="size-5" />
                <span>Cek Ongkir Sekarang</span>
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          {/* HASIL KALKULASI REVEAL */}
          <AnimatePresence>
            {hasCalculated && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="bg-linear-to-br from-red-50/60 via-white to-amber-50/40 text-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border-2 border-red-200 shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-red-100">
                    <div>
                      <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full border border-red-200">ESTIMASI TARIF CARGO REGULER</span>
                      <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900 mt-1.5">{currentCity?.name}</h3>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-slate-500 font-mono block">ESTIMASI TIBA</span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200 inline-block mt-0.5">1 - 3 Hari Kerja</span>
                    </div>
                  </div>

                  {/* Visual Rute Flight */}
                  <div className="my-4 p-3.5 rounded-xl sm:rounded-2xl bg-white border border-red-100 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg sm:text-xl font-heading font-black text-slate-900 block">CGK</span>
                        <span className="text-[10px] text-slate-500 font-mono">Soekarno-Hatta</span>
                      </div>

                      <div className="flex-1 px-3 text-center">
                        <div className="w-full flex items-center justify-center relative">
                          <div className="h-0.5 bg-red-200 w-full" />
                          <div className="absolute p-1 sm:p-1.5 rounded-full bg-red-600 text-white shadow-md">
                            <Plane className="size-3 sm:size-3.5 rotate-90" />
                          </div>
                        </div>
                        <span className="text-[9px] font-mono font-bold text-red-600 mt-1 block tracking-wider">DIRECT FLIGHT</span>
                      </div>

                      <div className="text-right">
                        <span className="text-lg sm:text-xl font-heading font-black text-red-600 block">{currentCity?.code || "DEST"}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{currentCity?.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Breakdown Rincian Biaya */}
                  <div className="space-y-2.5 py-3 text-xs font-mono border-b border-red-100 text-slate-700">
                    <div className="flex justify-between items-center">
                      <span>Tarif per Kg</span>
                      <span className="font-bold text-slate-900">Rp {formatRupiah(pricePerKg)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Berat Tagihan (Chargable Weight)</span>
                      <span className="font-bold text-slate-900">{beratFinal} Kg</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Subtotal Tarif Barang</span>
                      <span className="font-bold text-slate-900">Rp {formatRupiah(subtotalBiaya)}</span>
                    </div>

                    <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-red-200 text-red-900 font-sans">
                      <span className="font-bold text-xs flex items-center gap-1.5">
                        <ShieldCheck className="size-4 text-red-600 shrink-0" /> Biaya Penanganan Admin
                      </span>
                      <span className="font-mono font-bold text-xs text-slate-900">Rp {formatRupiah(BIAYA_HANDLING)}</span>
                    </div>
                  </div>

                  {/* Total All-In Price (FIXED: Rapih satu baris fleksibel tanpa terpotong di HP) */}
                  <div className="pt-4 pb-2">
                    <div className="flex flex-row items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">TOTAL ESTIMASI ALL-IN</span>
                        <span className="text-[11px] text-slate-500 block">Termasuk penanganan admin CGK</span>
                      </div>

                      <div className="text-right shrink-0">
                        {pricePerKg > 0 ? (
                          <div className="text-lg sm:text-2xl lg:text-3xl font-heading font-black text-red-600 tracking-tight flex items-center justify-end gap-1.5">
                            <span className="text-xs sm:text-base font-bold text-red-600">Rp</span>
                            <span>{formatRupiah(totalBiaya)}</span>
                          </div>
                        ) : (
                          <span className="text-xs sm:text-sm font-bold text-amber-600">Hubungi WA untuk Tarif</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Booking Button */}
                  <div className="mt-4">
                    <a
                      href={waLink(
                        `Halo Lion Cargo Logistik, saya berminat memesan Cargo Reguler Udara:\n- Rute: Jakarta (CGK) ke ${currentCity?.name} (${currentCity?.code || ""})\n- Berat Tagihan: ${beratFinal} Kg\n- Subtotal Tarif: Rp ${formatRupiah(subtotalBiaya)}\n- Biaya Penanganan Admin Bandara: Rp ${formatRupiah(BIAYA_HANDLING)}\n- Total Estimasi All-In: Rp ${formatRupiah(totalBiaya)}\nMohon info ketersediaan slot penerbangan.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-5 rounded-xl sm:rounded-2xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <Send className="size-4" />
                      <span>Pesan Cargo via WhatsApp</span>
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ==========================================
          4. TABEL TARIF: TANPA KOLOM NOMOR URUT (#)
      ========================================== */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-8 shadow-sm"
          initial={reduceMotion ? false : { opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 mb-5 border-b border-slate-100">
            <div>
              <h2 className="text-lg sm:text-2xl font-heading font-extrabold text-slate-900">Daftar Tarif Cargo Udara dari Jakarta (CGK)</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Menampilkan {filteredDestinations.length} destinasi bandara dan kota di seluruh Indonesia.</p>
            </div>

            {/* Input Pencarian */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Cari kota / bandara..."
                value={searchTableQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            </div>
          </div>

          {/* DESKTOP TABLE VIEW */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-mono font-bold tracking-wider">
                  <th className="py-3.5 px-4 rounded-l-xl">Kota Tujuan</th>
                  <th className="py-3.5 px-4">Kode Bandara</th>
                  <th className="py-3.5 px-4 text-right">Tarif per Kg</th>
                  <th className="py-3.5 px-4 text-right rounded-r-xl">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedDestinations.length > 0 ? (
                  paginatedDestinations.map((kota) => (
                    <tr key={kota.slug} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{kota.name}</td>
                      <td className="py-3.5 px-4 font-mono font-extrabold text-red-600">{kota.code || "-"}</td>
                      <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900 text-sm">Rp {formatRupiah(kota.pricePerKg)}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedDestination(kota.slug);
                            setHasCalculated(false);
                            window.scrollTo({ top: 400, behavior: "smooth" });
                          }}
                          className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-bold transition-all text-[11px] inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Pilih Kota</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-400 font-medium">
                      Kota atau bandara tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS VIEW */}
          <div className="block md:hidden space-y-3">
            {paginatedDestinations.length > 0 ? (
              paginatedDestinations.map((kota) => (
                <div key={kota.slug} className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/50 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-900">{kota.name}</span>
                      {kota.code && <span className="text-[10px] font-mono font-extrabold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">{kota.code}</span>}
                    </div>
                    <div className="text-xs font-mono font-black text-red-600">
                      Rp {formatRupiah(kota.pricePerKg)} <span className="text-[10px] font-normal text-slate-500">/ Kg</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDestination(kota.slug);
                      setHasCalculated(false);
                      window.scrollTo({ top: 350, behavior: "smooth" });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold transition-all text-[11px] shrink-0 cursor-pointer shadow-xs"
                  >
                    Pilih
                  </button>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-slate-400 text-xs font-medium">Kota atau bandara tidak ditemukan.</div>
            )}
          </div>

          {/* CONTROL PAGINASI */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 mt-4 border-t border-slate-100 text-xs">
              <span className="text-slate-500 text-center sm:text-left text-[11px] sm:text-xs">
                Menampilkan <strong className="text-slate-800">{startIndex + 1}</strong> - <strong className="text-slate-800">{Math.min(startIndex + ITEMS_PER_PAGE, filteredDestinations.length)}</strong> dari{" "}
                <strong className="text-slate-800">{filteredDestinations.length}</strong> kota
              </span>

              <div className="flex items-center gap-1 sm:gap-1.5">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="p-1.5 sm:p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="size-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                  })
                  .map((page, index, array) => {
                    const prevPage = array[index - 1];
                    const showEllipsis = prevPage && page - prevPage > 1;

                    return (
                      <div key={page} className="flex items-center gap-1">
                        {showEllipsis && <span className="px-1 text-slate-400 text-xs">...</span>}
                        <button
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          className={`size-7 sm:size-8 rounded-lg sm:rounded-xl font-mono text-xs font-bold transition-all ${
                            currentPage === page ? "bg-red-600 text-white shadow-md shadow-red-600/30" : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {page}
                        </button>
                      </div>
                    );
                  })}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="p-1.5 sm:p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
