import { useId, type FormEvent } from "react";
import { ArrowRight, Calculator, Info, MapPin, Scale, ShieldCheck } from "lucide-react";
import { CARGO_RULES } from "@/features/cek-ongkir/constants";
import { formatDestinationLabel } from "@/features/cek-ongkir/lib/destination";
import { formatRupiah } from "@/features/cek-ongkir/lib/format-rupiah";
import type { Destination } from "@/types/tarif";

interface CalculatorFormProps {
  destinations: Destination[];
  selectedSlug: string;
  /** Berat minimum kota yang sedang dipilih. */
  minWeightKg: number;
  weightInput: string;
  weightError: string | null;
  onDestinationChange: (slug: string) => void;
  onWeightChange: (value: string) => void;
  onSubmit: () => void;
}

const FIELD_BASE = "h-14 w-full rounded-xl border-2 bg-slate-50 text-slate-900 shadow-xs transition-all focus:bg-white focus:outline-none sm:rounded-2xl";

export function CalculatorForm({ destinations, selectedSlug, minWeightKg, weightInput, weightError, onDestinationChange, onWeightChange, onSubmit }: CalculatorFormProps) {
  const selectId = useId();
  const weightId = useId();
  const weightHelpId = useId();
  const weightErrorId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  const handlingFeeLabel = `Rp ${formatRupiah(CARGO_RULES.handlingFee)}`;

  return (
    <>
      <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-600/30 sm:size-11 sm:rounded-2xl">
            <Calculator className="size-5 sm:size-6" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-heading text-base font-extrabold text-slate-900 sm:text-xl">Kalkulator Tarif Cargo Udara</h2>
            <p className="text-[11px] text-slate-500 sm:text-xs">Pilih kota tujuan &amp; masukkan berat kargo</p>
          </div>
        </div>

        <span className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1.5 text-xs font-bold text-slate-700 md:inline-flex">
          <ShieldCheck className="size-4 text-emerald-600" aria-hidden="true" /> Penanganan Admin {handlingFeeLabel}
        </span>
      </div>

      {/* noValidate: validasi ditangani sendiri agar pesan error konsisten & berbahasa Indonesia */}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          <div>
            <label htmlFor={selectId} className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
              Kota / Bandara Tujuan
            </label>
            <div className="relative">
              <select
                id={selectId}
                value={selectedSlug}
                onChange={(event) => onDestinationChange(event.target.value)}
                className={`${FIELD_BASE} cursor-pointer appearance-none border-slate-200 pl-4 pr-10 text-xs font-extrabold focus:border-red-600 sm:text-sm`}
              >
                {destinations.map((destination) => (
                  <option key={destination.slug} value={destination.slug}>
                    {formatDestinationLabel(destination)}
                  </option>
                ))}
              </select>
              <MapPin className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-red-600" aria-hidden="true" />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor={weightId} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                <Scale className="size-4 text-red-600" aria-hidden="true" /> Berat Total Barang (Kg)
              </label>
              <span id={weightHelpId} className="rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-extrabold text-red-600 sm:px-2.5 sm:text-[11px]">
                Min. {minWeightKg} Kg
              </span>
            </div>
            <div className="relative flex items-center">
              <input
                id={weightId}
                type="number"
                inputMode="decimal"
                min={minWeightKg}
                step="any"
                value={weightInput}
                onChange={(event) => onWeightChange(event.target.value)}
                aria-invalid={weightError ? true : undefined}
                aria-describedby={weightError ? `${weightHelpId} ${weightErrorId}` : weightHelpId}
                placeholder="Contoh: 15"
                className={`${FIELD_BASE} pl-4 pr-12 font-mono text-base font-bold sm:text-lg ${weightError ? "border-red-500" : "border-slate-200 focus:border-red-600"}`}
              />
              <span className="absolute right-4 font-mono text-xs font-bold text-slate-400" aria-hidden="true">
                KG
              </span>
            </div>
            {weightError && (
              <p id={weightErrorId} role="alert" className="mt-2 text-xs font-semibold text-red-600">
                {weightError}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-red-200/80 bg-red-50/60 p-4 text-xs leading-relaxed text-slate-800">
          <div className="mb-1.5 flex items-center gap-2 font-bold text-red-700">
            <Info className="size-4 shrink-0 text-red-600" aria-hidden="true" />
            <span>Rumus Perhitungan Tarif Resmi Lion Cargo:</span>
          </div>
          <div className="my-1.5 overflow-x-auto rounded-xl border border-red-200/90 bg-white p-2.5 font-mono text-[11px] font-extrabold text-slate-900 shadow-2xs sm:text-xs">
            Total Biaya = (Tarif per Kg × Berat Tagihan) + Biaya Penanganan Admin ({handlingFeeLabel})
          </div>
          <p className="mt-1 text-[11px] text-slate-600">
            Ketentuan: berat minimal pengiriman adalah <strong className="text-slate-900">{minWeightKg} Kg</strong>
          </p>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/25 transition-all hover:bg-red-700 sm:rounded-2xl sm:py-4 sm:text-base"
          >
            <Calculator className="size-5" aria-hidden="true" />
            <span>Cek Ongkir Sekarang</span>
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>
      </form>
    </>
  );
}
