import { cacheLife, cacheTag } from "next/cache";
import { z } from "zod";
import { createPublicClient } from "@/lib/supabase/public-client";
import type { Destination } from "@/types/tarif";

const SERVICE_REGULER = "Reguler";

const TarifRowSchema = z.object({
  route_slug: z.string().min(1),
  destination: z.string().min(1),
  dest_code: z.string().nullable(),
  price: z.coerce.number().nonnegative(),
  min_weight: z.coerce.number().positive(),
});

export async function getDestinations(): Promise<Destination[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("tarifs");

  const { data, error } = await createPublicClient().from("tarifs").select("route_slug, destination, dest_code, price, min_weight").eq("service", SERVICE_REGULER).order("destination");

  if (error) throw new Error(`Gagal memuat tarif: ${error.message}`);

  return (data ?? []).flatMap((raw) => {
    const row = TarifRowSchema.safeParse(raw);
    if (!row.success) return [];

    const { route_slug, destination, dest_code, price, min_weight } = row.data;
    return [{ slug: route_slug, name: destination, code: dest_code, pricePerKg: price, minWeight: min_weight }];
  });
}

export async function getAllDestinations(): Promise<Destination[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("tarifs-all");

  const { data, error } = await createPublicClient().from("tarifs").select("route_slug, destination, dest_code, price, min_weight").order("destination");

  if (error) throw new Error(`Gagal memuat semua destinasi: ${error.message}`);

  const uniqueMap = new Map<string, Destination>();

  (data ?? []).forEach((raw) => {
    const row = TarifRowSchema.safeParse(raw);
    if (!row.success) return;

    const { route_slug, destination, dest_code, price, min_weight } = row.data;
    const key = destination.trim().toLowerCase();

    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, {
        slug: route_slug,
        name: destination,
        code: dest_code,
        pricePerKg: price,
        minWeight: min_weight,
      });
    }
  });

  return Array.from(uniqueMap.values());
}
