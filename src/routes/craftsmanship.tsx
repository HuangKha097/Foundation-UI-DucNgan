import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import artisan from "@/assets/artisan.jpg";
import craft from "@/assets/craft.jpg";
import culture from "@/assets/culture.jpg";
import { Reveal, RevealStagger, revealItem } from "@/components/site/Reveal";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/craftsmanship")({
  head: () => ({
    meta: [
      { title: "Craftsmanship · Đức Ngân" },
      {
        name: "description",
        content:
          "How our master artisans handcraft Vietnamese traditional instruments — thirty years of quiet, patient work.",
      },
      { property: "og:title", content: "Craftsmanship · Đức Ngân" },
      {
        property: "og:description",
        content: "Thirty years of quiet, patient work.",
      },
    ],
  }),
  component: Craftsmanship,
});

function Craftsmanship() {
  const { t } = useTranslation();
  const steps = (t("craftsmanship.steps", { returnObjects: true }) as { title: string; body: string }[]).map(
    (s, i) => ({ n: String(i + 1).padStart(2, "0"), ...s }),
  );
  const stats = t("craftsmanship.stats", { returnObjects: true }) as { k: string; v: string }[];
  return (
    <div className="pt-32 pb-24">
      <section className="container-wide grid gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <Reveal>
            <div className="eyebrow">{t("craftsmanship.eyebrow")}</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-6xl leading-[0.98] text-walnut-deep md:text-8xl">
              {t("craftsmanship.title1")}
              <br />
              {t("craftsmanship.title2")}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-md text-[15px] leading-relaxed text-ink/70">
              {t("craftsmanship.body")}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="md:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xs bg-walnut-deep">
            <motion.img
              src={artisan}
              alt="Master artisan Nguyễn Văn Tâm"
              initial={{ scale: 1.12 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="container-wide mt-40">
        <Reveal>
          <div className="eyebrow">{t("craftsmanship.processEyebrow")}</div>
          <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.05] text-walnut-deep md:text-5xl">
            {t("craftsmanship.processTitle")}
          </h2>
        </Reveal>
        <div className="mt-16 space-y-2 border-t border-line">
          {steps.map((s) => (
            <Reveal key={s.n}>
              <div className="grid grid-cols-[auto_1fr] items-start gap-8 border-b border-line py-10 md:grid-cols-[80px_240px_1fr] md:gap-16">
                <div className="font-display text-3xl text-walnut">{s.n}</div>
                <div className="col-span-1 font-display text-3xl text-walnut-deep md:col-span-1">
                  {s.title}
                </div>
                <p className="col-span-2 max-w-xl text-[15px] leading-relaxed text-ink/70 md:col-span-1">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-wide mt-40">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded-xs bg-walnut-deep">
            <img
              src={craft}
              alt="Close-up of hands carving an instrument"
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 grid place-items-center bg-gradient-to-t from-black/40 via-transparent to-transparent">
              <button
                    aria-label={t("craftsmanship.playFilm")}
                className="group grid size-20 place-items-center rounded-xs bg-white/90 text-walnut-deep backdrop-blur-md transition hover:bg-white md:size-24"
              >
                <Play className="ml-1 size-6 fill-current" />
              </button>
            </div>
            <div className="absolute right-8 bottom-8 left-8 flex items-end justify-between text-white">
              <div>
                <div className="text-[11px] tracking-[0.3em] text-white/70 uppercase">
                      {t("craftsmanship.filmEyebrow")}
                </div>
                <div className="mt-2 font-display text-3xl md:text-4xl">
                      {t("craftsmanship.filmTitle")}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-wide mt-40 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-xs">
              <img src={culture} alt="Workshop wall of instruments" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-7 md:pt-12">
          <Reveal>
            <p className="font-display text-3xl leading-[1.3] text-walnut-deep md:text-4xl">
              {t("craftsmanship.quote")}
            </p>
          </Reveal>
          <RevealStagger className="mt-14 grid gap-8 sm:grid-cols-3">
            {stats.map((s) => (
              <motion.div key={s.k} variants={revealItem}>
                <div className="font-display text-5xl text-walnut">{s.k}</div>
                <div className="mt-2 text-sm text-ink/60">{s.v}</div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>
    </div>
  );
}
