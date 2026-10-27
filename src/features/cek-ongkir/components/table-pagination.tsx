import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPageItems } from "@/features/cek-ongkir/lib/pagination";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  rangeStart: number;
  rangeEnd: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const NAV_BUTTON =
  "rounded-xl border border-slate-200 p-2 text-slate-600 transition-all hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40";

export function TablePagination({ currentPage, totalPages, rangeStart, rangeEnd, totalItems, onPageChange }: TablePaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-4 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-5 text-xs sm:flex-row">
      <span className="text-center text-[11px] text-slate-500 sm:text-left sm:text-xs">
        Menampilkan <strong className="text-slate-800">{rangeStart}</strong> - <strong className="text-slate-800">{rangeEnd}</strong> dari <strong className="text-slate-800">{totalItems}</strong> kota
      </span>

      <nav aria-label="Halaman tabel tarif" className="flex items-center gap-1 sm:gap-1.5">
        <button type="button" aria-label="Halaman sebelumnya" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className={NAV_BUTTON}>
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>

        {getPageItems(currentPage, totalPages).map((item, index) =>
          item === "ellipsis" ? (
            <span key={`ellipsis-${index}`} className="px-1 text-xs text-slate-400" aria-hidden="true">
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-label={`Halaman ${item}`}
              aria-current={item === currentPage ? "page" : undefined}
              onClick={() => onPageChange(item)}
              className={`size-9 rounded-xl font-mono text-xs font-bold transition-all ${
                item === currentPage ? "bg-red-600 text-white shadow-md shadow-red-600/30" : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {item}
            </button>
          ),
        )}

        <button type="button" aria-label="Halaman berikutnya" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} className={NAV_BUTTON}>
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
}
