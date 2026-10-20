import type { Metadata } from "next";
import { Suspense } from "react";
import { CekOngkirContent } from "@/features/cek-ongkir/cek-ongkir-content";
import { CekOngkirSkeleton } from "@/features/cek-ongkir/cek-ongkir-skeleton";

export const metadata: Metadata = {
  title: "Cek Ongkir Cargo Udara",
  description: "Cek ongkir cargo udara dari Bandara Soekarno-Hatta (CGK) ke 113 kota tujuan di Indonesia. Hitung tarif per kg dan berat volume dengan mudah.",
  alternates: { canonical: "/cek-ongkir" },
};

export default function CekOngkirPage() {
  return (
    <Suspense fallback={<CekOngkirSkeleton />}>
      <CekOngkirContent />
    </Suspense>
  );
}
