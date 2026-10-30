const INTL_LOCALE: Record<string, string> = { id: "id-ID", en: "en-US" };
const formatters = new Map<string, Intl.NumberFormat>();

/** Format angka tanpa simbol mengikuti bahasa aktif, mis. 1250000 -> "1.250.000" (id) / "1,250,000" (en). */
export function formatRupiah(value: number, locale: string = "id"): string {
  const intlLocale = INTL_LOCALE[locale] ?? "id-ID";
  let formatter = formatters.get(intlLocale);
  if (!formatter) {
    formatter = new Intl.NumberFormat(intlLocale, { maximumFractionDigits: 0 });
    formatters.set(intlLocale, formatter);
  }
  return formatter.format(value);
}
