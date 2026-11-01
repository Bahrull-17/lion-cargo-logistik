# Perubahan Hasil Audit – Lion Cargo Logistik

Desain, layout, warna, tipografi, animasi, dan komponen UI **tidak diubah**. Yang berubah: metadata, schema, terjemahan, konfigurasi, kode mati, dan gambar (dikompres).

## Cara memasang
1. Salin isi zip ini ke proyek (timpa file yang sama). `.env.local` TIDAK ikut zip.
2. Hapus file lama yang sudah tidak dipakai: lihat bagian "Dihapus".
3. `npm install` lalu `npm run lint && npm run typecheck && npm run build` (pakai env Supabase asli).
4. Tambahkan ke `.gitignore`: `.open-next`, `.wrangler`, `cloudflare-env.d.ts`.

## SEO & Metadata
- Canonical, hreflang (id/en/x-default), Open Graph, dan Twitter Card kini dibuat per halaman lewat satu helper: `src/lib/seo/metadata.ts`. Sebelumnya `/tentang-kami` & `/kontak` mewarisi canonical beranda.
- Title/description semua halaman ada di `messages/*/pages/*.json` (key `meta`), bilingual, tanpa duplikasi merek ("| Lion Cargo Logistik" ditambahkan template).
- Beranda kini punya title/description sendiri (memuat kata kunci).
- Sitemap: memuat artikel terbit + hreflang; tanpa `lastModified` palsu untuk halaman statis.
- robots.txt: tidak lagi memblokir `/_next/`.

## Structured data (JSON-LD)
- Satu entitas `Organization + LocalBusiness` (sebelumnya dua entitas duplikat) + `WebSite`, global.
- `Service` hanya di /layanan (sesuai bahasa), `FAQPage` di /faq, `Article` di detail artikel, `BreadcrumbList` di semua halaman dalam.
- JSON-LD di-escape agar aman (`src/lib/seo/json-ld.tsx`).

## Konten & i18n
- Halaman Kontak sepenuhnya bilingual (`contact.json` baru); link "Beranda" kini menjaga bahasa.
- Klaim tracking dihapus: statistik "Layanan Tracking" → "Operasional 24 Jam"; FAQ & meta tidak lagi menyebut "cek resi".
- "113 kota" → "lebih dari 100 kota" (angka tidak basi saat tarif berubah).
- Bagian "Bagaimana Paket Anda Diproses?" dan ±12 teks alt/aria-label kini diterjemahkan.
- Email: satu sumber, `siteConfig.contact.email` (gmail). Ganti di satu tempat saat email bisnis siap.

## Form kontak
- Validasi nomor telepon, batas panjang, label terhubung ke input (aksesibilitas), pesan WhatsApp sesuai bahasa, status "terkirim" hanya bila WhatsApp benar-benar terbuka.

## Error handling
- `not-found.tsx` & `error.tsx` untuk halaman publik, `global-error.tsx`.

## Kode & dependency
- Dihapus: `components/ui/{accordion,dialog,badge,sonner,card,table,select}.tsx`, `lib/schema/local-business.ts`; dependency `next-themes`, `sonner`.
- `getDestinations`/`getAllDestinations` kini berbagi satu query.
- `config/seo.ts` hanya berisi path + pengaturan sitemap (tidak ada lagi duplikasi judul).
- Suspense ganda di layout publik dirapikan. Font Google dipindah dari `@import` CSS ke `<link>` + preconnect.
- ESLint & tsconfig mengabaikan `.open-next` (sebelumnya ESLint kehabisan memori setelah build Cloudflare).

## Performa & keamanan
- 5 PNG berat → WebP (2,87 MB → 1,01 MB). Hapus PNG lamanya: `public/images/layanan/{express,tarif,penyerahan}.png`, `public/images/tentang-kami/amanah.png`, `public/images/cek-ongkir/banner-tarif.png`.
- Security header ditambahkan di `next.config.ts` (HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy). CSP belum (perlu pengujian terpisah).

## Cloudflare
- Ditambahkan: `wrangler.jsonc`, `open-next.config.ts`, script `preview`/`deploy`, dependency `@opennextjs/cloudflare` & `wrangler`.
- Hasil uji: build OpenNext berhasil; ukuran Worker 2,33 MiB (gzip).
- `routes` domain sengaja dikomentari. Aktifkan setelah DNS siap (lihat di bawah).

## Yang harus Anda lakukan sendiri
1. Kirim hasil `pg_policies` (RLS) untuk dicek.
2. Pindah DNS ke Cloudflare: SALIN dulu semua record Hostinger (MX, SPF/TXT, DKIM, autodiscover), set status "DNS only", uji email, baru ganti nameserver.
3. Cocokkan koordinat peta: schema memakai -6.1252,106.6626 sedangkan embed peta memakai -6.1327,106.6509. Alamat di footer/schema ("Gedung RA Gatrans…") juga berbeda dengan halaman Kontak ("Area Terminal Kargo Domestik… Pajang, Benda"). Samakan agar konsisten di Google.
4. Angka di beranda (99%, 249+, 43+) dan ulasan di bagian testimoni harus data nyata.
5. Isi `seoConfig.sameAs` (Google Business Profile, Instagram) dan daftarkan ke Google Search Console.
