export type PageItem = number | "ellipsis";

/**
 * Halaman pertama, terakhir, dan tetangga halaman aktif.
 * Celah selebar 1 halaman diisi halamannya langsung; celah lebih lebar diberi "ellipsis".
 */
export function getPageItems(currentPage: number, totalPages: number): PageItem[] {
  const pages = [...new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1])].filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b);

  const items: PageItem[] = [];
  pages.forEach((page, index) => {
    if (index > 0) {
      const gap = page - pages[index - 1]!;
      if (gap === 2) items.push(page - 1);
      else if (gap > 2) items.push("ellipsis");
    }
    items.push(page);
  });
  return items;
}
