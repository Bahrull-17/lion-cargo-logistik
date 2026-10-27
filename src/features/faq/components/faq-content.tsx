"use client";

import { useState, useMemo, useEffect } from "react";
import { waLink } from "@/lib/wa-link";
import { FaqHero } from "./faq-hero";
import { FaqAccordionList, FaqItem } from "./faq-accordion-list";
import { CtaSection } from "@/components/shared/cta-section";

const dataFaq: FaqItem[] = [
  {
    id: "1",
    kategori: "Umum & Prosedur",
    pertanyaan: "Bagaimana cara mengirim barang melalui Lion Cargo Logistik dari Bandara Soekarno-Hatta?",
    jawaban:
      "Anda dapat membawa langsung barang kiriman ke terminal kargo bandara (layanan Port-to-Port) atau menggunakan layanan jemput paket (Door-to-Door) dengan menghubungi tim marketing kami via WhatsApp. Pastikan barang sudah ditimbang dan dikemas dengan aman sebelum diserahkan.",
  },
  {
    id: "2",
    kategori: "Umum & Prosedur",
    pertanyaan: "Berapa lama estimasi waktu pengiriman barang via kargo udara?",
    jawaban:
      "Untuk sebagian besar kota tujuan di Indonesia (seperti Sumatera, Kalimantan, Sulawesi, hingga Papua), estimasi waktu pengiriman berkisar antara 1 hingga 3 hari sejak pesawat diberangkatkan, tergantung pada jadwal penerbangan langsung (direct flight) maskapai.",
  },
  {
    id: "3",
    kategori: "Dokumen & Syarat",
    pertanyaan: "Apa saja dokumen yang diperlukan untuk mengirim barang kargo?",
    jawaban:
      "Dokumen utama yang wajib dilampirkan adalah Fotokopi / Foto KTP asli pengirim, nomor telepon penerima yang aktif, serta alamat tujuan yang lengkap. Untuk pengiriman komersial skala besar, diperlukan Nota Penjualan (Invoice) dan Packing List.",
  },
  {
    id: "4",
    kategori: "Jenis Barang",
    pertanyaan: "Apakah bisa mengirim hewan peliharaan (live animal) seperti anjing atau kucing?",
    jawaban:
      "Ya, bisa! Pengiriman hewan peliharaan memerlukan Surat Keterangan Kesehatan Hewan (SKKH) resmi dari dokter hewan atau karantina setempat, serta kandang khusus yang memenuhi standar penerbangan IATA (ada ventilasi dan tempat minum).",
  },
  {
    id: "5",
    kategori: "Jenis Barang",
    pertanyaan: "Barang apa saja yang dilarang (Dangerous Goods) untuk dikirim via pesawat?",
    jawaban:
      "Barang yang dilarang meliputi bahan peledak, bahan kimia beracun, gas bertekanan, cairan mudah terbakar (tanpa izin khusus), senjata api, serta barang berharga tinggi seperti uang tunai atau emas batangan tanpa asuransi khusus kargo.",
  },
  {
    id: "6",
    kategori: "Tarif & Pembayaran",
    pertanyaan: "Bagaimana cara menghitung berat volumetrik barang ringan tapi memakan tempat?",
    jawaban:
      "Untuk kargo udara, perhitungan berat menggunakan rumus P x L x T (dalam cm) dibagi 6.000 (untuk via udara). Jika hasil volumetrik lebih besar daripada berat timbangan digital (aktual), maka tarif dihitung berdasarkan berat volumetrik tersebut.",
  },
  {
    id: "7",
    kategori: "Tarif & Pembayaran",
    pertanyaan: "Kapan pembayaran biaya pengiriman kargo harus dilakukan?",
    jawaban: "Pembayaran dilakukan di awal saat proses penimbangan dan penerbitan Surat Muatan Udara (SMU) di terminal kargo, atau melalui transfer bank resmi bagi pelanggan korporat yang telah bekerja sama.",
  },
  {
    id: "8",
    kategori: "Umum & Prosedur",
    pertanyaan: "Bagaimana cara melacak posisi kiriman paket saya?",
    jawaban:
      "Anda dapat menggunakan nomor resi atau Nomor Surat Muatan Udara (SMU) yang tertera pada lembar bukti kirim, lalu masukkan ke dalam sistem pelacakan (tracking) resmi maskapai atau tanyakan langsung melalui WhatsApp customer service kami.",
  },
  {
    id: "9",
    kategori: "Jenis Barang",
    pertanyaan: "Apakah ada batas minimal berat pengiriman (Minimum Charge)?",
    jawaban: "Ya, untuk kargo udara berlaku batas timbang minimal 10 kg. Paket dengan berat aktual di bawah 10 kg tetap dihitung sesuai tarif minimum kargo udara 10 kg.",
  },
  {
    id: "10",
    kategori: "Jenis Barang",
    pertanyaan: "Apakah Lion Cargo menyediakan jasa packing kayu dan wrapping di terminal?",
    jawaban: "Ya, kami menyediakan layanan packing kayu standar penerbangan, bubble wrap berlapis, serta penambahan label pengaman langsung di terminal kargo Soekarno-Hatta sebelum barang masuk X-Ray.",
  },
  {
    id: "11",
    kategori: "Tarif & Pembayaran",
    pertanyaan: "Apakah barang kiriman bisa dilindungi asuransi pengiriman?",
    jawaban: "Sangat bisa. Kami menyediakan opsi asuransi pengiriman kargo untuk melindungi barang Anda dari risiko kehilangan atau kerusakan total selama proses penerbangan hingga sampai tujuan.",
  },
];

export function FaqContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("semua");
  const [openIndex, setOpenIndex] = useState<string | null>("1"); // Buka pertanyaan pertama secara default

  // Auto Scroll ke Atas saat kategori filter diganti
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedKategori]);

  const filteredFaq = useMemo(() => {
    return dataFaq.filter((item) => {
      const matchSearch = item.pertanyaan.toLowerCase().includes(searchQuery.toLowerCase()) || item.jawaban.toLowerCase().includes(searchQuery.toLowerCase());
      const matchKategori = selectedKategori === "semua" || item.kategori === selectedKategori;
      return matchSearch && matchKategori;
    });
  }, [searchQuery, selectedKategori]);

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const handleResetFilter = () => {
    setSearchQuery("");
    setSelectedKategori("semua");
  };

  const whatsappUrl = waLink("Halo Lion Cargo Logistik, saya ingin bertanya mengenai informasi pengiriman kargo.");

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen pb-12 sm:pb-16 overflow-hidden relative">
      {/* 1. HERO & SEARCH SECTION */}
      <FaqHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* 2. FILTER & ACCORDION LIST */}
      <FaqAccordionList
        selectedKategori={selectedKategori}
        onSelectKategori={setSelectedKategori}
        filteredFaq={filteredFaq}
        searchQuery={searchQuery}
        openIndex={openIndex}
        onToggleAccordion={toggleAccordion}
        onResetFilter={handleResetFilter}
      />

      {/* 3. CALL TO ACTION SECTION (SHARED COMPONENT) */}
      <div className="mt-8 border-t border-slate-100">
        <CtaSection whatsappUrl={whatsappUrl} />
      </div>
    </div>
  );
}
