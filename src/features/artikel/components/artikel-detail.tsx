import Image from "next/image";
import { getFormatter, getTranslations } from "next-intl/server";
import { ChevronRight, Calendar, Clock, User, MessageCircle, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { waLink } from "@/lib/wa-link";
import type { ArticleDetail } from "@/types/artikel";

interface ArtikelDetailViewProps {
  article: ArticleDetail;
  locale: string;
}

export async function ArtikelDetailView({ article, locale }: ArtikelDetailViewProps) {
  const t = await getTranslations({ locale, namespace: "pages.article" });
  const format = await getFormatter({ locale });

  const dateLabel = format.dateTime(new Date(article.publishedAt), {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });

  return (
    <article className="bg-slate-50 text-slate-800 min-h-screen pb-16">
      <section className="bg-white border-b border-slate-200/80 pt-6 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-6">
            <Link href="/" className="hover:text-red-600 transition-colors">
              {t("detail.breadcrumb.home")}
            </Link>
            <ChevronRight className="size-3.5 text-slate-400" />
            <Link href="/artikel" className="hover:text-red-600 transition-colors">
              {t("detail.breadcrumb.articles")}
            </Link>
            <ChevronRight className="size-3.5 text-slate-400" />
            <span className="text-red-600 font-bold truncate max-w-50 sm:max-w-xs">{article.title}</span>
          </nav>

          <Link href="/artikel" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-red-600 transition-colors mb-4">
            <ArrowLeft className="size-4" />
            <span>{t("detail.back")}</span>
          </Link>

          <div className="space-y-4">
            <span className="inline-block bg-red-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-lg tracking-wider">{t(`list.filters.${article.category}`)}</span>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight">{article.title}</h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-slate-500 pt-2 border-t border-slate-100">
              {article.authorName && (
                <span className="flex items-center gap-1.5">
                  <User className="size-4 text-red-600" />
                  {article.authorName}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4 text-red-600" />
                <time dateTime={article.publishedAt}>{dateLabel}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4 text-red-600" />
                {t("list.readingTime", { minutes: article.readingMinutes })}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        {article.coverImageUrl && (
          <div className="relative h-62.5 sm:h-105 rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 mb-8 bg-slate-100">
            <Image src={article.coverImageUrl} alt={article.title} fill priority sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
          </div>
        )}

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs">
          <div
            className="prose prose-slate max-w-none text-slate-700 leading-relaxed prose-headings:font-black prose-headings:text-slate-900 prose-a:text-red-600 prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

          <div className="mt-10 p-6 sm:p-8 bg-linear-to-r from-red-600 to-red-700 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-red-600/20">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-lg font-black tracking-tight">{t("detail.ctaTitle")}</h3>
              <p className="text-xs text-white">{t("detail.ctaDescription")}</p>
            </div>
            <a
              href={waLink(t("detail.whatsappMessage", { title: article.title }))}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-red-50 text-red-600 rounded-2xl font-extrabold text-xs transition-all shadow-md"
            >
              <MessageCircle className="size-4" />
              <span>{t("detail.ctaButton")}</span>
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
