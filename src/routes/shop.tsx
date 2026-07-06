import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { instruments } from "@/data/instruments";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal, RevealStagger, revealItem } from "@/components/site/Reveal";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop · Đức Ngân" },
      {
        name: "description",
        content:
          "Browse handcrafted Vietnamese traditional instruments — Đàn Tranh, Đàn Bầu, Đàn Tỳ Bà, Đàn Nguyệt and more.",
      },
      { property: "og:title", content: "Shop · Đức Ngân" },
      {
        property: "og:description",
        content: "The full Đức Ngân collection of handcrafted instruments.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { t } = useTranslation();

  const categoryOptions = [
    { key: "zither", value: "Zither", label: t("shop.filters.zither") },
    { key: "lute", value: "Lute", label: t("shop.filters.lute") },
    { key: "monochord", value: "Monochord", label: t("shop.filters.monochord") },
    { key: "moon", value: "Moon Lute", label: t("shop.filters.moon") },
  ];
  const priceOptions = [
    { key: "any", label: t("shop.panel.priceAny"), range: [0, Infinity] as [number, number] },
    { key: "u10", label: t("shop.panel.priceUnder10"), range: [0, 10_000_000] as [number, number] },
    { key: "10-20", label: t("shop.panel.price10to20"), range: [10_000_000, 20_000_000] as [number, number] },
    { key: "20-30", label: t("shop.panel.price20to30"), range: [20_000_000, 30_000_000] as [number, number] },
    { key: "o30", label: t("shop.panel.priceOver30"), range: [30_000_000, Infinity] as [number, number] },
  ];
  const ratingOptions = [
    { key: "any", label: t("shop.panel.priceAny"), min: 0 },
    { key: "45", label: t("shop.panel.rating45"), min: 4.5 },
    { key: "48", label: t("shop.panel.rating48"), min: 4.8 },
  ];
  const sortOptions = [
    { key: "curated", label: t("shop.sorts.curated") },
    { key: "newest", label: t("shop.sorts.newest") },
    { key: "asc", label: t("shop.sorts.asc") },
    { key: "desc", label: t("shop.sorts.desc") },
  ];

  const [query, setQuery] = useState("");
  const [cats, setCats] = useState<string[]>([]);
  const [priceKey, setPriceKey] = useState("any");
  const [ratingKey, setRatingKey] = useState("any");
  const [sortKey, setSortKey] = useState("curated");
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCat = (v: string) =>
    setCats((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  const clear = () => {
    setQuery("");
    setCats([]);
    setPriceKey("any");
    setRatingKey("any");
    setSortKey("curated");
  };
  const activeCount =
    (query ? 1 : 0) + cats.length + (priceKey !== "any" ? 1 : 0) + (ratingKey !== "any" ? 1 : 0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const price = priceOptions.find((p) => p.key === priceKey)!.range;
    const rating = ratingOptions.find((r) => r.key === ratingKey)!.min;
    let list = instruments.filter((it) => {
      if (cats.length && !cats.includes(it.category)) return false;
      if (it.price < price[0] || it.price > price[1]) return false;
      if (it.rating < rating) return false;
      if (q) {
        const hay = (
          it.name +
          " " +
          it.category +
          " " +
          it.tagline +
          " " +
          it.description +
          " " +
          it.materials.join(" ")
        ).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (sortKey === "asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sortKey === "desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sortKey === "newest") list = [...list].reverse();
    return list;
  }, [query, cats, priceKey, ratingKey, sortKey]);

  return (
    <div className="pt-36 pb-24">
      <div className="container-wide">
        <Reveal>
          <div className="eyebrow">{t("shop.eyebrow")}</div>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] text-walnut-deep md:text-7xl">
            {t("shop.title1")}
            <br />
            {t("shop.title2")}
          </h1>
          <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-ink/70">
            {t("shop.body")}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-line pt-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <FilterPanel
                t={t}
                query={query}
                setQuery={setQuery}
                cats={cats}
                toggleCat={toggleCat}
                priceKey={priceKey}
                setPriceKey={setPriceKey}
                ratingKey={ratingKey}
                setRatingKey={setRatingKey}
                categoryOptions={categoryOptions}
                priceOptions={priceOptions}
                ratingOptions={ratingOptions}
                activeCount={activeCount}
                clear={clear}
              />
            </div>
          </aside>

          <div>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs tracking-[0.18em] text-ink/60 uppercase">
                {t("shop.panel.resultsOther", { count: results.length })}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMobileOpen(true)}
                  className="relative inline-flex items-center gap-2 rounded-xs border border-line px-4 py-2 text-xs tracking-wide text-walnut-deep transition hover:border-walnut lg:hidden"
                >
                  <SlidersHorizontal className="size-4" />
                  {t("shop.panel.openFilters")}
                  {activeCount > 0 && (
                    <span className="grid size-5 place-items-center rounded-full bg-walnut text-[10px] font-medium text-white">
                      {activeCount}
                    </span>
                  )}
                </button>
                <label className="flex items-center gap-3 text-xs tracking-wide text-ink/60 uppercase">
                  {t("shop.sort")}
                  <select
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value)}
                    className="rounded-xs border border-line bg-white px-4 py-2 text-xs text-walnut-deep focus:border-walnut focus:outline-none"
                  >
                    {sortOptions.map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            {/* Active chips */}
            {(cats.length > 0 || priceKey !== "any" || ratingKey !== "any" || query) && (
              <div className="mt-5 flex flex-wrap gap-2">
                {query && (
                  <Chip onRemove={() => setQuery("")}>“{query}”</Chip>
                )}
                {cats.map((c) => {
                  const opt = categoryOptions.find((o) => o.value === c);
                  return (
                    <Chip key={c} onRemove={() => toggleCat(c)}>
                      {opt?.label ?? c}
                    </Chip>
                  );
                })}
                {priceKey !== "any" && (
                  <Chip onRemove={() => setPriceKey("any")}>
                    {priceOptions.find((p) => p.key === priceKey)?.label}
                  </Chip>
                )}
                {ratingKey !== "any" && (
                  <Chip onRemove={() => setRatingKey("any")}>
                    {ratingOptions.find((r) => r.key === ratingKey)?.label}
                  </Chip>
                )}
              </div>
            )}

            {results.length === 0 ? (
              <div className="mt-20 rounded-xs border border-dashed border-line py-20 text-center text-sm text-ink/60">
                {t("shop.panel.empty")}
              </div>
            ) : (
              <RevealStagger className="mt-10 grid gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((i) => (
                  <motion.div key={i.slug} variants={revealItem}>
                    <ProductCard item={i} />
                  </motion.div>
                ))}
              </RevealStagger>
            )}
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <div
              className="absolute inset-0 bg-walnut-deep/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute inset-y-0 right-0 w-full max-w-sm overflow-y-auto bg-paper p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="font-display text-xl text-walnut-deep">
                  {t("shop.panel.title")}
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label={t("shop.panel.closeFilters")}
                  className="grid size-9 place-items-center rounded-xs text-ink/70 hover:bg-line/50"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="mt-6">
                <FilterPanel
                  t={t}
                  query={query}
                  setQuery={setQuery}
                  cats={cats}
                  toggleCat={toggleCat}
                  priceKey={priceKey}
                  setPriceKey={setPriceKey}
                  ratingKey={ratingKey}
                  setRatingKey={setRatingKey}
                  categoryOptions={categoryOptions}
                  priceOptions={priceOptions}
                  ratingOptions={ratingOptions}
                  activeCount={activeCount}
                  clear={clear}
                  compact
                />
                {activeCount > 0 && (
                  <button
                    onClick={clear}
                    className="mt-4 w-full rounded-xs border border-line bg-white px-5 py-2.5 text-sm text-walnut-deep transition hover:border-walnut"
                  >
                    {t("shop.panel.clear")}
                  </button>
                )}
                <button
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 w-full rounded-xs bg-walnut px-5 py-3 text-sm text-white transition hover:bg-walnut-deep"
                >
                  {t("shop.panel.apply")} · {t("shop.panel.resultsOther", { count: results.length })}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type PanelProps = {
  t: ReturnType<typeof useTranslation>["t"];
  query: string;
  setQuery: (v: string) => void;
  cats: string[];
  toggleCat: (v: string) => void;
  priceKey: string;
  setPriceKey: (v: string) => void;
  ratingKey: string;
  setRatingKey: (v: string) => void;
  categoryOptions: { key: string; value: string; label: string }[];
  priceOptions: { key: string; label: string }[];
  ratingOptions: { key: string; label: string }[];
  activeCount: number;
  clear: () => void;
  compact?: boolean;
};

function FilterPanel({
  t,
  query,
  setQuery,
  cats,
  toggleCat,
  priceKey,
  setPriceKey,
  ratingKey,
  setRatingKey,
  categoryOptions,
  priceOptions,
  ratingOptions,
  activeCount,
  clear,
  compact,
}: PanelProps) {
  return (
    <div className="space-y-8">
      {!compact && (
        <div className="flex items-center justify-between">
          <div className="font-display text-lg text-walnut-deep">
            {t("shop.panel.title")}
          </div>
          {activeCount > 0 && (
            <button
              onClick={clear}
              className="text-[11px] tracking-[0.18em] text-walnut uppercase hover:underline"
            >
              {t("shop.panel.clear")}
            </button>
          )}
        </div>
      )}

      <FilterGroup label={t("shop.panel.search")}>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("shop.panel.searchPlaceholder")}
            className="w-full rounded-xs border border-line bg-white py-2.5 pr-3 pl-9 text-sm text-walnut-deep placeholder:text-ink/40 focus:border-walnut focus:outline-none"
          />
        </div>
      </FilterGroup>

      <FilterGroup label={t("shop.panel.category")}>
        <div className="space-y-2">
          {categoryOptions.map((c) => {
            const checked = cats.includes(c.value);
            return (
              <button
                key={c.key}
                onClick={() => toggleCat(c.value)}
                className="group flex w-full items-center gap-3 text-left"
              >
                <span
                  className={cn(
                    "grid size-4 shrink-0 place-items-center rounded-[3px] border transition-colors",
                    checked
                      ? "border-walnut bg-walnut text-white"
                      : "border-line group-hover:border-walnut",
                  )}
                >
                  {checked && (
                    <svg viewBox="0 0 12 12" className="size-2.5" fill="none">
                      <path
                        d="M2 6.5L5 9.5L10 3.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span
                  className={cn(
                    "text-sm transition-colors",
                    checked ? "text-walnut-deep" : "text-ink/75 group-hover:text-walnut-deep",
                  )}
                >
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup label={t("shop.panel.price")}>
        <RadioList
          name="price"
          value={priceKey}
          onChange={setPriceKey}
          options={priceOptions}
        />
      </FilterGroup>

      <FilterGroup label={t("shop.panel.rating")}>
        <RadioList
          name="rating"
          value={ratingKey}
          onChange={setRatingKey}
          options={ratingOptions}
        />
      </FilterGroup>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 text-[11px] font-medium tracking-[0.22em] text-ink/50 uppercase">
        {label}
      </div>
      {children}
    </div>
  );
}

function RadioList({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { key: string; label: string }[];
}) {
  return (
    <div className="space-y-2">
      {options.map((o) => {
        const active = value === o.key;
        return (
          <label key={o.key} className="group flex cursor-pointer items-center gap-3">
            <span
              className={cn(
                "grid size-4 shrink-0 place-items-center rounded-full border transition-colors",
                active ? "border-walnut" : "border-line group-hover:border-walnut",
              )}
            >
              {active && <span className="size-2 rounded-full bg-walnut" />}
            </span>
            <input
              type="radio"
              name={name}
              value={o.key}
              checked={active}
              onChange={() => onChange(o.key)}
              className="sr-only"
            />
            <span
              className={cn(
                "text-sm transition-colors",
                active ? "text-walnut-deep" : "text-ink/75 group-hover:text-walnut-deep",
              )}
            >
              {o.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}

function Chip({
  children,
  onRemove,
}: {
  children: React.ReactNode;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-walnut/25 bg-walnut/5 px-3 py-1 text-xs text-walnut-deep">
      {children}
      <button
        onClick={onRemove}
        className="grid size-4 place-items-center rounded-full text-walnut/70 hover:bg-walnut hover:text-white"
        aria-label="remove"
      >
        <X className="size-3" />
      </button>
    </span>
  );
}
