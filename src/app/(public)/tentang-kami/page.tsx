import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink } from "@/utils/wa-link";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Lion Cargo Logistik adalah agen cargo udara untuk pengiriman barang dan dokumen dari Bandara Soekarno-Hatta ke berbagai kota di Indonesia.",
};

const misi = [
  "Menyediakan layanan pengiriman cargo udara dari Bandara Soekarno-Hatta ke berbagai kota tujuan di Indonesia.",
  "Menyampaikan tarif per kg dan biaya layanan secara terbuka sebelum pengiriman dipesan.",
  "Menangani setiap barang dengan hati-hati, dari penerimaan sampai tujuan.",
  "Menjaga komunikasi yang jelas dan mudah dihubungi lewat WhatsApp.",
];

const nilai = [
  {
    title: "Transparan",
    text: "Tarif dan biaya penanganan disampaikan sejak awal, tanpa kejutan di belakang.",
  },
  {
    title: "Hati-hati",
    text: "Barang pelanggan diperlakukan seperti barang sendiri, dari awal sampai tujuan.",
  },
  {
    title: "Bertanggung jawab",
    text: "Setiap pengiriman dicatat dan diurus sampai tuntas.",
  },
  {
    title: "Mudah dihubungi",
    text: "Pelanggan bisa bertanya dan memesan langsung lewat WhatsApp.",
  },
];

const komitmen = [
  "Memberi informasi tarif yang jelas sebelum pengiriman dipesan.",
  "Menjelaskan proses pengiriman dengan bahasa yang mudah dipahami.",
  "Menangani barang dan dokumen dengan hati-hati.",
  "Membantu pelanggan yang membutuhkan informasi tambahan lewat WhatsApp.",
];

export default function TentangKamiPage() {
  return (
    <>
      <section className="bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-white/60">
            <Link href="/" className="hover:text-white">
              Beranda
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span aria-current="page" className="text-white">
              Tentang Kami
            </span>
          </nav>

          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.1] sm:text-5xl">Tentang Lion Cargo Logistik</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">Agen cargo udara yang membantu pengiriman barang dan dokumen dari Bandara Soekarno-Hatta ke berbagai kota di Indonesia.</p>
        </div>
      </section>

      <section aria-labelledby="profil-heading" className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 md:gap-12 lg:px-8 lg:py-20">
          <div>
            <h2 id="profil-heading" className="text-2xl font-extrabold leading-tight text-charcoal sm:text-4xl">
              Profil Perusahaan
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>Lion Cargo Logistik adalah agen cargo udara yang melayani pengiriman barang dan dokumen lewat pesawat dari Bandara Soekarno-Hatta, Jakarta, ke bandara tujuan di berbagai kota di Indonesia.</p>
              <p>Kami fokus pada hal yang paling dibutuhkan pengirim: tarif per kg yang jelas, proses yang sederhana, dan barang yang ditangani dengan hati-hati sampai tujuan.</p>
            </div>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-secondary">
            <Image src="/images/hero.jpg" alt="Pesawat cargo dan barang kiriman di bandara" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section aria-labelledby="visi-heading" className="bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-5 lg:gap-16 lg:px-8 lg:py-20">
          <div className="lg:col-span-2">
            <h2 id="visi-heading" className="text-sm font-semibold text-brand">
              Visi
            </h2>
            <p className="mt-3 text-2xl font-extrabold leading-snug text-charcoal sm:text-3xl">Menjadi agen cargo udara yang dipercaya pelanggan di seluruh Indonesia lewat layanan yang jelas, aman, dan mudah dijangkau.</p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-brand">Misi</h2>
            <ol className="mt-3 border-t border-charcoal/10">
              {misi.map((item, index) => (
                <li key={item} className="flex gap-5 border-b border-charcoal/10 py-5">
                  <span aria-hidden="true" className="w-8 shrink-0 font-heading text-2xl font-extrabold leading-none text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base leading-relaxed text-charcoal">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="nilai-heading" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <h2 id="nilai-heading" className="max-w-xl text-2xl font-extrabold leading-tight text-charcoal sm:text-4xl">
            Nilai yang Kami Pegang
          </h2>

          <ul className="mt-10 grid border-t sm:grid-cols-2">
            {nilai.map((item) => (
              <li key={item.title} className="border-b py-6 sm:px-0 sm:py-8 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8">
                <h3 className="text-lg font-bold text-charcoal">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="komitmen-heading" className="bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-5 lg:gap-16 lg:px-8 lg:py-20">
          <div className="lg:col-span-2">
            <h2 id="komitmen-heading" className="text-2xl font-extrabold leading-tight text-charcoal sm:text-4xl">
              Komitmen Pelayanan
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">Kepercayaan dibangun dari hal-hal sederhana yang dilakukan dengan konsisten.</p>
          </div>

          <ul className="space-y-4 lg:col-span-3">
            {komitmen.map((item) => (
              <li key={item} className="flex gap-4">
                <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-sm bg-brand" />
                <p className="text-base leading-relaxed text-charcoal sm:text-lg">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="cta-heading" className="bg-charcoal text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 lg:py-20">
          <h2 id="cta-heading" className="text-2xl font-extrabold leading-tight sm:text-4xl">
            Ada barang yang ingin dikirim?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">Cek tarif ke kota tujuan Anda, atau tanyakan langsung lewat WhatsApp.</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="h-14 w-full rounded-lg px-8 text-base font-semibold sm:w-auto">
              <Link href="/cek-ongkir">Cek Ongkir</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 w-full rounded-lg border-white/40 bg-transparent px-8 text-base font-semibold text-white hover:bg-white hover:text-charcoal sm:w-auto">
              <a href={waLink("Halo Lion Cargo Logistik, saya ingin bertanya tentang pengiriman cargo.")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-5" />
                Hubungi Kami
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
