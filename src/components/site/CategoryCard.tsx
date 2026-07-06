import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Instrument } from "@/data/instruments";

export function CategoryCard({ item }: { item: Instrument }) {
  return (
    <Link
      to="/product/$slug"
      params={{ slug: item.slug }}
      className="group relative flex flex-col overflow-hidden rounded-xs bg-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
        />
      </div>
      <div className="flex items-start justify-between gap-4 p-6">
        <div className="min-w-0">
          <div className="font-display text-2xl leading-tight text-walnut-deep">
            {item.name}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.tagline}</p>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-xs bg-walnut text-white transition-all duration-500 group-hover:bg-walnut-deep">
          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
