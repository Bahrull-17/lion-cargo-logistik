import sanitizeHtml from "sanitize-html";

/**
 * Daftar putih isi artikel. Harus selaras dengan fitur editor (Tiptap):
 * judul 2-3, paragraf, tebal, miring, daftar (termasuk nomor awal), kutipan, dan tautan.
 */
const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ["h2", "h3", "p", "br", "strong", "em", "ul", "ol", "li", "blockquote", "a"],
  allowedAttributes: { a: ["href", "target", "rel"], ol: ["start"] },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowProtocolRelative: false,
  transformTags: {
    a: (tagName, attribs) => ({ tagName: "a", attribs: { ...attribs, rel: "noopener noreferrer" } }),
    // "start" menjaga urutan nomor saat daftar bernomor terputus paragraf/poin; hanya angka 1-999 yang diterima.
    ol: (tagName, attribs) => {
      const attributes: Record<string, string> = {};
      const start = attribs.start;
      if (start && /^[1-9]\d{0,2}$/.test(start)) attributes.start = start;
      return { tagName: "ol", attribs: attributes };
    },
  },
};

/** Membersihkan HTML dari editor sebelum disimpan (membuang script, event handler, tautan javascript:, dll). */
export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, SANITIZE_OPTIONS).trim();
}

/** Teks polos dari HTML, untuk cek "isi kosong" dan hitung waktu baca. */
export function htmlToPlainText(html: string): string {
  const spaced = html.replace(/<\/(p|h2|h3|li|blockquote|ul|ol)>|<br\s*\/?>/gi, " ");
  return sanitizeHtml(spaced, { allowedTags: [], allowedAttributes: {} }).replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}

const WORDS_PER_MINUTE = 200;

export function estimateReadingMinutes(plainText: string): number {
  const words = plainText === "" ? 0 : plainText.split(" ").length;
  return Math.min(120, Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)));
}
