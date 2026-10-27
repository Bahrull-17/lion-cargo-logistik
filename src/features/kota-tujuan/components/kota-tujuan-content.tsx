"use client";

import { useState, useMemo, useEffect } from "react";
import { waLink } from "@/lib/wa-link";
import type { Destination } from "@/types/tarif";
import { KotaTujuanHero } from "./kota-tujuan-hero";
import { KotaTujuanGrid, KotaTujuanItem } from "./kota-tujuan-grid";
import { CtaSection } from "@/components/shared/cta-section";

interface KotaTujuanContentProps {
  initialTarifData?: Destination[];
}

const ITEMS_PER_PAGE = 16;

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

  // Auto Scroll ke Atas saat filter pulau berubah atau halaman dimuat
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedPulau]);

  // Mengolah data kota tujuan 100% murni dari Database (initialTarifData)
  const kotaList = useMemo<KotaTujuanItem[]>(() => {
    if (!initialTarifData || initialTarifData.length === 0) return [];

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

  const handleLoadMore = () => {
    setDisplayLimit((prev) => prev + 24);
  };

  const handleResetFilter = () => {
    setSearchQuery("");
    setSelectedPulau("semua");
  };

  const whatsappUrl = waLink("Halo Lion Cargo Logistik, saya ingin kirim barang sekarang.");

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen pb-12 sm:pb-16 overflow-hidden relative">
      {/* 1. HERO & SEARCH SECTION */}
      <KotaTujuanHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* 2. FILTER & GRID KOTA TUJUAN (DATABASE DRIVEN) */}
      <KotaTujuanGrid
        selectedPulau={selectedPulau}
        onSelectPulau={handleSelectPulau}
        displayedKota={displayedKota}
        filteredKotaTotalLength={filteredKotaTotal.length}
        searchQuery={searchQuery}
        displayLimit={displayLimit}
        onLoadMore={handleLoadMore}
        onResetFilter={handleResetFilter}
      />

      {/* 3. CALL TO ACTION SECTION (SHARED COMPONENT) */}
      <div className="border-t border-slate-100">
        <CtaSection whatsappUrl={whatsappUrl} />
      </div>
    </div>
  );
}
