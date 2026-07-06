import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { stories } from "@/data/stories";
import { Reveal, RevealStagger, revealItem } from "@/components/site/Reveal";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Stories · Đức Ngân" },
      {
        name: "description",
        content:
          "The Đức Ngân journal — history, craft and quiet notes from a Vietnamese traditional-instrument workshop.",
      },
      { property: "og:title", content: "Stories · Đức Ngân" },
      {
        property: "og:description",
        content: "Editorial writing on Vietnamese traditional music and craft.",
      },
    ],
  }),
  component: Stories,
});

function Stories() {
  const { t } = useTranslation();
  const [first, ...rest] = stories;
  return (
    <div className="pt-36 pb-24">
      <div className="container-wide">
        <Reveal>
          <div className="eyebrow">{t("stories.eyebrow")}</div>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] text-walnut-deep md:text-7xl">
            {t("stories.title1")}
            <br />
            {t("stories.title2")}
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <Link
            to="/stories/$slug"
            params={{ slug: first.slug }}
            className="group mt-20 grid gap-10 md:grid-cols-12"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xs bg-secondary md:col-span-7">
              <img
                src={first.image}
                alt={first.title}
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-col justify-end md:col-span-5">
              <div className="text-xs tracking-wide text-walnut uppercase">
                {first.category} · {first.date}
              </div>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] text-walnut-deep md:text-5xl">
                {first.title}
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/70">
                {first.excerpt}
              </p>
              <span className="mt-8 text-sm text-walnut">{t("stories.readMore")}</span>
            </div>
          </Link>
        </Reveal>

        <RevealStagger className="mt-24 grid gap-8 md:grid-cols-3">
          {rest.map((s) => (
            <motion.article key={s.slug} variants={revealItem}>
              <Link
                to="/stories/$slug"
                params={{ slug: s.slug }}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xs bg-secondary">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-6 text-xs tracking-wide text-ink/55 uppercase">
                  {s.category} · {s.readingTime}
                </div>
                <h3 className="mt-3 font-display text-2xl leading-[1.15] text-walnut-deep group-hover:text-walnut">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{s.excerpt}</p>
              </Link>
            </motion.article>
          ))}
        </RevealStagger>
      </div>
    </div>
  );
}
