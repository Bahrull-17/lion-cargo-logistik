"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, ChevronDown, MessageCircle, HelpCircle, ArrowUpRight } from "lucide-react";
import { waLink } from "@/utils/wa-link";

interface FaqItem {
  id: string;
  pertanyaan: string;
  jawaban: string;
  kategori: "Umum & Prosedur" | "Tarif & Pembayaran" | "Dokumen & Syarat" | "Jenis Barang";
}

const daftarKategori = [
  { key: "semua", label: "Semua Pertanyaan" },
  { key: "Umum & Prosedur", label: "Umum & Prosedur" },
  { key: "Dokumen & Syarat", label: "Dokumen & Syarat" },
  { key: "Jenis Barang", label: "Jenis Barang" },
  { key: "Tarif & Pembayaran", label: "Tarif & Pembayaran" },
];

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
  // Tambahkan poin-poin berikut ke dalam array dataFaq:
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

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen pb-12 sm:pb-16 overflow-hidden relative">
      {/* 1. HERO SECTION */}
      <section className="w-full bg-white border-b border-slate-200/60 pt-6 pb-10 sm:pb-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-4 sm:mb-6">
            <Link href="/" className="hover:text-red-600 transition-colors flex items-center gap-1 text-slate-600">
              Beranda
            </Link>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="text-red-600 font-bold">FAQ &amp; Bantuan</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Pusat Bantuan &amp; <br className="hidden sm:inline" />
              <span className="inline-block mt-1 px-4 py-1 bg-red-600 text-white rounded-2xl shadow-lg shadow-red-600/20 transform -rotate-1">Pertanyaan Umum</span>
            </h1>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto pt-1">
              Temukan jawaban cepat seputar prosedur pengiriman kargo udara, syarat dokumen, ketentuan hewan peliharaan, dan perhitungan tarif bersama <strong className="text-slate-900">Lion Cargo Logistik CGK</strong>.
            </p>

            {/* SEARCH BAR FAQ */}
            <div className="pt-3 max-w-xl mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-4 size-5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari pertanyaan, misal: syarat hewan, cara kirim, dll..."
                  className="w-full pl-12 pr-4 py-3.5 sm:py-4 bg-white rounded-2xl border-2 border-slate-200 text-xs sm:text-sm text-slate-900 font-semibold shadow-xs focus:border-red-600 focus:outline-hidden transition-all placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-4 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer">
                    Hapus
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER KATEGORI & AKORDION FAQ */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* KATEGORI FILTER */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-4 mb-6 sm:mb-8 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {daftarKategori.map((kat) => {
            const isActive = selectedKategori === kat.key;
            return (
              <button
                key={kat.key}
                onClick={() => setSelectedKategori(kat.key)}
                className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  isActive ? "bg-red-600 text-white shadow-md shadow-red-600/25 scale-[1.02]" : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {kat.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between mb-4 text-xs font-mono font-bold text-slate-500">
          <span>MENAMPILKAN {filteredFaq.length} PERTANYAAN</span>
          {searchQuery && <span className="text-red-600">Pencarian: &quot;{searchQuery}&quot;</span>}
        </div>

        {/* ACCORDION LIST */}
        {filteredFaq.length > 0 ? (
          <div className="space-y-3.5">
            {filteredFaq.map((item) => {
              const isOpen = openIndex === item.id;
              return (
                <div key={item.id} className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen ? "border-red-500 shadow-md ring-1 ring-red-500/20" : "border-slate-200/80 hover:border-slate-300 shadow-xs"}`}>
                  <button onClick={() => toggleAccordion(item.id)} className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden">
                    <div className="space-y-1">
                      <span className="inline-block text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-red-50 text-red-600 border border-red-100">{item.kategori}</span>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">{item.pertanyaan}</h3>
                    </div>
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? "bg-red-600 text-white rotate-180" : "bg-slate-100 text-slate-600"}`}>
                      <ChevronDown className="size-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                        <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{item.jawaban}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6">
            <HelpCircle className="size-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">Pertanyaan Tidak Ditemukan</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Maaf, kata kunci yang Anda cari tidak tersedia di daftar bantuan kami. Silakan tanyakan langsung melalui WhatsApp.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedKategori("semua");
              }}
              className="mt-4 inline-flex items-center gap-2 bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md hover:bg-red-700 transition-all cursor-pointer"
            >
              Reset Pencarian
            </button>
          </div>
        )}
      </section>

      {/* 3. CALL TO ACTION (BANTUAN LANGSUNG) */}
      <section className="mt-8 pb-4 pt-6 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight mb-3">
              Masih punya pertanyaan <span className="text-red-600">lainnya?</span>
            </motion.h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-6">Tim support operasional Lion Cargo Bandara Soekarno-Hatta siap membantu menjawab pertanyaan seputar pengiriman barang Anda secara cepat.</p>

            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }} className="flex items-center justify-center gap-3 mb-4">
              <a
                href={waLink("Halo Lion Cargo Logistik, saya ingin bertanya mengenai informasi pengiriman kargo.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-red-600 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-red-600/20 hover:bg-red-700 hover:shadow-red-600/40 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <MessageCircle className="size-4" />
                <span>Tanya CS via WhatsApp</span>
              </a>

              <a
                href={waLink("Halo Lion Cargo Logistik, saya ingin bertanya mengenai informasi pengiriman kargo.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tanya CS melalui WhatsApp"
                className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 text-white shadow-md shadow-red-600/20 hover:bg-red-700 hover:shadow-red-600/40 hover:scale-110 hover:rotate-12 active:scale-95 transition-all duration-300"
              >
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
