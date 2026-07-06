import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/instruments";
import { useTranslation } from "react-i18next";

export function CartDrawer() {
  const { isOpen, close, items, subtotal, updateQty, removeItem, count } = useCart();
  const { t } = useTranslation();

  // Lock body scroll while open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  // Esc to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80]">
          {/* Backdrop */}
          <motion.button
            aria-label="Close cart"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 bg-walnut-deep/40 backdrop-blur-[2px]"
          />

          {/* Panel */}
          <motion.aside
            role="dialog"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 right-0 flex h-full w-full max-w-[460px] flex-col bg-paper shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <div>
                <div className="text-[10px] font-medium tracking-[0.28em] text-walnut uppercase">
                  {t("cart.eyebrow")}
                </div>
                <div className="mt-1 font-display text-2xl text-walnut-deep">
                  {t("cart.count", { count })}
                </div>
              </div>
              <button
                aria-label={t("cart.close")}
                onClick={close}
                className="grid size-10 place-items-center rounded-xs text-walnut-deep transition hover:bg-line/60"
              >
                <X className="size-4.5" />
              </button>
            </div>

            {/* Body */}
            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="grid size-16 place-items-center rounded-full border border-line text-walnut">
                  <ShoppingBag className="size-6" />
                </div>
                <div className="font-display text-2xl text-walnut-deep">
                  {t("cart.empty")}
                </div>
                <p className="max-w-xs text-sm text-ink/60">
                  {t("cart.emptyBody")}
                </p>
                <Link
                  to="/shop"
                  onClick={close}
                  className="mt-2 inline-flex items-center gap-2 rounded-xs bg-walnut px-6 py-3 text-sm font-medium text-white transition hover:bg-walnut-deep"
                >
                  {t("cart.exploreShop")}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5">
                  <ul className="divide-y divide-line">
                    {items.map((it) => (
                      <li key={it.slug} className="flex gap-4 py-5 first:pt-0">
                        <Link
                          to="/product/$slug"
                          params={{ slug: it.slug }}
                          onClick={close}
                          className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xs bg-secondary"
                        >
                          <img
                            src={it.image}
                            alt={it.name}
                            className="h-full w-full object-cover"
                          />
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="text-[10px] tracking-[0.2em] text-ink/50 uppercase">
                                {it.category}
                              </div>
                              <Link
                                to="/product/$slug"
                                params={{ slug: it.slug }}
                                onClick={close}
                                className="mt-1 block truncate font-display text-lg text-walnut-deep hover:text-walnut"
                              >
                                {it.name}
                              </Link>
                            </div>
                            <button
                              aria-label={t("cart.remove", { name: it.name })}
                              onClick={() => removeItem(it.slug)}
                              className="grid size-8 shrink-0 place-items-center rounded-xs text-ink/50 transition hover:bg-line/60 hover:text-walnut-deep"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                          <div className="mt-auto flex items-end justify-between pt-3">
                            <div className="flex items-center gap-1 rounded-xs border border-line bg-white p-1">
                              <button
                                aria-label={t("cart.decrease")}
                                onClick={() => updateQty(it.slug, it.qty - 1)}
                                className="grid size-7 place-items-center rounded-xs text-walnut-deep transition hover:bg-secondary"
                              >
                                <Minus className="size-3.5" />
                              </button>
                              <span className="w-6 text-center text-sm tabular-nums">
                                {it.qty}
                              </span>
                              <button
                                aria-label={t("cart.increase")}
                                onClick={() => updateQty(it.slug, it.qty + 1)}
                                className="grid size-7 place-items-center rounded-xs text-walnut-deep transition hover:bg-secondary"
                              >
                                <Plus className="size-3.5" />
                              </button>
                            </div>
                            <div className="font-display text-base text-walnut-deep tabular-nums">
                              {formatPrice(it.price * it.qty)}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="border-t border-line bg-white/60 px-6 py-6">
                  <div className="flex items-baseline justify-between text-sm text-ink/70">
                    <span>{t("cart.subtotal")}</span>
                    <span className="font-display text-xl text-walnut-deep tabular-nums">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-ink/50">
                    {t("cart.subtotalNote")}
                  </p>
                  <div className="mt-5 flex flex-col gap-2">
                    <Link
                      to="/checkout"
                      onClick={close}
                      className="group inline-flex items-center justify-center gap-3 rounded-xs bg-walnut-deep px-6 py-4 text-sm font-medium tracking-wide text-white transition hover:bg-walnut"
                    >
                      {t("cart.checkout")}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <button
                      onClick={close}
                      className="text-xs tracking-wide text-ink/60 uppercase transition hover:text-walnut-deep"
                    >
                      {t("cart.continue")}
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}