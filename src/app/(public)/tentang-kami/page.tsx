import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ShieldCheck, Eye, Target, CheckCircle2, Award, Clock, Plane, Sparkles, ArrowRight, HeartHandshake, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink } from "@/utils/wa-link";

export const metadata: Metadata = {
  title: "Tentang Kami | Lion Cargo Logistik Bandara Soetta",
  description: "Profil lengkap Lion Cargo Logistik, agen cargo udara resmi & profesional untuk pengiriman cepat dari Bandara Soekarno-Hatta (CGK) ke seluruh Indonesia.",
};

const stats = [
  { value: "113+", label: "Kota & Bandara Tujuan", icon: Plane },
  { value: "24/7", label: "Dukungan Tim CS", icon: Headphones },
  { value: "100%", label: "Transparansi Tarif", icon: ShieldCheck },
  { value: "Same-Day", label: "Penerbangan Pertama", icon: Clock },
];

const misi = [
  "Menyediakan layanan pengiriman cargo udara terintegrasi dari Bandara Soekarno-Hatta ke seluruh jaringan bandara Indonesia.",
  "Menyampaikan tarif per kg dan biaya operasional secara terbuka sejak awal tanpa biaya terselubung.",
  "Menangani setiap kargo, dokumen, dan barang bernilai tinggi dengan standar keselamatan & kehati-hatian ketat.",
  "Menyediakan layanan respons cepat dan komunikasi intensif lewat WhatsApp untuk setiap status pengiriman.",
];

const nilai = [
  {
    title: "Transparan & Jujur",
    text: "Tarif dan biaya penanganan disampaikan secara rinci sejak awal, tanpa ada kejutan biaya tak terduga di akhir.",
    icon: ShieldCheck,
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
  {
    title: "Penanganan Ekstra Hati-hati",
    text: "Barang pelanggan kami perlakukan sebagai prioritas utama dengan protokol penanganan khusus di terminal kargo.",
    icon: HeartHandshake,
    color: "text-brand bg-brand/10 border-brand/20",
  },
  {
    title: "Tanggung Jawab Penuh",
    text: "Setiap paket dicatat, dipantau, dan diurus secara profesional dari penerimaan awal hingga tiba di bandara tujuan.",
    icon: Award,
    color: "text-blue-600 bg-blue-50 border-blue-100",
  },
  {
    title: "Aksesibilitas Mudah",
    text: "Layanan konsultasi, pemesanan slot penerbangan, dan cek status kargo dapat diakses instan melalui WhatsApp.",
    icon: MessageCircle,
    color: "text-amber-600 bg-amber-50 border-amber-100",
  },
];

const komitmen = [
  "Kepastian tarif per Kg yang jelas dan jujur sebelum barang diproses.",
  "Prosedur pengiriman kargo yang simpel, cepat, tanpa birokrasi rumit.",
  "Pengawasan intensif terhadap paket dan dokumen penting Anda.",
  "Layanan konsultasi ramah & responsif dari tim spesialis kargo udara kami.",
];

export default function TentangKamiPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen">
      {/* 1. HERO SECTION (Cerah & Segar dengan Gradien Merah-Putih) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-50/60 via-slate-50 to-white pt-10 pb-16 sm:pt-14 sm:pb-24 border-b border-slate-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-600 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs mb-6">
            <Link href="/" className="hover:text-brand transition-colors font-medium">
              Beranda
            </Link>
            <span className="text-slate-300">/</span>
            <span aria-current="page" className="text-brand font-bold">
              Tentang Kami
            </span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 border border-brand/20">
              <Sparkles className="size-3.5" /> Mitra Kargo Udara Terpercaya
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
              Solusi Kargo Udara Cepat, Transparan & <span className="text-brand">Handal</span>
            </h1>
            <p className="mt-5 text-base sm:text-xl leading-relaxed text-slate-600 font-normal">
              Agen resmi kargo udara yang didedikasikan untuk memastikan barang dan dokumen penting Anda terbang lebih cepat dan aman dari Bandara Soekarno-Hatta (CGK) ke seluruh penjuru Nusantara.
            </p>
          </div>

          {/* GRID STATISTIK IKONIK */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-brand/40 transition-all group">
                  <Icon className="size-6 text-brand mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. PROFIL PERUSAHAAN + VISUAL PHOTO */}
      <section aria-labelledby="profil-heading" className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Teks Profil */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand bg-brand/10 px-3 py-1 rounded-full border border-brand/20">Profil Perusahaan</div>
              <h2 id="profil-heading" className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Menghubungkan Bisnis & Kebutuhan Pengiriman Anda Lewat Jalur Udara
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-900 font-semibold">Lion Cargo Logistik</strong> merupakan agen spesialis kargo udara yang beroperasi langsung di pusat logistik penerbangan Bandara Soekarno-Hatta, Tangerang/Jakarta.
                </p>
                <p>Kami lahir dari pemahaman mendalam atas kebutuhan para pelaku usaha, perusahaan, dan perorangan yang membutuhkan kepastian waktu, keamanan ekstra, serta transparansi tarif tanpa biaya terselubung.</p>
                <p>Dengan konektivitas langsung ke jaringan penerbangan komersial harian, kami menjamin keberangkatan barang Anda secara prioritas, cepat, dan terukur.</p>
              </div>
            </div>

            {/* Gambar Visual Berkelas */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-100 group">
                <div className="aspect-4/3 relative">
                  <Image
                    src="/images/hero.jpg"
                    alt="Operasional Logistik Kargo Udara Bandara Soekarno-Hatta"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                </div>

                {/* Floating Badge di Atas Foto */}
                <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-lg flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-brand text-white shrink-0">
                    <Plane className="size-6 rotate-45" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">Hub Utama Terminal Kargo CGK</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Penanganan langsung di area bandara keberangkatan utama.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISI & MISI */}
      <section aria-labelledby="visi-heading" className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Kartu Visi */}
            <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-2xs relative overflow-hidden">
              <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-brand/10 text-brand mb-6">
                <Eye className="size-6" />
              </div>
              <h2 id="visi-heading" className="text-xs font-extrabold uppercase tracking-widest text-brand mb-2">
                Visi Kami
              </h2>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                &ldquo;Menjadi agen kargo udara paling terpercaya di Indonesia yang dikenal atas kecepatan, kejelasan biaya, serta kemudahan akses layanan bagi seluruh masyarakat.&rdquo;
              </p>
            </div>

            {/* Daftar Misi */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-2xs">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-brand/10 text-brand">
                  <Target className="size-6" />
                </div>
                <div>
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-brand">Misi Utama</h2>
                  <h3 className="text-lg font-extrabold text-slate-900">Langkah Nyata Kami</h3>
                </div>
              </div>

              <div className="space-y-4">
                {misi.map((item, index) => (
                  <div key={item} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/60 hover:border-brand/30 transition-colors">
                    <span className="flex items-center justify-center size-8 rounded-xl bg-brand text-white font-extrabold text-sm shrink-0 mt-0.5">{String(index + 1).padStart(2, "0")}</span>
                    <p className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed pt-0.5">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NILAI-NILAI UTAMA (VALUES) */}
      <section aria-labelledby="nilai-heading" className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand bg-brand/10 px-3 py-1 rounded-full border border-brand/20">Prinsip Kerja</span>
            <h2 id="nilai-heading" className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Nilai Fondasi yang Kami Pegang
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2">Setiap keputusan dan standar pelayanan kami berlandaskan pada 4 pilar utama ini.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nilai.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-6 sm:p-7 rounded-3xl bg-slate-50/80 border border-slate-200/70 hover:border-brand/40 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 group">
                  <div className={`p-3.5 rounded-2xl border w-fit mb-5 ${item.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. KOMITMEN PELAYANAN (Aksen Merah Brand Lembut) */}
      <section aria-labelledby="komitmen-heading" className="py-16 sm:py-20 bg-red-50/50 border-b border-red-100/80 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand bg-brand/10 px-3 py-1 rounded-full border border-brand/20">Jaminan Kualitas</span>
              <h2 id="komitmen-heading" className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Komitmen Nyata Lion Cargo Logistik
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">Kepercayaan jangka panjang pelanggan adalah aset terbesar kami. Oleh karena itu, kami memberikan komitmen pelayanan tanpa kompromi.</p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {komitmen.map((item) => (
                <div key={item} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-brand shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION (CTA) */}
      <section aria-labelledby="cta-heading" className="py-16 sm:py-24 bg-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-14 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs relative overflow-hidden">
            <h2 id="cta-heading" className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Siap Mengirimkan Paket & Cargo Udara Anda?
            </h2>
            <p className="mt-3 text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">Hitung estimasi ongkir secara instan lewat kalkulator online kami atau langsung hubungi tim penanganan kargo via WhatsApp.</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="h-13 w-full sm:w-auto rounded-xl bg-brand hover:bg-brand/90 px-8 text-sm font-bold text-white shadow-md shadow-brand/20 active:scale-95 transition-all">
                <Link href="/cek-ongkir" className="flex items-center gap-2">
                  <Plane className="size-4" /> Cek Tarif Ongkir <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="h-13 w-full sm:w-auto rounded-xl border-slate-300 bg-white px-8 text-sm font-bold text-slate-800 hover:bg-slate-100 active:scale-95 transition-all">
                <a href={waLink("Halo Lion Cargo Logistik, saya ingin bertanya tentang prosedur dan tarif kargo udara.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <MessageCircle className="size-4 text-emerald-600" /> Hubungi Customer Service
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
