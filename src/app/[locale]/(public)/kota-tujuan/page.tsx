import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { KotaTujuanContent } from "@/features/kota-tujuan/components/kota-tujuan-content";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getAllDestinations } from "@/services/tarif.service";
import type { Destination } from "@/types/tarif";

// Data tarif selalu segar: perubahan dari panel admin langsung tampil tanpa deploy ulang.
export const dynamic = "force-dynamic";

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

  let tarifData: Destination[] = [];
  try {
    tarifData = await getAllDestinations();
  } catch (err) {
    console.warn("Gagal mengambil data tujuan dari Supabase:", err);
  }

  return (
    <>
      <BreadcrumbJsonLd locale={locale} page="destination" />
      <KotaTujuanContent initialTarifData={tarifData} />
    </>
  );
}
