"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Calculator, Plane, PackageCheck, ArrowRight, MessageCircle, Sparkles, AlertCircle, ShieldCheck, Info, MapPin } from "lucide-react";
import { waLink } from "@/utils/wa-link";

// Mock Database Kota Tujuan Kargo Udara Bandara Soekarno-Hatta (CGK)
const DAF_KOTA = [
  { id: "SUB", name: "Surabaya (SUB) - Juanda", rateReguler: 12000, rateExpress: 18000, rateSameday: 25000 },
  { id: "KNO", name: "Medan (KNO) - Kualanamu", rateReguler: 19500, rateExpress: 27000, rateSameday: 38000 },
  { id: "UPG", name: "Makassar (UPG) - Sultan Hasanuddin", rateReguler: 21000, rateExpress: 31000, rateSameday: 42000 },
  { id: "DPS", name: "Bali (DPS) - I Gusti Ngurah Rai", rateReguler: 14500, rateExpress: 21000, rateSameday: 30000 },
  { id: "BPN", name: "Balikpapan (BPN) - SAMS Sepinggan", rateReguler: 18000, rateExpress: 25000, rateSameday: 35000 },
  { id: "PKU", name: "Pekanbaru (PKU) - Sultan Syarif Kasim II", rateReguler: 16500, rateExpress: 23000, rateSameday: 32000 },
  { id: "PLM", name: "Palembang (PLM) - Sultan Mahmud Badaruddin II", rateReguler: 13500, rateExpress: 19000, rateSameday: 27000 },
  { id: "PNK", name: "Pontianak (PNK) - Supadio", rateReguler: 16000, rateExpress: 22500, rateSameday: 31000 },
];

// Motion Variants dengan pergerakan slow-motion halus & mewah (1.0s - 1.1s)
const fadeInUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -45 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 45 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
  },
};

export function CekOngkirSection() {
  const reduceMotion = useReducedMotion();

  const [selectedDestination, setSelectedDestination] = useState(DAF_KOTA[0].id);
  const [beratKg, setBeratKg] = useState<number>(10);
  const [panjang, setPanjang] = useState<number>(30);
  const [lebar, setLebar] = useState<number>(30);
  const [tinggi, setTinggi] = useState<number>(30);
  const [isCalculated, setIsCalculated] = useState<boolean>(true);

  // Perhitungan Volume Kargo Udara Standar IATA (P x L x T / 6000)
  const beratVolume = Math.ceil((panjang * lebar * tinggi) / 6000);
  const beratFinal = Math.max(beratKg, beratVolume);

  const currentCity = DAF_KOTA.find((c) => c.id === selectedDestination) || DAF_KOTA[0];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculated(false);
    setTimeout(() => {
      setIsCalculated(true);
    }, 200);
  };

  return (
    <div className="bg-slate-50/50 min-h-screen pt-4 pb-16 sm:pt-6 sm:pb-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER HERO CEK ONGKIR */}
        <motion.div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12" initial={reduceMotion ? false : "hidden"} animate="visible" variants={fadeInUp}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
            <Sparkles className="size-3.5" /> Kalkulator Tarif Real-Time
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight leading-tight">
            Cek Tarif Kargo Udara <span className="text-brand">Bandara Soetta</span>
          </h1>

          <p className="mt-2 text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">Hitung perkiraan biaya pengiriman kargo udara secara akurat berdasarkan berat aktual maupun perhitungan dimensi volume paket Anda.</p>
        </motion.div>

        {/* MAIN CONTAINER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* KOLOM KIRI: FORM INPUT KALKULATOR */}
          <motion.div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs shadow-slate-100" initial={reduceMotion ? false : "hidden"} animate="visible" variants={slideFromLeft}>
            <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-100">
              <div className="p-2.5 rounded-xl bg-brand/10 text-brand">
                <Calculator className="size-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-charcoal">Parameter Pengiriman</h2>
                <p className="text-xs text-slate-500">Masukkan detail berat & ukuran barang</p>
              </div>
            </div>

            <form onSubmit={handleCalculate} className="space-y-4">
              {/* Kota Asal */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Kota Asal (Airport CGK)</label>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-700">
                  <Plane className="size-4 text-brand rotate-45 shrink-0" />
                  <span className="truncate">Jakarta / Tangerang - Soekarno-Hatta (CGK)</span>
                </div>
              </div>

              {/* Kota Tujuan */}
              <div>
                <label htmlFor="destination" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Kota Tujuan / Bandara
                </label>
                <div className="relative">
                  <select
                    id="destination"
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="w-full p-3 pr-8 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all cursor-pointer"
                  >
                    {DAF_KOTA.map((kota) => (
                      <option key={kota.id} value={kota.id}>
                        {kota.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Berat Barang */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="weight" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Berat Aktual (Kg)
                  </label>
                  <span className="text-[11px] font-semibold text-brand">Minimum 10 Kg</span>
                </div>
                <input
                  id="weight"
                  type="number"
                  min={1}
                  value={beratKg}
                  onChange={(e) => setBeratKg(Math.max(1, Number(e.target.value)))}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                  placeholder="Contoh: 15"
                />
              </div>

              {/* Dimensi Barang (P x L x T) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Dimensi Paket (P x L x T cm)</label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold block mb-1">Panjang</span>
                    <input
                      type="number"
                      value={panjang}
                      onChange={(e) => setPanjang(Math.max(1, Number(e.target.value)))}
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-bold text-center text-slate-800 focus:ring-2 focus:ring-brand/20 focus:border-brand"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold block mb-1">Lebar</span>
                    <input
                      type="number"
                      value={lebar}
                      onChange={(e) => setLebar(Math.max(1, Number(e.target.value)))}
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-bold text-center text-slate-800 focus:ring-2 focus:ring-brand/20 focus:border-brand"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold block mb-1">Tinggi</span>
                    <input
                      type="number"
                      value={tinggi}
                      onChange={(e) => setTinggi(Math.max(1, Number(e.target.value)))}
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-bold text-center text-slate-800 focus:ring-2 focus:ring-brand/20 focus:border-brand"
                    />
                  </div>
                </div>
              </div>

              {/* Status Berat Terpakai */}
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-start gap-2 text-xs text-amber-900">
                <AlertCircle className="size-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  Dihitung berdasarkan: <strong className="font-extrabold">{beratFinal} Kg</strong>
                  {beratVolume > beratKg ? (
                    <span className="text-amber-800 block text-[11px] mt-0.5">
                      (Berat Volume {beratVolume} Kg lebih besar dari Berat Aktual {beratKg} Kg)
                    </span>
                  ) : (
                    <span className="text-amber-800 block text-[11px] mt-0.5">(Berat Aktual terpakai)</span>
                  )}
                </div>
              </div>

              <button type="submit" className="w-full bg-brand text-white font-bold py-3 px-4 rounded-xl text-sm shadow-2xs hover:bg-brand/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer">
                <PackageCheck className="size-4" />
                <span>Hitung Perkiraan Tarif</span>
              </button>
            </form>
          </motion.div>

          {/* KOLOM KANAN: OPSI LAYANAN & ESTIMASI HARGA */}
          <motion.div className="lg:col-span-7 space-y-4" initial={reduceMotion ? false : "hidden"} animate="visible" variants={slideFromRight}>
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-extrabold text-charcoal flex items-center gap-2">
                <MapPin className="size-4 text-brand" /> Hasil Estimasi Tarif Kargo
              </h2>
              <span className="text-xs font-bold text-slate-500">
                Ke: <span className="text-brand">{currentCity.name.split("-")[0]}</span>
              </span>
            </div>

            <AnimatePresence mode="wait">
              {isCalculated && (
                <motion.div className="space-y-3.5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                  {/* LAYANAN 1: REGULER */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-brand/30 transition-all group">
                    <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">Paling Hemat</span>
                        <h3 className="text-lg font-extrabold text-charcoal mt-1">Cargo Reguler</h3>
                        <p className="text-xs text-slate-500">Estimasi 2 - 4 Hari Kerja</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block">Estimasi Biaya</span>
                        <span className="text-xl font-extrabold text-brand">Rp {(currentCity.rateReguler * beratFinal).toLocaleString("id-ID")}</span>
                        <span className="text-[10px] text-slate-500 block">@ Rp {currentCity.rateReguler.toLocaleString("id-ID")}/Kg</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <span className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                        <ShieldCheck className="size-4 text-emerald-600 shrink-0" /> Port to Port / Port to Door
                      </span>
                      <a
                        href={waLink(`Halo Lion Cargo Logistik, saya berminat memesan Cargo Reguler ke ${currentCity.name} untuk berat ${beratFinal} Kg.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
                      >
                        Pesan Slot Reguler <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>

                  {/* LAYANAN 2: EXPRESS */}
                  <div className="p-5 rounded-2xl bg-white border-2 border-brand/30 shadow-2xs relative overflow-hidden group">
                    <div className="absolute top-0 right-0 bg-brand text-white text-[10px] font-bold px-3 py-0.5 rounded-bl-xl uppercase tracking-wider">Flight Priority</div>
                    <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand bg-brand/10 px-2.5 py-0.5 rounded-full">Cepat & Prioritas</span>
                        <h3 className="text-lg font-extrabold text-charcoal mt-1">Cargo Express</h3>
                        <p className="text-xs text-slate-500">Estimasi 1 - 2 Hari (Penerbangan Pertama)</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block">Estimasi Biaya</span>
                        <span className="text-xl font-extrabold text-brand">Rp {(currentCity.rateExpress * beratFinal).toLocaleString("id-ID")}</span>
                        <span className="text-[10px] text-slate-500 block">@ Rp {currentCity.rateExpress.toLocaleString("id-ID")}/Kg</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <span className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                        <ShieldCheck className="size-4 text-brand shrink-0" /> Jaminan Flight Slot Pertama
                      </span>
                      <a
                        href={waLink(`Halo Lion Cargo Logistik, saya mau konsultasi Cargo Express ke ${currentCity.name} untuk berat ${beratFinal} Kg.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-brand text-white font-bold px-4 py-2 rounded-xl text-xs shadow-2xs hover:bg-brand/90 transition-all active:scale-95"
                      >
                        <MessageCircle className="size-3.5" /> Book Express WA
                      </a>
                    </div>
                  </div>

                  {/* LAYANAN 3: SAME DAY */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-brand/30 transition-all group">
                    <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">Kilat Super Urgent</span>
                        <h3 className="text-lg font-extrabold text-charcoal mt-1">Same Day Service</h3>
                        <p className="text-xs text-slate-500">Tiba Hari Ini Juga (Penerbangan Langsung)</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block">Estimasi Biaya</span>
                        <span className="text-xl font-extrabold text-brand">Rp {(currentCity.rateSameday * beratFinal).toLocaleString("id-ID")}</span>
                        <span className="text-[10px] text-slate-500 block">@ Rp {currentCity.rateSameday.toLocaleString("id-ID")}/Kg</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <span className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                        <ShieldCheck className="size-4 text-amber-600 shrink-0" /> Kirim Pagi Langsung Terbang
                      </span>
                      <a
                        href={waLink(`Halo Lion Cargo Logistik, saya butuh layanan kilat Same Day Service ke ${currentCity.name} hari ini.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
                      >
                        Konsultasi Same Day <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Note & Syarat Ketentuan */}
            <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200/60 text-xs text-slate-500 leading-relaxed flex items-start gap-2">
              <Info className="size-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                * <strong className="text-slate-700">Catatan Tambahan:</strong> Perhitungan tarif di atas merupakan perkiraan harga kargo udara umum (General Cargo). Untuk muatan khusus (Special Cargo, Dangerous Goods, atau Hewan), silakan
                hubungi tim operasional kami.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
