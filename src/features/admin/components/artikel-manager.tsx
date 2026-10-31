"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ExternalLink, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteArticle, setArticleFeatured, setTranslationStatus, type ArtikelActionResult } from "@/features/admin/actions/artikel";
import { ARTICLE_CATEGORY_LABELS } from "@/features/admin/constants";
import type { ArticleCategory, ArticleLocale } from "@/types/artikel";

export interface AdminArticleTranslation {
  id: string;
  locale: ArticleLocale;
  slug: string;
  title: string;
  status: "draft" | "published";
}

export interface AdminArticle {
  id: string;
  category: ArticleCategory;
  isFeatured: boolean;
  createdAt: string;
  translations: AdminArticleTranslation[];
}

const LOCALES: ArticleLocale[] = ["id", "en"];
const dateTime = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeZone: "Asia/Jakarta" });

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : dateTime.format(date);
}

export function ArtikelManager({ items }: { items: AdminArticle[] }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-10 pt-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold">Artikel</h1>
          <p className="text-xs text-muted-foreground">{items.length} artikel · Perubahan langsung tampil di website</p>
        </div>
        <Link href="/admin/artikel/baru" className="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs hover:bg-primary/90">
          + Tulis Artikel
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="mt-8 text-center text-sm text-muted-foreground">Belum ada artikel. Klik “Tulis Artikel” untuk membuat yang pertama.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id}>
              <ArticleRow item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: "draft" | "published" }) {
  return status === "published" ? <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">Terbit</span> : <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">Draft</span>;
}

function ArticleRow({ item }: { item: AdminArticle }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const primary = item.translations.find((tr) => tr.locale === "id") ?? item.translations[0];
  const heading = primary?.title.trim() ? primary.title : "(Tanpa judul)";

  const run = (action: () => Promise<ArtikelActionResult>, successText: string) => {
    if (pending) return;
    startTransition(async () => {
      const result = await action();
      if (result.ok) {
        setMessage({ ok: true, text: successText });
        setConfirmDelete(false);
        router.refresh();
      } else {
        setMessage({ ok: false, text: result.error });
      }
    });
  };

  return (
    <div className="rounded-xl border bg-background p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold leading-tight">{heading}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {ARTICLE_CATEGORY_LABELS[item.category]} · Dibuat {formatDate(item.createdAt)}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link href={`/admin/artikel/${item.id}`} className="inline-flex h-8 items-center rounded-md border bg-background px-3 text-xs font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">
            Edit
          </Link>
          <Button
            type="button"
            size="sm"
            variant={item.isFeatured ? "default" : "outline"}
            disabled={pending}
            onClick={() => run(() => setArticleFeatured({ articleId: item.id, featured: !item.isFeatured }), item.isFeatured ? "Tanda unggulan dicabut." : "Dijadikan artikel unggulan.")}
          >
            <Star className="size-4" aria-hidden="true" />
            {item.isFeatured ? "Unggulan" : "Jadikan Unggulan"}
          </Button>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {LOCALES.map((locale) => {
          const tr = item.translations.find((entry) => entry.locale === locale);
          return (
            <div key={locale} className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2">
              <span className="w-6 text-xs font-bold">{locale.toUpperCase()}</span>
              {tr ? (
                <>
                  <StatusBadge status={tr.status} />
                  <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">{tr.title || "(Tanpa judul)"}</span>
                  {tr.status === "published" ? (
                    <a href={`/${locale}/artikel/${tr.slug}`} target="_blank" rel="noopener noreferrer" aria-label={`Lihat versi ${locale.toUpperCase()} di website`} className="text-muted-foreground hover:text-foreground">
                      <ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  ) : null}
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={pending}
                    onClick={() =>
                      run(
                        () => setTranslationStatus({ translationId: tr.id, status: tr.status === "published" ? "draft" : "published" }),
                        tr.status === "published" ? "Dijadikan draft. Artikel tidak tampil lagi di website." : "Diterbitkan. Artikel sudah tampil di website.",
                      )
                    }
                  >
                    {tr.status === "published" ? "Jadikan Draft" : "Terbitkan"}
                  </Button>
                </>
              ) : (
                <span className="text-xs text-muted-foreground">Belum ditulis</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {confirmDelete ? (
          <>
            <span className="text-xs font-medium text-red-600">Hapus artikel ini beserta semua bahasanya? Tidak bisa dibatalkan.</span>
            <Button type="button" size="sm" variant="destructive" disabled={pending} onClick={() => run(() => deleteArticle({ articleId: item.id }), "Artikel dihapus.")}>
              {pending ? "Menghapus…" : "Ya, hapus"}
            </Button>
            <Button type="button" size="sm" variant="outline" disabled={pending} onClick={() => setConfirmDelete(false)}>
              Batal
            </Button>
          </>
        ) : (
          <Button type="button" size="sm" variant="ghost" disabled={pending} onClick={() => setConfirmDelete(true)} className="text-red-600 hover:text-red-700">
            <Trash2 className="size-4" aria-hidden="true" />
            Hapus
          </Button>
        )}
      </div>

      {message ? (
        <p role="status" className={`mt-2 text-xs font-medium ${message.ok ? "text-green-700" : "text-red-600"}`}>
          {message.text}
        </p>
      ) : null}
    </div>
  );
}
