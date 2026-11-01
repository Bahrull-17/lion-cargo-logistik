import { getTranslations } from "next-intl/server";

import { navigation } from "@/config/navigation";
import { JsonLd } from "@/lib/seo/json-ld";
import { localizedPath } from "@/lib/seo/metadata";
import { createBreadcrumbSchema, type BreadcrumbItem } from "@/lib/schema/breadcrumb";

type NavKey = Exclude<(typeof navigation)[number]["key"], "home">;

type Props = {
  locale: string;
  /** Halaman induk: key menu navigasi, atau "cekOngkir" (tidak ada di menu). */
  page: NavKey | "cekOngkir";
  /** Halaman anak (mis. detail artikel). */
  leaf?: BreadcrumbItem;
};

/** BreadcrumbList: Beranda > Halaman [> Halaman anak]. Nama diambil dari terjemahan. */
export async function BreadcrumbJsonLd({ locale, page, leaf }: Props) {
  const nav = await getTranslations({ locale, namespace: "navigation" });

  let name: string;
  let href: string;

  if (page === "cekOngkir") {
    const common = await getTranslations({ locale, namespace: "common" });
    name = common("checkRate");
    href = "/cek-ongkir";
  } else {
    const current = navigation.find((item) => item.key === page);
    if (!current) return null;
    name = nav(page);
    href = current.href;
  }

  const items: BreadcrumbItem[] = [
    { name: nav("home"), path: localizedPath(locale, "/") },
    { name, path: localizedPath(locale, href) },
  ];
  if (leaf) items.push(leaf);

  return <JsonLd data={createBreadcrumbSchema(items)} />;
}
