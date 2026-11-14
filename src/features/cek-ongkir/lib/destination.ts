import type { Destination } from "@/types/tarif";

export function formatDestinationLabel(destination: Destination): string {
  return destination.code ? `${destination.name} (${destination.code})` : destination.name;
}

export function hasTariff(destination: Destination): boolean {
  return Number.isFinite(destination.pricePerKg) && destination.pricePerKg > 0;
}

export function filterDestinations(destinations: Destination[], query: string): Destination[] {
  const keyword = query.trim().toLowerCase();
  if (keyword === "") return destinations;

  return destinations.filter((item) => item.name.toLowerCase().includes(keyword) || (item.code?.toLowerCase().includes(keyword) ?? false));
}
