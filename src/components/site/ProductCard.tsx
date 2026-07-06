import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import type { Instrument } from "@/data/instruments";
import { formatPrice } from "@/data/instruments";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "react-i18next";

export function ProductCard({ item }: { item: Instrument }) {
  const { addItem, open } = useCart();
  const { t } = useTranslation();
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      slug: item.slug,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    toast.success(t("product.addedToast", { name: item.name }));
    open();
  };
  return (
    <Link
      to="/product/$slug"
      params={{ slug: item.slug }}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-xs bg-secondary">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <button
          aria-label={t("product.wishlist")}
          onClick={(e) => {
            e.preventDefault();
          }}
          className="absolute top-4 right-4 grid size-9 place-items-center rounded-xs bg-white/80 text-walnut backdrop-blur-md transition hover:bg-white"
        >
          <Heart className="size-4" />
        </button>
        <div className="pointer-events-none absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={handleAdd}
            className="pointer-events-auto flex w-full items-center justify-between gap-3 rounded-xs bg-white/95 px-5 py-3 shadow-soft backdrop-blur transition hover:bg-white"
          >
            <span className="text-xs font-medium tracking-wide text-walnut-deep uppercase">
              {t("product.addToCart")}
            </span>
            <span className="grid size-8 place-items-center rounded-xs bg-walnut text-white transition group-hover:bg-walnut-deep">
              <ShoppingBag className="size-3.5" />
            </span>
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="font-display text-xl text-walnut-deep">{item.name}</div>
          <div className="mt-1 text-[15px] text-ink/70">{formatPrice(item.price)}</div>
        </div>
        <div className="flex items-center gap-1 pt-1 text-xs text-ink/55 tabular-nums">
          <Star className="size-3.5 fill-bamboo text-bamboo" />
          <span>{item.rating.toFixed(1)}</span>
          <span className="text-ink/40">({item.reviews})</span>
        </div>
      </div>
    </Link>
  );
}
