import { cacheLife, cacheTag } from "next/cache";
import { z } from "zod";
import { createPublicClient } from "@/lib/supabase/public-client";
import { DESTINATION_REGIONS, type Destination } from "@/types/tarif";

const SERVICE_REGULER = "Reguler";

const TarifRowSchema = z.object({
  route_slug: z.string().min(1),
  destination: z.string().min(1),
  dest_code: z.string().nullable(),
  price: z.coerce.number().nonnegative(),
  min_weight: z.coerce.number().positive(),
  region: z.enum(DESTINATION_REGIONS).nullable(),
});

const TARIF_COLUMNS = "route_slug, destination, dest_code, price, min_weight, region";

type TarifRow = z.infer<typeof TarifRowSchema>;

function toDestination(row: TarifRow): Destination {
  return { slug: row.route_slug, name: row.destination, code: row.dest_code, pricePerKg: row.price, minWeight: row.min_weight, region: row.region };
}

/** Query tunggal tarif layanan Reguler; baris yang tidak lolos validasi dilewati. */
async function fetchRegulerRows(errorLabel: string): Promise<TarifRow[]> {
  const { data, error } = await createPublicClient().from("tarifs").select(TARIF_COLUMNS).eq("service", SERVICE_REGULER).order("destination");

  if (error) throw new Error(`${errorLabel}: ${error.message}`);

  return (data ?? []).flatMap((raw) => {
    const row = TarifRowSchema.safeParse(raw);
    return row.success ? [row.data] : [];
  });
}

export async function getDestinations(): Promise<Destination[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("tarifs");

  return (await fetchRegulerRows("Gagal memuat tarif")).map(toDestination);
}

/** Layanan Reguler, satu entri per nama kota (dedup sebagai pengaman). */
export async function getAllDestinations(): Promise<Destination[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("tarifs-all");

  const uniqueMap = new Map<string, Destination>();

  for (const row of await fetchRegulerRows("Gagal memuat semua destinasi")) {
    const key = row.destination.trim().toLowerCase();
    if (!uniqueMap.has(key)) uniqueMap.set(key, toDestination(row));
  }

  return Array.from(uniqueMap.values());
}
