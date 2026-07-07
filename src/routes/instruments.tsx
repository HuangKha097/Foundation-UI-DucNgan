import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { instruments } from "@/data/instruments";
import { Waveform } from "@/components/site/Waveform";
import { Reveal } from "@/components/site/Reveal";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/instruments")({
  head: () => ({
    meta: [
      { title: "Traditional Instruments · Đức Ngân" },
      {
        name: "description",
        content:
          "An editorial guide to Vietnamese traditional instruments — history, sound, and craft, one by one.",
      },
      { property: "og:title", content: "Traditional Instruments · Đức Ngân" },
      {
        property: "og:description",
        content: "A field guide to the sound of Vietnam.",
      },
    ],
  }),
  component: Instruments,
});

function Instruments() {
  const { t } = useTranslation();
  return (
    <div className="pt-36 pb-24">
      <div className="container-wide">
        <Reveal>
          <div className="eyebrow">{t("instruments.eyebrow")}</div>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] text-walnut-deep md:text-7xl">
            {t("instruments.title1")}
            <br />
            {t("instruments.title2")}
          </h1>
        </Reveal>
      </div>

      <div className="mt-24 space-y-32">
        {instruments.map((it, i) => (
          <section key={it.slug} className="container-wide">
            <div
              className={
                "grid gap-12 md:grid-cols-12 md:gap-16 " +
                (i % 2 === 1 ? "md:[&>.img]:order-2" : "")
              }
            >
              <div className="img md:col-span-6">
                <motion.div
                  initial={{ scale: 1.08, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="relative aspect-[4/5] overflow-hidden rounded-xs bg-secondary"
                >
                  <img
                    src={it.image}
                    alt={it.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </div>
              <div className="md:col-span-6 md:py-12">
                <Reveal>
                  <div className="eyebrow">{it.category}</div>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 className="mt-4 font-display text-5xl leading-[1] text-walnut-deep md:text-6xl">
                    {it.name}
                  </h2>
                </Reveal>
                <Reveal delay={0.15}>
                  <p className="mt-6 max-w-md font-display text-2xl leading-[1.25] text-walnut">
                    {it.tagline}
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/70">
                    {it.description}
                  </p>
                </Reveal>
                <Reveal delay={0.25}>
                  <div className="mt-8 max-w-md">
                    <Waveform title={`${it.name} ${t("product.sampleSuffix")}`} duration="00:52" />
                  </div>
                </Reveal>
                <Reveal delay={0.3}>
                  <Link
                    to="/product/$slug"
                    params={{ slug: it.slug }}
                    className="mt-10 inline-flex items-center gap-2 rounded-xs bg-walnut px-6 py-3 text-sm font-medium text-white transition hover:bg-walnut-deep"
                  >
                    {t("instruments.view", { name: it.name })}
                    <ArrowRight className="size-4" />
                  </Link>
                </Reveal>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
