import type { Destination } from "@/types/tarif";

/** Contoh: "Surabaya (SUB)", atau "Surabaya" bila tidak punya kode bandara. */
export function formatDestinationLabel(destination: Destination): string {
  return destination.code ? `${destination.name} (${destination.code})` : destination.name;
}

/** Tarif dianggap tersedia hanya bila berupa angka valid dan > 0. */
export function hasTariff(destination: Destination): boolean {
  return Number.isFinite(destination.pricePerKg) && destination.pricePerKg > 0;
}

/** Cari berdasarkan nama kota atau kode bandara, tidak sensitif huruf besar/kecil dan spasi di tepi. */
export function filterDestinations(destinations: Destination[], query: string): Destination[] {
  const keyword = query.trim().toLowerCase();
  if (keyword === "") return destinations;

  return destinations.filter((item) => item.name.toLowerCase().includes(keyword) || (item.code?.toLowerCase().includes(keyword) ?? false));
}
