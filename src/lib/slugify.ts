const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const MAX_SLUG_LENGTH = 120;

/** Slug yang sah: huruf kecil, angka, dan tanda hubung (tanpa tanda hubung di awal/akhir/ganda). */
export function isValidSlug(slug: string): boolean {
  return slug.length > 0 && slug.length <= MAX_SLUG_LENGTH && SLUG_PATTERN.test(slug);
}

/** "Cara Kirim Barang & Tips Packing!" -> "cara-kirim-barang-tips-packing" */
export function slugify(input: string, maxLength = 80): string {
  const base = input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (base.length <= maxLength) return base;

  // Potong di batas kata supaya slug tidak berakhir di tengah kata.
  const cut = base.slice(0, maxLength);
  const lastDash = cut.lastIndexOf("-");
  return (lastDash > 20 ? cut.slice(0, lastDash) : cut).replace(/-+$/g, "");
}
