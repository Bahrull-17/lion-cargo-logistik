import { redirect } from "next/navigation";
import { ArtikelForm } from "@/features/admin/components/artikel-form";
import { emptyArticleFormValues } from "@/features/admin/lib/artikel-form-values";
import { getAdmin } from "@/features/admin/lib/get-admin";

export default async function AdminArtikelBaruPage() {
  // Layout tidak cukup sebagai pengaman (page bisa dirender terpisah), jadi dicek lagi di sini.
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  return <ArtikelForm articleId={null} initial={emptyArticleFormValues()} />;
}
