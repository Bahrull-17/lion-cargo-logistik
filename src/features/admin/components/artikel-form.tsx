"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState, useTransition, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveArticle } from "@/features/admin/actions/artikel-save";
import { uploadCoverImage } from "@/features/admin/actions/artikel-upload";
import { ContentEditor } from "@/features/admin/components/content-editor";
import { ARTICLE_CATEGORY_LABELS } from "@/features/admin/constants";
import type { ArticleFormValues, TranslationFormValues, TranslationStatus } from "@/features/admin/lib/artikel-form-values";
import { slugify } from "@/lib/slugify";
import { ARTICLE_CATEGORIES, ARTICLE_LOCALES, type ArticleLocale } from "@/types/artikel";

const MAX_COVER_BYTES = 5 * 1024 * 1024;

const LOCALE_LABEL: Record<ArticleLocale, string> = { id: "Indonesia", en: "English" };

const FIELD_CLASS =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

interface ArtikelFormProps {
  /** null = artikel baru. */
  articleId: string | null;
  initial: ArticleFormValues;
}

export function ArtikelForm({ articleId, initial }: ArtikelFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const [category, setCategory] = useState(initial.category);
  const [coverImageUrl, setCoverImageUrl] = useState(initial.coverImageUrl);
  const [values, setValues] = useState(initial.translations);
  const [activeTab, setActiveTab] = useState<ArticleLocale>("id");

  // Slug otomatis mengikuti judul, kecuali sudah pernah diubah manual / artikel sudah ada (URL tidak boleh berubah diam-diam).
  const [slugTouched, setSlugTouched] = useState<Record<ArticleLocale, boolean>>({
    id: initial.translations.id.slug !== "",
    en: initial.translations.en.slug !== "",
  });

  const isEdit = articleId !== null;
  const coverInputId = useId();
  const categoryId = useId();

  const updateTranslation = (locale: ArticleLocale, patch: Partial<TranslationFormValues>) => {
    setValues((prev) => ({ ...prev, [locale]: { ...prev[locale], ...patch } }));
  };

  const handleTitleChange = (locale: ArticleLocale, title: string) => {
    updateTranslation(locale, slugTouched[locale] ? { title } : { title, slug: slugify(title) });
  };

  const handleSlugChange = (locale: ArticleLocale, raw: string) => {
    setSlugTouched((prev) => ({ ...prev, [locale]: true }));
    updateTranslation(locale, { slug: raw.toLowerCase().replace(/[^a-z0-9-]+/g, "-") });
  };

  const handleCoverChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (file.size > MAX_COVER_BYTES) {
      setMessage({ ok: false, text: "Ukuran gambar maksimal 5 MB." });
      return;
    }

    setUploading(true);
    setMessage(null);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const result = await uploadCoverImage(formData);
      if (result.ok) {
        setCoverImageUrl(result.url);
      } else {
        setMessage({ ok: false, text: result.error });
      }
    } catch {
      setMessage({ ok: false, text: "Gagal mengunggah gambar. Periksa koneksi lalu coba lagi." });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending || uploading) return;
    setMessage(null);

    startTransition(async () => {
      const result = await saveArticle({
        articleId,
        category,
        coverImageUrl,
        translations: ARTICLE_LOCALES.map((locale) => ({ locale, ...values[locale] })),
      });

      if (!result.ok) {
        setMessage({ ok: false, text: result.error });
        return;
      }

      // Berhasil (artikel baru maupun hasil edit): kembali ke daftar artikel.
      router.push("/admin/artikel?saved=1");
    });
  };
  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-4xl px-4 pt-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold">{isEdit ? "Edit Artikel" : "Tulis Artikel"}</h1>
          <p className="text-xs text-muted-foreground">Isi minimal satu bahasa. Bahasa yang judulnya kosong tidak akan dibuat.</p>
        </div>
        <Link href="/admin/artikel" className="text-sm text-muted-foreground hover:text-foreground">
          ← Kembali
        </Link>
      </div>

      {/* Data umum */}
      <section className="rounded-xl border bg-background p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold">Pengaturan umum</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor={categoryId}>Kategori</Label>
            <select id={categoryId} value={category} onChange={(event) => setCategory(event.target.value as typeof category)} className={`${FIELD_CLASS} h-10`}>
              {ARTICLE_CATEGORIES.map((key) => (
                <option key={key} value={key}>
                  {ARTICLE_CATEGORY_LABELS[key]}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor={coverInputId}>Gambar sampul</Label>
            <input
              id={coverInputId}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleCoverChange}
              disabled={uploading}
              className="block w-full text-sm file:mr-3 file:rounded-md file:border file:bg-muted file:px-3 file:py-2 file:text-sm file:font-medium hover:file:bg-muted/70"
            />
            <p className="text-[11px] text-muted-foreground">JPG, PNG, WebP, atau AVIF. Maks. 5 MB. Disarankan rasio lebar (16:9).</p>
          </div>
        </div>

        {uploading ? <p className="mt-3 text-xs text-muted-foreground">Mengunggah gambar…</p> : null}

        {coverImageUrl ? (
          <div className="mt-3 flex items-start gap-3">
            <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg border bg-muted">
              <Image src={coverImageUrl} alt="Pratinjau gambar sampul" fill sizes="160px" className="object-cover" />
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => setCoverImageUrl(null)}>
              Hapus gambar
            </Button>
          </div>
        ) : null}
      </section>

      {/* Tab bahasa */}
      <div className="mt-4" role="tablist" aria-label="Bahasa artikel">
        <div className="flex gap-1 border-b">
          {ARTICLE_LOCALES.map((locale) => {
            const selected = activeTab === locale;
            const filled = values[locale].title.trim() !== "";
            return (
              <button
                key={locale}
                type="button"
                role="tab"
                id={`tab-${locale}`}
                aria-selected={selected}
                aria-controls={`panel-${locale}`}
                onClick={() => setActiveTab(locale)}
                className={`-mb-px flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${selected ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {LOCALE_LABEL[locale]}
                <span className={`size-2 rounded-full ${filled ? (values[locale].status === "published" ? "bg-green-500" : "bg-amber-500") : "bg-muted-foreground/30"}`} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>

      {ARTICLE_LOCALES.map((locale) => (
        <div key={locale} role="tabpanel" id={`panel-${locale}`} aria-labelledby={`tab-${locale}`} hidden={activeTab !== locale} className="mt-4">
          <TranslationFields locale={locale} value={values[locale]} onTitleChange={handleTitleChange} onSlugChange={handleSlugChange} onPatch={updateTranslation} />
        </div>
      ))}

      {/* Bilah aksi */}
      <div className="sticky bottom-0 z-10 -mx-4 mt-6 border-t bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            {message ? (
              <p role={message.ok ? "status" : "alert"} className={`text-xs font-medium ${message.ok ? "text-green-700" : "text-red-600"}`}>
                {message.text}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">Titik hijau = terbit, kuning = draft di tab bahasa.</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin/artikel" className="inline-flex h-10 items-center rounded-md border bg-background px-4 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">
              Batal
            </Link>
            <Button type="submit" disabled={pending || uploading} className="h-10 min-w-28">
              {pending ? "Menyimpan…" : "Simpan"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

interface TranslationFieldsProps {
  locale: ArticleLocale;
  value: TranslationFormValues;
  onTitleChange: (locale: ArticleLocale, title: string) => void;
  onSlugChange: (locale: ArticleLocale, slug: string) => void;
  onPatch: (locale: ArticleLocale, patch: Partial<TranslationFormValues>) => void;
}

function Counter({ current, max }: { current: number; max: number }) {
  return (
    <span className={`text-[11px] tabular-nums ${current > max ? "text-red-600" : "text-muted-foreground"}`}>
      {current}/{max}
    </span>
  );
}

function TranslationFields({ locale, value, onTitleChange, onSlugChange, onPatch }: TranslationFieldsProps) {
  const uid = useId();
  const field = (name: string) => `${uid}-${locale}-${name}`;

  return (
    <div className="space-y-4">
      <section className="space-y-4 rounded-xl border bg-background p-4 shadow-sm">
        <div className="space-y-1.5">
          <Label htmlFor={field("title")}>Judul</Label>
          <Input id={field("title")} value={value.title} maxLength={200} onChange={(event) => onTitleChange(locale, event.target.value)} placeholder={locale === "id" ? "Judul artikel" : "Article title"} autoComplete="off" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor={field("slug")}>Slug (alamat artikel)</Label>
          <Input
            id={field("slug")}
            value={value.slug}
            maxLength={120}
            onChange={(event) => onSlugChange(locale, event.target.value)}
            onBlur={() => onPatch(locale, { slug: slugify(value.slug, 120) })}
            placeholder="dibuat-otomatis-dari-judul"
            autoComplete="off"
            className="font-mono text-xs"
          />
          <p className="break-all text-[11px] text-muted-foreground">
            /{locale}/artikel/<span className="font-medium text-foreground">{value.slug || "…"}</span>
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor={field("excerpt")}>Ringkasan</Label>
            <Counter current={value.excerpt.length} max={400} />
          </div>
          <textarea
            id={field("excerpt")}
            value={value.excerpt}
            maxLength={400}
            rows={3}
            onChange={(event) => onPatch(locale, { excerpt: event.target.value })}
            placeholder="Ringkasan singkat yang tampil di daftar artikel"
            className={FIELD_CLASS}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor={field("author")}>Penulis</Label>
          <Input id={field("author")} value={value.authorName} maxLength={100} onChange={(event) => onPatch(locale, { authorName: event.target.value })} placeholder="Contoh: Tim Lion Cargo" autoComplete="off" />
        </div>
      </section>

      <section className="space-y-1.5 rounded-xl border bg-background p-4 shadow-sm">
        <Label htmlFor={field("content")}>Isi artikel</Label>
        <ContentEditor id={field("content")} label={`Isi artikel (${LOCALE_LABEL[locale]})`} value={value.contentHtml} onChange={(html) => onPatch(locale, { contentHtml: html })} />
      </section>

      <section className="space-y-4 rounded-xl border bg-background p-4 shadow-sm">
        <div>
          <h3 className="text-sm font-semibold">SEO (opsional)</h3>
          <p className="text-[11px] text-muted-foreground">Kosongkan untuk memakai judul dan ringkasan artikel.</p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor={field("metaTitle")}>Judul untuk Google</Label>
            <Counter current={value.metaTitle.length} max={120} />
          </div>
          <Input id={field("metaTitle")} value={value.metaTitle} maxLength={120} onChange={(event) => onPatch(locale, { metaTitle: event.target.value })} autoComplete="off" />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor={field("metaDescription")}>Deskripsi untuk Google</Label>
            <Counter current={value.metaDescription.length} max={320} />
          </div>
          <textarea id={field("metaDescription")} value={value.metaDescription} maxLength={320} rows={2} onChange={(event) => onPatch(locale, { metaDescription: event.target.value })} className={FIELD_CLASS} />
        </div>
      </section>

      <section className="rounded-xl border bg-background p-4 shadow-sm">
        <div className="space-y-1.5 sm:max-w-xs">
          <Label htmlFor={field("status")}>Status versi {LOCALE_LABEL[locale]}</Label>
          <select id={field("status")} value={value.status} onChange={(event) => onPatch(locale, { status: event.target.value as TranslationStatus })} className={`${FIELD_CLASS} h-10`}>
            <option value="draft">Draft (belum tampil di website)</option>
            <option value="published">Terbit (tampil di website)</option>
          </select>
        </div>
      </section>
    </div>
  );
}
