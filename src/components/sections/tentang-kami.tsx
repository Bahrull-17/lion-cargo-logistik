"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, MapPin, Clock, Sparkles, ArrowRight, Headset, Building2, TrendingUp, PackageCheck, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink } from "@/utils/wa-link";

const stats = [
  {
    icon: MapPin,
    value: "113+",
    label: "Bandara & Kota Tujuan",
    subtext: "Jangkauan kargo nasional seluruh Indonesia",
  },
  {
    icon: TrendingUp,
    value: "10.000+",
    label: "Ton Kargo Terkirim",
    subtext: "Kepercayaan korporat & UMKM Indonesia",
  },
  {
    icon: Clock,
    value: "99.8%",
    label: "On-Time Flight Rate",
    subtext: "Prioritas keberangkatan penerbangan langsung",
  },
  {
    icon: Headset,
    value: "24/7",
    label: "Tim Support Respon Cepat",
    subtext: "Layanan konsultasi & pemesanan via WhatsApp",
  },
];

const coreValues = [
  {
    icon: Zap,
    title: "Prioritas Direct Flight Hub CGK",
    description: "Pengiriman diproses secara efisien langsung dari Terminal Cargo Bandara Soekarno-Hatta (CGK) tanpa jalur transit yang berbelit.",
    badge: "Kecepatan Tinggi",
    color: "text-amber-600 bg-amber-50 border-amber-200",
  },
  {
    icon: ShieldCheck,
    title: "Keamanan & Penanganan Ekstra",
    description: "Setiap general cargo, barang berharga, maupun dokumen penting ditangani dengan standar prosedur keamanan penerbangan komersial.",
    badge: "Keamanan Terjamin",
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
  {
    icon: PackageCheck,
    title: "Transparansi Penanganan Admin",
    description: "Semua rincian biaya penanganan admin bandara dan tarif per kg disajikan secara terbuka tanpa ada biaya tersembunyi.",
    badge: "100% Transparan",
    color: "text-red-600 bg-red-50 border-red-200",
  },
];

export function TentangKamiSection() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="bg-[#f8fafc] text-slate-800 min-h-screen pb-20 sm:pb-28 overflow-hidden relative">
      {/* ==========================================
          1. HERO HEADER: BERGERAK DARI ATAS KE BAWAH
      ========================================== */}
      <section className="relative pt-12 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-linear-to-b from-red-50/50 via-slate-50/30 to-transparent pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={reduceMotion ? false : { opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-red-200 text-red-600 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="size-3.5 text-red-600 fill-red-100" /> Agen Kargo Udara Resmi Bandara Soekarno-Hatta
            </div>

            <h1 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight leading-[1.15]">
              Mitra Ekspedisi Kargo Udara <br />
              <span className="text-red-600 font-extrabold">Handal, Cepat & Terpercaya</span>
            </h1>

            <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              <strong>Lion Cargo Logistik</strong> berfokus memberikan solusi pengiriman kargo udara cepat (<em>Port to Port</em>) langsung dari Hub Utama Terminal Cargo Bandara Soekarno-Hatta (CGK) ke seluruh pelosok bandara di Indonesia.
              Kami menjamin kecepatan, keamanan barang, serta transparansi tarif tanpa biaya tersembunyi.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="h-13 w-full sm:w-auto px-8 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/25 transition-all cursor-pointer">
                <Link href="/cek-ongkir" className="flex items-center justify-center gap-2">
                  <span>Cek Tarif Kargo Udara</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="h-13 w-full sm:w-auto px-8 rounded-xl border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm shadow-xs transition-all cursor-pointer">
                <a href={waLink("Halo Lion Cargo Logistik, saya ingin bertanya mengenai layanan kargo udara.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  <Headset className="size-4 text-emerald-600" />
                  <span>Konsultasi WhatsApp</span>
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          2. STATISTIK ANGKA KEPERCAYAAN
      ========================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
          initial={reduceMotion ? false : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
                <div className="size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 mb-4">
                  <Icon className="size-5 sm:size-6" />
                </div>
                <div>
                  <span className="text-2xl sm:text-4xl font-heading font-black text-slate-900 block font-mono">{item.value}</span>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 mt-1">{item.label}</h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-snug">{item.subtext}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* ==========================================
          3. PROFIL UTAMA & OPERATIONAL HUB
      ========================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <motion.div
          className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          initial={reduceMotion ? false : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
              <Building2 className="size-3.5" /> Profil Perusahaan
            </div>

            <h2 className="text-2xl sm:text-4xl font-heading font-black text-slate-900 leading-tight">Menghubungkan Pengiriman Kargo Udara ke Seluruh Wilayah Indonesia</h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Didukung oleh lokasi strategis di area Terminal Cargo Bandara Internasional Soekarno-Hatta (CGK), Lion Cargo Logistik menangani langsung setiap tahapan pengiriman dari penimbangan barang, pembuatan Surat Muatan Udara (SMU),
              hingga proses *loading* ke dalam apron pesawat komersial.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-900 block font-bold">Penanganan Cepat CGK</strong>
                  <span className="text-slate-500 text-[11px]">Langsung diproses di hub terminal kargo utama</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-900 block font-bold">Penerbangan Langsung</strong>
                  <span className="text-slate-500 text-[11px]">Meminimalisir risiko transit dan keterlambatan</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 aspect-4/3">
              <Image src="/images/hero-7.png" alt="Operasional Kargo Udara Bandara Soekarno Hatta - Lion Cargo Logistik" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/95 backdrop-blur-md rounded-xl border border-white/60 text-xs">
                <span className="font-extrabold text-slate-900 block">Terminal Cargo CGK</span>
                <span className="text-[11px] text-slate-600">Standard Operasional Penerbangan Indonesia</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          4. BENTO GRID: KEUNGGULAN UTAMA
      ========================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-4xl font-heading font-black text-slate-900">
            Mengapa Memilih <span className="text-red-600">Lion Cargo</span>?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">Komitmen utama kami untuk memberikan pengalaman pengiriman kargo udara terbaik bagi setiap pelanggan.</p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
          initial={reduceMotion ? false : { opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {coreValues.map((val) => {
            const Icon = val.icon;
            return (
              <div key={val.title} className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="size-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-600/20">
                      <Icon className="size-6" />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${val.color}`}>{val.badge}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-heading font-extrabold text-slate-900">{val.title}</h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{val.description}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}

export default TentangKamiSection;
