import type { Metadata } from "next";
import { LayananContent } from "@/features/layanan/components/layanan-content";

export const metadata: Metadata = {
  title: "Layanan Kargo Udara & Ekspedisi Antarpulau | Lion Cargo Logistik",
  description: "Pilih layanan pengiriman kargo udara terbaik dari Bandara Soekarno-Hatta (CGK) ke seluruh Indonesia. Tersedia Cargo Reguler, Express Prioritas, dan Same Day.",
  alternates: { canonical: "/layanan" },
};

export default function LayananPage() {
  return <LayananContent />;
}
