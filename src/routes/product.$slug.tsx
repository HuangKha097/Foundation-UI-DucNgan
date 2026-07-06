import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Minus, Plus, Star, Check } from "lucide-react";
import { toast } from "sonner";
import {
  formatPrice,
  getInstrument,
  instruments,
} from "@/data/instruments";
import { Waveform } from "@/components/site/Waveform";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal, RevealStagger, revealItem } from "@/components/site/Reveal";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const item = getInstrument(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [
          { title: "Instrument not found · Đức Ngân" },
          { name: "robots", content: "noindex" },
        ],
      };
    const i = loaderData.item;
    return {
      meta: [
        { title: `${i.name} · Đức Ngân` },
        { name: "description", content: i.description },
        { property: "og:title", content: `${i.name} · Đức Ngân` },
        { property: "og:description", content: i.tagline },
        { property: "og:type", content: "product" },
      ],
    };
  },
  component: Product,
  notFoundComponent: NotFound,
});

function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="container-wide pt-40 pb-24 text-center">
      <div className="eyebrow">{t("product.notFoundEyebrow")}</div>
      <h1 className="mt-4 font-display text-4xl text-walnut-deep">
        {t("product.notFoundTitle")}
      </h1>
      <Link
        to="/shop"
        className="mt-6 inline-block text-sm text-walnut hover:text-walnut-deep"
      >
        {t("product.backToShop")}
      </Link>
    </div>
  );
}

function Product() {
  const { t } = useTranslation();
  const { item } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const { addItem, open: openCart } = useCart();

  const handleAdd = (n = qty) => {
    addItem(
      {
        slug: item.slug,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
      },
      n,
    );
    toast.success(t("product.addedToast", { name: item.name }), {
      description: `${n} × ${formatPrice(item.price)}`,
    });
    openCart();
  };

  const gallery = [item.hero, item.image, item.image];
  const related = instruments.filter((i) => i.slug !== item.slug).slice(0, 4);

  return (
    <div className="pt-28 pb-32">
      <div className="container-wide">
        <nav className="mb-10 flex items-center gap-2 text-xs tracking-wide text-ink/55 uppercase">
          <Link to="/shop" className="hover:text-walnut">
            {t("product.breadcrumbShop")}
          </Link>
          <span>/</span>
          <span className="text-walnut">{item.name}</span>
        </nav>

        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Gallery */}
          <div className="md:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xs bg-secondary">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={gallery[active]}
                  alt={item.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
            <div className="mt-5 flex gap-3">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={
                    "relative aspect-square w-20 overflow-hidden rounded-xs bg-secondary transition " +
                    (active === i
                      ? "ring-2 ring-walnut ring-offset-2 ring-offset-paper"
                      : "opacity-70 hover:opacity-100")
                  }
                >
                  <img src={g} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <div className="eyebrow">{item.category}</div>
              <h1 className="mt-4 font-display text-5xl leading-[1] text-walnut-deep md:text-6xl">
                {item.name}
              </h1>
              <p className="mt-4 font-display text-xl text-walnut">{item.tagline}</p>

              <div className="mt-8 flex items-center gap-4">
                <div className="font-display text-3xl text-walnut-deep">
                  {formatPrice(item.price)}
                </div>
                <div className="flex items-center gap-1 text-sm text-ink/60 tabular-nums">
                  <Star className="size-4 fill-bamboo text-bamboo" />
                  {item.rating.toFixed(1)}
                  <span className="text-ink/40">{t("product.reviews", { count: item.reviews })}</span>
                </div>
              </div>

              <p className="mt-8 text-[15px] leading-relaxed text-ink/70">
                {item.description}
              </p>

              <div className="mt-8">
                <Waveform title={`${item.name} ${t("product.sampleSuffix")}`} duration="00:52" />
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 rounded-xs border border-line bg-white p-1.5">
                  <button
                    aria-label={t("cart.decrease")}
                    className="grid size-9 place-items-center rounded-xs text-walnut-deep transition hover:bg-secondary"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-6 text-center text-sm tabular-nums">{qty}</span>
                  <button
                    aria-label={t("cart.increase")}
                    className="grid size-9 place-items-center rounded-xs text-walnut-deep transition hover:bg-secondary"
                    onClick={() => setQty((q) => q + 1)}
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <button
                  onClick={() => handleAdd()}
                  className="group inline-flex items-center gap-3 rounded-xs bg-walnut px-7 py-3.5 text-sm font-medium text-white transition hover:bg-walnut-deep"
                >
                  {t("product.addToCart")}
                  <ShoppingBag className="size-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <button
                  aria-label={t("product.wishlist")}
                  className="grid size-12 place-items-center rounded-xs border border-line text-walnut transition hover:bg-white"
                >
                  <Heart className="size-4" />
                </button>
              </div>

              <ul className="mt-10 space-y-3 border-t border-line pt-8 text-sm text-ink/70">
                <li className="flex items-center gap-3">
                  <Check className="size-4 text-walnut" /> {t("product.freeDelivery")}
                </li>
                <li className="flex items-center gap-3">
                  <Check className="size-4 text-walnut" /> {t("product.handVoiced")}
                </li>
                <li className="flex items-center gap-3">
                  <Check className="size-4 text-walnut" /> {t("product.lifetimeService")}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="mt-32 grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <div className="eyebrow">{t("product.materialsEyebrow")}</div>
            <h2 className="mt-4 font-display text-3xl text-walnut-deep whitespace-pre-line">
              {t("product.materialsTitle")}
            </h2>
          </Reveal>
          <ul className="space-y-4 md:col-span-8">
            {item.materials.map((m: string) => (
              <li
                key={m}
                className="flex items-baseline justify-between border-b border-line pb-4 text-[15px]"
              >
                <span className="text-walnut-deep">{m}</span>
                <span className="text-ink/50">·</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-32 grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <div className="eyebrow">{t("product.specsEyebrow")}</div>
            <h2 className="mt-4 font-display text-3xl text-walnut-deep whitespace-pre-line">
              {t("product.specsTitle")}
            </h2>
          </Reveal>
          <dl className="grid gap-y-4 md:col-span-8 md:grid-cols-2 md:gap-x-16">
            {(Object.entries(item.specs) as [string, string][]).map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between border-b border-line pb-4">
                <dt className="text-xs tracking-[0.2em] text-ink/55 uppercase">{k}</dt>
                <dd className="text-[15px] text-walnut-deep">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-32 grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <div className="eyebrow">{t("product.processEyebrow")}</div>
            <h2 className="mt-4 font-display text-3xl text-walnut-deep whitespace-pre-line">
              {t("product.processTitle")}
            </h2>
          </Reveal>
          <RevealStagger className="space-y-6 md:col-span-8">
            {item.process.map((p: string, i: number) => (
              <motion.div
                key={i}
                variants={revealItem}
                className="flex gap-6 border-b border-line pb-6"
              >
                <div className="font-display text-2xl text-walnut">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="pt-1 text-[15px] leading-relaxed text-ink/75">{p}</p>
              </motion.div>
            ))}
          </RevealStagger>
        </div>

        <div className="mt-40">
          <div className="flex items-end justify-between">
            <Reveal>
              <div className="eyebrow">{t("product.relatedEyebrow")}</div>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] text-walnut-deep md:text-5xl">
                {t("product.relatedTitle")}
              </h2>
            </Reveal>
            <Link to="/shop" className="text-sm text-walnut hover:text-walnut-deep">
              {t("product.allInstruments")}
            </Link>
          </div>
          <RevealStagger className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <motion.div key={r.slug} variants={revealItem}>
                <ProductCard item={r} />
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate font-display text-lg text-walnut-deep">{item.name}</div>
            <div className="text-xs text-ink/60">{formatPrice(item.price)}</div>
          </div>
          <button
            onClick={() => handleAdd(1)}
            className="inline-flex items-center gap-2 rounded-xs bg-walnut px-5 py-3 text-sm font-medium text-white"
          >
            {t("product.addToCart")}
            <ShoppingBag className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
