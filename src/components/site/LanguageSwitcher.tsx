import { useTranslation } from "react-i18next";
import { setLang } from "@/i18n";
import type { Lang } from "@/i18n/resources";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  className,
  compact,
  scrolled,
}: {
  className?: string;
  compact?: boolean;
  scrolled?: boolean;
}) {
  const { i18n, t } = useTranslation();
  const current = (i18n.language as Lang) === "en" ? "en" : "vi";

  if (compact) {
    const next = current === "vi" ? "en" : "vi";
    return (
      <button
        type="button"
        aria-label={t("nav.language")}
        onClick={() => setLang(next)}
        className={cn(
          "grid h-7 min-w-[30px] place-items-center rounded-xs border px-2 text-[10px] font-medium tracking-[0.18em] uppercase backdrop-blur-sm transition-colors",
          scrolled
            ? "border-line/70 bg-white/40 text-walnut hover:bg-white/70"
            : "border-paper/30 bg-black/20 text-paper hover:bg-white/20",
          className,
        )}
      >
        {current}
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label={t("nav.language")}
      className={cn(
        "ml-1 flex items-center gap-0.5 rounded-xs border p-0.5 text-[10px] font-medium tracking-[0.18em] uppercase backdrop-blur-sm",
        scrolled
          ? "border-line/70 bg-white/40"
          : "border-paper/30 bg-black/20",
        className,
      )}
    >
      {(["vi", "en"] as const).map((lng) => {
        const active = current === lng;
        return (
          <button
            key={lng}
            type="button"
            aria-pressed={active}
            onClick={() => setLang(lng)}
            className={cn(
              "grid h-7 min-w-[30px] place-items-center rounded-xs px-2 transition-colors",
              active
                ? scrolled
                  ? "bg-walnut text-white"
                  : "bg-paper text-walnut-deep"
                : scrolled
                  ? "text-ink/60 hover:text-walnut-deep"
                  : "text-paper/70 hover:text-paper",
            )}
          >
            {lng}
          </button>
        );
      })}
    </div>
  );
}