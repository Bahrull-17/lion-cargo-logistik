"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plane, ChevronRight, MessageCircle, ArrowUpRight, Sparkles, Clock, ChevronDown } from "lucide-react";
import { waLink } from "@/utils/wa-link";
import type { Destination } from "@/types/tarif";

export interface KotaTujuanItem {
  id: string;
  nama: string;
  kodeBandara: string;
  namaBandara?: string;
  pulau: "sumatera" | "jawa" | "kalimantan" | "sulawesi" | "bali-nusa" | "papua-maluku";
  labelPulau: string;
  estimasi: string;
  isPopular?: boolean;
}

interface KotaTujuanContentProps {
  initialTarifData?: Destination[];
}

const ITEMS_PER_PAGE = 16;

const defaultKotaList: KotaTujuanItem[] = [
  { id: "medan", nama: "Medan", kodeBandara: "KNO", namaBandara: "Kualanamu", pulau: "sumatera", labelPulau: "Sumatera", estimasi: "1 - 2 Hari", isPopular: true },
  { id: "surabaya", nama: "Surabaya", kodeBandara: "SUB", namaBandara: "Juanda", pulau: "jawa", labelPulau: "Jawa", estimasi: "1 - 2 Hari", isPopular: true },
  { id: "balikpapan", nama: "Balikpapan", kodeBandara: "BPN", namaBandara: "SAMS Sepinggan", pulau: "kalimantan", labelPulau: "Kalimantan", estimasi: "1 - 2 Hari", isPopular: true },
  { id: "makassar", nama: "Makassar", kodeBandara: "UPG", namaBandara: "Sultan Hasanuddin", pulau: "sulawesi", labelPulau: "Sulawesi", estimasi: "1 - 2 Hari", isPopular: true },
  { id: "denpasar", nama: "Denpasar (Bali)", kodeBandara: "DPS", namaBandara: "I Gusti Ngurah Rai", pulau: "bali-nusa", labelPulau: "Bali & Nusa", estimasi: "1 - 2 Hari", isPopular: true },
  { id: "jayapura", nama: "Jayapura", kodeBandara: "DJJ", namaBandara: "Sentani", pulau: "papua-maluku", labelPulau: "Papua & Maluku", estimasi: "2 - 3 Hari", isPopular: true },
];

const daftarPulauFilter = [
  { key: "semua", label: "Semua Wilayah" },
  { key: "sumatera", label: "Sumatera" },
  { key: "jawa", label: "Jawa" },
  { key: "kalimantan", label: "Kalimantan" },
  { key: "sulawesi", label: "Sulawesi" },
  { key: "bali-nusa", label: "Bali & Nusa" },
  { key: "papua-maluku", label: "Papua & Maluku" },
];

function deteksiPulauDinamis(namaKota: string): "sumatera" | "jawa" | "kalimantan" | "sulawesi" | "bali-nusa" | "papua-maluku" {
  const k = namaKota.toLowerCase();
  if (k.match(/medan|palembang|padang|lampung|batam|pekanbaru|aceh|jambi|bengkulu|pematang|lhokseumawe|dumai|pangkal|tanjung pinang|meulaboh|sabang|sibolga/)) return "sumatera";
  if (k.match(/surabaya|semarang|yogyakarta|solo|bandung|jakarta|malang|cirebon|tasikmalaya|probolinggo|pasuruan|pacet|blitar|kediri|madiun|banyuwangi|jember|bogor|bekasi|tangerang|depok/)) return "jawa";
  if (k.match(/balikpapan|banjarmasin|pontianak|samarinda|tarakan|berau|palangkaraya|sampit|singkawang|bontang|ketapang|kuala kapuas/)) return "kalimantan";
  if (k.match(/makassar|manado|palu|kendari|gorontalo|bitung|tomohon|kotamobagu|parepare|palopo|bau-bau|luwuk/)) return "sulawesi";
  if (k.match(/denpasar|bali|lombok|mataram|kupang|bima|labuan bajo|ende|waingapu|maumere|ruteng|sumbawa/)) return "bali-nusa";
  return "papua-maluku";
}

export function KotaTujuanContent({ initialTarifData = [] }: KotaTujuanContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPulau, setSelectedPulau] = useState("semua");
  const [displayLimit, setDisplayLimit] = useState(ITEMS_PER_PAGE);

  const kotaList = useMemo<KotaTujuanItem[]>(() => {
    if (!initialTarifData || initialTarifData.length === 0) return defaultKotaList;

    const uniqueMap = new Map<string, KotaTujuanItem>();

    initialTarifData.forEach((item) => {
      const namaTujuan = item.name;
      if (!namaTujuan) return;

      const key = namaTujuan.trim().toLowerCase();
      const kode = item.code || namaTujuan.substring(0, 3).toUpperCase();

      if (!uniqueMap.has(key)) {
        const pulau = deteksiPulauDinamis(namaTujuan);
        uniqueMap.set(key, {
          id: key.replace(/\s+/g, "-"),
          nama: namaTujuan,
          kodeBandara: kode,
          namaBandara: `Bandara ${namaTujuan}`,
          pulau: pulau,
          labelPulau: pulau.toUpperCase(),
          estimasi: "1 - 2 Hari",
          isPopular: ["medan", "surabaya", "balikpapan", "makassar", "denpasar", "jayapura"].some((k) => key.includes(k)),
        });
      }
    });

    return Array.from(uniqueMap.values());
  }, [initialTarifData]);

  const whatsappBaseUrl = (namaKota: string, kode: string) => waLink(`Halo Lion Cargo Logistik, saya ingin bertanya pengiriman kargo udara dari Bandara Soekarno-Hatta (CGK) ke ${namaKota} (${kode}).`);

  const filteredKotaTotal = useMemo(() => {
    return kotaList.filter((item) => {
      const matchSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) || item.kodeBandara.toLowerCase().includes(searchQuery.toLowerCase());

      const matchPulau = selectedPulau === "semua" || item.pulau === selectedPulau;

      return matchSearch && matchPulau;
    });
  }, [searchQuery, selectedPulau, kotaList]);

  const displayedKota = useMemo(() => {
    if (searchQuery || selectedPulau !== "semua") {
      return filteredKotaTotal;
    }
    return filteredKotaTotal.slice(0, displayLimit);
  }, [filteredKotaTotal, displayLimit, searchQuery, selectedPulau]);

  const handleSelectPulau = (key: string) => {
    setSelectedPulau(key);
    setDisplayLimit(ITEMS_PER_PAGE);
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen pb-12 sm:pb-16 overflow-hidden relative">
      {/* 1. BANNER HERO */}
      <section className="w-full bg-white border-b border-slate-200/80 overflow-hidden">
        <div className="w-full relative">
          <Image src="/images/peta.jpg" alt="Peta Rute Penerbangan Kargo Udara Lion Cargo Logistik Indonesia" width={1920} height={600} priority className="w-full h-auto object-cover block" />
        </div>
      </section>

      {/* 2. BREADCRUMB & HEADER */}
      <section className="w-full bg-white border-b border-slate-200/60 pt-4 pb-8 sm:pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-4 sm:mb-6">
            <Link href="/" className="hover:text-red-600 transition-colors flex items-center gap-1 text-slate-600">
              Beranda
            </Link>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="text-red-600 font-bold">Kota Tujuan</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Rute Penerbangan & <br className="hidden sm:inline" />
              <span className="inline-block mt-1 px-4 py-1 bg-red-600 text-white rounded-2xl shadow-lg shadow-red-600/20 transform -rotate-1">Kota Tujuan Kargo</span>
            </h2>

            {/* KOTA TUJUAN DESCRIPTION - KAYA SEO & DIPERANJANG */}
            <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto pt-1">
              Jelajahi jaringan <strong className="text-slate-900">rute penerbangan kargo udara resmi &amp; terpercaya</strong> langsung dari hub utama <strong className="text-slate-900">Terminal Kargo Bandara Soekarno-Hatta (CGK)</strong>.
              Kami melayani pengiriman paket kilat, port-to-port, hingga door-to-door ke seluruh rute kota tujuan di Indonesia dengan tarif transparan, estimasi waktu presisi, dan jaminan keamanan ekstra untuk bisnis maupun kebutuhan
              pribadi Anda.
            </p>

            <div className="pt-3 max-w-xl mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-4 size-5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ketik nama kota atau kode bandara (misal: Medan, KNO, Surabaya)..."
                  className="w-full pl-12 pr-4 py-3.5 sm:py-4 bg-white rounded-2xl border-2 border-slate-200 text-xs sm:text-sm text-slate-900 font-semibold shadow-xs focus:border-red-600 focus:outline-hidden transition-all placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-4 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg transition-colors">
                    Hapus
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FILTER TAB & GRID */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-4 mb-6 sm:mb-8 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {daftarPulauFilter.map((pulau) => {
            const isActive = selectedPulau === pulau.key;
            return (
              <button
                key={pulau.key}
                onClick={() => handleSelectPulau(pulau.key)}
                className={`shrink-0 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  isActive ? "bg-red-600 text-white shadow-md shadow-red-600/25 scale-[1.02]" : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {pulau.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between mb-4 text-xs font-mono font-bold text-slate-500">
          <span>
            MENAMPILKAN {displayedKota.length} DARI {filteredKotaTotal.length} KOTA
          </span>
          {searchQuery && <span className="text-red-600">Hasil: &quot;{searchQuery}&quot;</span>}
        </div>

        {displayedKota.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              <AnimatePresence mode="popLayout">
                {displayedKota.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="group relative flex flex-col justify-between p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-red-300 transition-all duration-300 overflow-hidden"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-base sm:text-xl font-black font-mono text-red-600 bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-lg">{item.kodeBandara}</span>
                        {item.isPopular && (
                          <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-extrabold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                            <Sparkles className="size-2.5 fill-amber-500 text-amber-500" />
                            <span>POPULER</span>
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="text-sm sm:text-lg font-black text-slate-900 tracking-tight group-hover:text-red-600 transition-colors">{item.nama}</h3>
                        <p className="text-[10px] sm:text-xs font-medium text-slate-500 truncate">{item.namaBandara}</p>
                      </div>
                    </div>

                    <div className="pt-3 sm:pt-4 mt-3 border-t border-slate-100 space-y-2.5">
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-slate-600">
                        <Clock className="size-3 sm:size-3.5 text-red-600 shrink-0" />
                        <span>{item.estimasi}</span>
                      </div>

                      <a
                        href={whatsappBaseUrl(item.nama, item.kodeBandara)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-50 group-hover:bg-red-600 border border-slate-200 group-hover:border-red-600 py-2 px-3 text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-white transition-all shadow-xs"
                      >
                        <MessageCircle className="size-3.5 shrink-0 text-emerald-600 group-hover:text-white transition-colors" />
                        <span>Tanya Rute</span>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {!searchQuery && selectedPulau === "semua" && displayLimit < filteredKotaTotal.length && (
              <div className="text-center pt-8 sm:pt-10">
                <button
                  onClick={() => setDisplayLimit((prev) => prev + 24)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border-2 border-slate-200 hover:border-red-600 rounded-2xl text-slate-800 hover:text-red-600 font-extrabold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <span>Tampilkan Kota Lainnya ({filteredKotaTotal.length - displayLimit} Kota Lagi)</span>
                  <ChevronDown className="size-4 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6">
            <Plane className="size-12 text-slate-300 mx-auto mb-3 -rotate-45" />
            <h3 className="text-base font-bold text-slate-900">Kota Tidak Ditemukan</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Maaf, kota atau kode bandara yang Anda cari tidak ada di daftar. Silakan hubungi tim operasional kami.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedPulau("semua");
              }}
              className="mt-4 inline-flex items-center gap-2 bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md hover:bg-red-700 transition-all"
            >
              Tampilkan Semua Kota
            </button>
          </div>
        )}
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="-mt-2 sm:-mt-4 pb-2 pt-2 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight mb-4">
              Kirim barang <span className="text-red-600">sekarang !</span>
            </motion.h2>

            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }} className="flex items-center justify-center gap-3 mb-4">
              <a
                href={waLink("Halo Lion Cargo Logistik, saya ingin kirim barang sekarang.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-red-600 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-red-600/20 hover:bg-red-700 hover:shadow-red-600/40 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                HUBUNGI KAMI
              </a>

              <a
                href={waLink("Halo Lion Cargo Logistik, saya ingin kirim barang sekarang.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hubungi kami melalui WhatsApp"
                className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 text-white shadow-md shadow-red-600/20 hover:bg-red-700 hover:shadow-red-600/40 hover:scale-110 hover:rotate-12 active:scale-95 transition-all duration-300"
              >
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl">
              <span className="font-bold text-slate-900">Lion Cargo Logistik</span>, <span className="text-red-600 font-semibold">#KirimAmanSampaiTujuan</span> – Solusi logistik kargo udara lengkap &amp; terpercaya dari Bandara
              Soekarno-Hatta!
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
}
