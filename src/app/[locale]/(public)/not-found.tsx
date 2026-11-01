import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("common.notFound");

  return (
    <div className="mx-auto flex min-h-96 max-w-xl flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <p className="text-sm font-extrabold uppercase tracking-wider text-red-600">404</p>
      <h1 className="text-2xl font-extrabold text-charcoal">{t("title")}</h1>
      <p className="text-muted-foreground">{t("description")}</p>
      <Button asChild>
        <Link href="/">{t("backHome")}</Link>
      </Button>
    </div>
  );
}
