import sanitizeHtml from "sanitize-html";

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ["h2", "h3", "p", "br", "strong", "em", "ul", "ol", "li", "blockquote", "a"],
  allowedAttributes: { a: ["href", "target", "rel"], ol: ["start"] },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowProtocolRelative: false,
  transformTags: {
    a: (tagName, attribs) => ({ tagName: "a", attribs: { ...attribs, rel: "noopener noreferrer" } }),
    ol: (tagName, attribs) => {
      const attributes: Record<string, string> = {};
      const start = attribs.start;
      if (start && /^[1-9]\d{0,2}$/.test(start)) attributes.start = start;
      return { tagName: "ol", attribs: attributes };
    },
  },
};

export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, SANITIZE_OPTIONS).trim();
}

export function htmlToPlainText(html: string): string {
  const spaced = html.replace(/<\/(p|h2|h3|li|blockquote|ul|ol)>|<br\s*\/?>/gi, " ");
  return sanitizeHtml(spaced, { allowedTags: [], allowedAttributes: {} }).replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}

const WORDS_PER_MINUTE = 200;

export function estimateReadingMinutes(plainText: string): number {
  const words = plainText === "" ? 0 : plainText.split(" ").length;
  return Math.min(120, Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)));
}
