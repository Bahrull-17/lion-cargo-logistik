import { useMemo, useState } from "react";
import type { Destination } from "@/types/tarif";
import { DESTINATIONS_PER_PAGE } from "@/features/cek-ongkir/constants";
import { filterDestinations } from "@/features/cek-ongkir/lib/destination";

/** State pencarian + paginasi untuk tabel tarif. */
export function useDestinationTable(destinations: Destination[]) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => filterDestinations(destinations, query), [destinations, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / DESTINATIONS_PER_PAGE));
  // Dijepit agar tidak pernah melewati halaman terakhir (mis. data berubah).
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * DESTINATIONS_PER_PAGE;
  const pageItems = filtered.slice(startIndex, startIndex + DESTINATIONS_PER_PAGE);

  const updateQuery = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  return {
    query,
    updateQuery,
    pageItems,
    totalItems: filtered.length,
    currentPage,
    totalPages,
    rangeStart: filtered.length === 0 ? 0 : startIndex + 1,
    rangeEnd: Math.min(startIndex + DESTINATIONS_PER_PAGE, filtered.length),
    goToPage: (target: number) => setPage(Math.min(Math.max(target, 1), totalPages)),
  };
}
