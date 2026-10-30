import { redirect } from "next/navigation";
import { getAdmin } from "@/features/admin/lib/get-admin";
import { TarifManager, type AdminTarif } from "@/features/admin/components/tarif-manager";

const SERVICE_REGULER = "Reguler";

export default async function AdminTarifPage() {
  // Layout tidak cukup sebagai pengaman (page bisa dirender terpisah), jadi dicek lagi di sini.
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  const { data, error } = await admin.supabase.from("tarifs").select("id, destination, dest_code, price, status, updated_at").eq("service", SERVICE_REGULER).order("destination");

  if (error) {
    return <p className="p-6 text-sm text-red-600">Gagal memuat tarif. Muat ulang halaman.</p>;
  }

  const items: AdminTarif[] = (data ?? []).map((row) => ({
    id: String(row.id),
    name: String(row.destination),
    code: row.dest_code ? String(row.dest_code) : null,
    price: Number(row.price),
    status: String(row.status ?? ""),
    updatedAt: row.updated_at ? String(row.updated_at) : null,
  }));

  return <TarifManager initialItems={items} />;
}
