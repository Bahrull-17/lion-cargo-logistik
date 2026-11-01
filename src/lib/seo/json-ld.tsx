type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

/** Menyisipkan JSON-LD. "<" di-escape agar isi data tidak bisa menutup tag <script>. */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
