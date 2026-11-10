import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { KotaTujuanContent } from "@/features/kota-tujuan/components/kota-tujuan-content";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getAllDestinations } from "@/services/tarif.service";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata(locale, "kotaTujuan");
}

export default async function KotaTujuanPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Halaman ini dibuat SAAT BUILD, jadi daftar kota sudah ada di HTML awal (baik untuk SEO).
  // Bila Supabase gagal saat build, error sengaja dibiarkan agar build gagal dan situs tetap
  // memakai versi sebelumnya, bukan menayangkan halaman dengan daftar kosong.
  // Browser lalu mengambil data terbaru (lihat KotaTujuanContent), jadi perubahan admin tetap tampil.
  const tarifData = await getAllDestinations();

  return (
    <>
      <BreadcrumbJsonLd locale={locale} page="destination" />
      <KotaTujuanContent initialTarifData={tarifData} />
    </>
  );
}
