"use client";

import { useId } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { TablePagination } from "@/features/cek-ongkir/components/table-pagination";
import { useDestinationTable } from "@/features/cek-ongkir/hooks/use-destination-table";
import { hasTariff } from "@/features/cek-ongkir/lib/destination";
import { formatRupiah } from "@/features/cek-ongkir/lib/format-rupiah";
import type { Destination } from "@/types/tarif";

interface DestinationTableProps {
  destinations: Destination[];
  onSelect: (slug: string) => void;
}

function PricePerKg({ destination }: { destination: Destination }) {
  const t = useTranslations("pages.cekOngkir.table");
  const locale = useLocale();

  if (!hasTariff(destination)) return <span className="font-sans text-xs font-bold text-amber-600">{t("contactAdmin")}</span>;
  return <>Rp {formatRupiah(destination.pricePerKg, locale)}</>;
}

export function DestinationTable({ destinations, onSelect }: DestinationTableProps) {
  const t = useTranslations("pages.cekOngkir.table");
  const searchId = useId();
  const { query, updateQuery, pageItems, totalItems, currentPage, totalPages, rangeStart, rangeEnd, goToPage } = useDestinationTable(destinations);

  return (
    <section aria-labelledby={`${searchId}-title`} className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-8">
        <div className="mb-5 flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-center">
          <div>
            <h2 id={`${searchId}-title`} className="font-heading text-lg font-extrabold text-slate-900 sm:text-2xl">
              {t("title")}
            </h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">{t("subtitle", { count: totalItems })}</p>
          </div>

          <div className="relative w-full md:w-72">
            <label htmlFor={searchId} className="sr-only">
              {t("searchLabel")}
            </label>
            <input
              id={searchId}
              type="search"
              placeholder={t("searchPlaceholder")}
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 font-mono font-bold uppercase tracking-wider text-slate-700">
                <th scope="col" className="rounded-l-xl px-4 py-3.5">
                  {t("colCity")}
                </th>
                <th scope="col" className="px-4 py-3.5">
                  {t("colCode")}
                </th>
                <th scope="col" className="px-4 py-3.5 text-right">
                  {t("colPrice")}
                </th>
                <th scope="col" className="rounded-r-xl px-4 py-3.5 text-right">
                  {t("colAction")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pageItems.length > 0 ? (
                pageItems.map((destination) => (
                  <tr key={destination.slug} className="transition-colors hover:bg-slate-50/80">
                    <td className="px-4 py-3.5 font-bold text-slate-900">{destination.name}</td>
                    <td className="px-4 py-3.5 font-mono font-extrabold text-red-600">{destination.code || "-"}</td>
                    <td className="px-4 py-3.5 text-right font-mono text-sm font-black text-slate-900">
                      <PricePerKg destination={destination} />
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        type="button"
                        aria-label={t("selectAria", { name: destination.name })}
                        onClick={() => onSelect(destination.slug)}
                        className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-[11px] font-bold text-red-600 transition-all hover:bg-red-600 hover:text-white"
                      >
                        {t("selectCity")}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center font-medium text-slate-400">
                    {t("notFound")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="block space-y-3 md:hidden">
          {pageItems.length > 0 ? (
            pageItems.map((destination) => (
              <div key={destination.slug} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/90 bg-slate-50/50 p-3.5">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-900">{destination.name}</span>
                    {destination.code && <span className="rounded border border-red-100 bg-red-50 px-1.5 py-0.5 font-mono text-[10px] font-extrabold text-red-600">{destination.code}</span>}
                  </div>
                  <div className="font-mono text-xs font-black text-red-600">
                    <PricePerKg destination={destination} />
                    {hasTariff(destination) && <span className="text-[10px] font-normal text-slate-500">{t("perKg")}</span>}
                  </div>
                </div>

                <button
                  type="button"
                  aria-label={t("selectAria", { name: destination.name })}
                  onClick={() => onSelect(destination.slug)}
                  className="shrink-0 cursor-pointer rounded-lg bg-red-600 px-3 py-1.5 text-[11px] font-bold text-white shadow-xs transition-all"
                >
                  {t("select")}
                </button>
              </div>
            ))
          ) : (
            <div className="py-6 text-center text-xs font-medium text-slate-400">{t("notFound")}</div>
          )}
        </div>

        <TablePagination currentPage={currentPage} totalPages={totalPages} rangeStart={rangeStart} rangeEnd={rangeEnd} totalItems={totalItems} onPageChange={goToPage} />
      </div>
    </section>
  );
}
