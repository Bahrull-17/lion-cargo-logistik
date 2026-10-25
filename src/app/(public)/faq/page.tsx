import { FaqContent } from "@/features/faq/components/faq-content";

export const metadata = {
  title: "Pertanyaan Umum (FAQ) - Lion Cargo Logistik",
  description: "Temukan jawaban lengkap seputar prosedur pengiriman kargo udara, syarat dokumen, cara cek resi, ketentuan barang dilarang, dan tarif dari Bandara Soekarno-Hatta (CGK).",
};

export default async function FaqPage() {
  return <FaqContent />;
}
