const rupiahFormatter = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 });

/** Format angka ke gaya Indonesia tanpa simbol, mis. 1250000 -> "1.250.000". */
export function formatRupiah(value: number): string {
  return rupiahFormatter.format(value);
}
