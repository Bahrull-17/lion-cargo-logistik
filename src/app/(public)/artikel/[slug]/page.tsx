import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, Clock, User, MessageCircle, ArrowLeft } from "lucide-react";
import { waLink } from "@/lib/wa-link";
import { getArtikelBySlug, daftarArtikel } from "@/features/artikel/data/articles";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return daftarArtikel.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const artikel = getArtikelBySlug(slug);

  if (!artikel) {
    return { title: "Artikel Tidak Ditemukan - Lion Cargo Logistik" };
  }

  return {
    title: `${artikel.judul} - Lion Cargo Logistik`,
    description: artikel.excerpt,
  };
}

async function ArtikelIsi({ params }: PageProps) {
  const { slug } = await params;
  const artikel = getArtikelBySlug(slug);

  if (!artikel) {
    notFound();
  }

  return (
    <article className="bg-slate-50 text-slate-800 min-h-screen pb-16">
      <section className="bg-white border-b border-slate-200/80 pt-6 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-6">
            <Link href="/" className="hover:text-red-600 transition-colors">
              Beranda
            </Link>
            <ChevronRight className="size-3.5 text-slate-400" />
            <Link href="/artikel" className="hover:text-red-600 transition-colors">
              Artikel
            </Link>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="text-red-600 font-bold truncate max-w-50 sm:max-w-xs">{artikel.judul}</span>
          </nav>

          <Link href="/artikel" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-red-600 transition-colors mb-4">
            <ArrowLeft className="size-4" />
            <span>Kembali ke Daftar Artikel</span>
          </Link>

          <div className="space-y-4">
            <span className="inline-block bg-red-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-lg tracking-wider">{artikel.kategori}</span>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight">{artikel.judul}</h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-slate-500 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <User className="size-4 text-red-600" />
                {artikel.penulis}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4 text-red-600" />
                {artikel.tanggal}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4 text-red-600" />
                {artikel.waktuBaca}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        <div className="relative h-62.5 sm:h-105 rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 mb-8 bg-slate-100">
          <Image src={artikel.gambar} alt={artikel.judul} fill priority sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs">
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: artikel.isiHtml }} />

          <div className="mt-10 p-6 sm:p-8 bg-slate-900 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-lg font-black tracking-tight">Butuh Bantuan Pengiriman Kargo Udara?</h3>
              <p className="text-xs text-slate-300">Tim spesialis Lion Cargo siap melayani konsultasi rute &amp; tarif secara gratis.</p>
            </div>
            <a
              href={waLink(`Halo Lion Cargo, saya membaca artikel "${artikel.judul}" dan ingin bertanya mengenai pengiriman.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-extrabold text-xs transition-all shadow-md"
            >
              <MessageCircle className="size-4" />
              <span>Tanya via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}

export default function DetailArtikelPage({ params }: PageProps) {
  return (
    <Suspense fallback={null}>
      <ArtikelIsi params={params} />
    </Suspense>
  );
}
