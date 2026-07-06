import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Hammer,
  Leaf,
  Award,
} from "lucide-react";

import hero from "@/assets/hero-dantranh.jpg";
import artisan from "@/assets/artisan.jpg";
import culture from "@/assets/culture.jpg";
import craft from "@/assets/craft.jpg";
import imgTranh from "@/assets/inst-dantranh.jpg";
import imgBau from "@/assets/inst-danbau.jpg";

import { categories, featured } from "@/data/instruments";
import { stories } from "@/data/stories";
import { ProductCard } from "@/components/site/ProductCard";
import { Waveform } from "@/components/site/Waveform";
import { MagneticButton } from "@/components/site/MagneticButton";
import { Reveal, RevealStagger, revealItem } from "@/components/site/Reveal";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <ExploreInstruments />
      <FeaturedInstruments />
      <CraftsmanshipStory />
      <CulturalStory />
      <AudioExperience />
      <StoriesPreview />
      <Testimonials />
    </>
  );
}

/* ------------------------------- HERO ---------------------------------- */
function Hero() {
  const { t } = useTranslation();
  const heroLines = [
    t("home.hero.line1"),
    t("home.hero.line2"),
    t("home.hero.line3"),
    t("home.hero.line4"),
  ];
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="paper-grain absolute inset-0 -z-10" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[70vh] opacity-[0.05]"
        aria-hidden
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 3px, currentColor 3px 4px)",
          color: "var(--walnut)",
        }}
      />

      <div className="container-wide relative grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="relative md:col-span-6 md:pt-6 lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow"
          >
            {t("home.hero.eyebrow")}
          </motion.div>

          <h1 className="mt-6 font-display text-[13vw] leading-[0.94] font-medium tracking-[-0.02em] text-walnut-deep sm:text-6xl md:text-7xl lg:text-[88px]">
            {heroLines.map(
              (line, i) => (
                <motion.span
                  key={line}
                  className="block overflow-hidden"
                >
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 1.1,
                      delay: 0.1 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                </motion.span>
              ),
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-md text-[15px] leading-relaxed text-ink/70"
          >
            {t("home.hero.body")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="/shop">
              {t("home.hero.ctaExplore")}
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton variant="ghost" href="/craftsmanship">
              {t("home.hero.ctaCraft")}
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-16 hidden items-center gap-3 text-[10px] tracking-[0.3em] text-ink/45 uppercase md:flex"
          >
            <span className="h-px w-8 bg-walnut/40" />
            {t("home.hero.scroll")}
          </motion.div>
        </div>

        <div className="relative md:col-span-6 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, scale: 1.15, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-xs bg-secondary sm:aspect-[5/6] md:aspect-[4/5]"
          >
            <img
              src={hero}
              alt="A handcrafted Đàn Tranh resting on a wooden stand"
              width={1280}
              height={1280}
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-4 -bottom-6 left-4 sm:right-8 sm:-bottom-8 sm:left-auto sm:w-[420px]"
          >
            <Waveform title={t("home.hero.sampleTitle")} duration="00:45" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- EXPLORE INSTRUMENTS ------------------------- */
function ExploreInstruments() {
  const { t } = useTranslation();
  const stagger = ["", "lg:mt-24", "lg:-mt-12", "lg:mt-12"];
  return (
    <section className="container-wide mt-40 grid gap-16 md:grid-cols-12 md:gap-10">
      {/* Sticky editorial intro */}
      <div className="md:col-span-4 lg:col-span-3">
        <div className="md:sticky md:top-28">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-walnut/40" />
              <div className="eyebrow !mt-0">{t("home.explore.eyebrow")}</div>
            </div>
            <h2 className="mt-6 font-display text-5xl leading-[0.95] text-walnut-deep md:text-6xl">
              {t("home.explore.title1")}
              <br />
              <span className="italic text-walnut">{t("home.explore.title2")}</span>
            </h2>
            <p className="mt-8 max-w-xs text-sm leading-relaxed text-ink/65">
              {t("home.explore.body")}
            </p>
            <Link
              to="/instruments"
              className="group mt-10 inline-flex items-center gap-3 text-sm font-medium tracking-wide text-walnut-deep"
            >
              <span className="grid size-11 place-items-center rounded-xs border border-walnut/30 transition-all duration-500 group-hover:bg-walnut group-hover:text-white">
                <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5" />
              </span>
              <span className="border-b border-walnut/30 pb-1 transition-colors group-hover:border-walnut-deep">
                {t("home.explore.all")}
              </span>
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Editorial staggered gallery */}
      <RevealStagger className="md:col-span-8 lg:col-span-9">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:gap-y-24">
          {categories.map((c, i) => {
            const badge = t(`home.explore.items.${c.slug}.badge`, {
              defaultValue: c.category,
            });
            const tagline = t(`home.explore.items.${c.slug}.tagline`, {
              defaultValue: c.tagline,
            });
            return (
              <motion.div
                key={c.slug}
                variants={revealItem}
                className={stagger[i % stagger.length]}
              >
                <Link
                  to="/product/$slug"
                  params={{ slug: c.slug }}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xs bg-secondary">
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-walnut-deep/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute top-4 right-4 rounded-xs bg-paper/90 px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-walnut uppercase backdrop-blur-sm">
                      {badge}
                    </div>
                    <div className="absolute top-4 left-4 text-[10px] font-medium tracking-[0.28em] text-white/90 uppercase mix-blend-difference">
                      0{i + 1}
                    </div>
                    <span className="absolute right-4 bottom-4 grid size-11 place-items-center rounded-xs bg-white/95 text-walnut-deep opacity-0 translate-y-2 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                  <div className="mt-6 space-y-2">
                    <h3 className="font-display text-2xl leading-tight text-walnut-deep transition-colors group-hover:text-walnut md:text-3xl">
                      {c.name}
                    </h3>
                    <p className="font-display text-[15px] italic leading-relaxed text-ink/60">
                      {tagline}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </RevealStagger>
    </section>
  );
}

/* -------------------------- FEATURED INSTRUMENTS ------------------------- */
function FeaturedInstruments() {
  const { t } = useTranslation();
  return (
    <section className="container-wide mt-40">
      <div className="flex items-end justify-between gap-6">
        <Reveal>
          <div className="eyebrow">{t("home.featured.eyebrow")}</div>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-walnut-deep md:text-5xl">
            {t("home.featured.title")}
          </h2>
        </Reveal>
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            to="/shop"
            className="text-sm font-medium text-walnut hover:text-walnut-deep"
          >
            {t("home.featured.all")}
          </Link>
          <div className="ml-3 flex gap-2">
            <button
              aria-label={t("home.featured.prev")}
              className="grid size-10 place-items-center rounded-xs border border-line text-walnut-deep transition hover:bg-walnut hover:text-white"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              aria-label={t("home.featured.next")}
              className="grid size-10 place-items-center rounded-xs border border-line text-walnut-deep transition hover:bg-walnut hover:text-white"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
      <RevealStagger className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((f) => (
          <motion.div key={f.slug} variants={revealItem}>
            <ProductCard item={f} />
          </motion.div>
        ))}
      </RevealStagger>
    </section>
  );
}

/* ------------------------ CRAFTSMANSHIP STORY --------------------------- */
function CraftsmanshipStory() {
  const { t } = useTranslation();
  const badges = t("home.story.badges", { returnObjects: true }) as { label: string; sub: string }[];
  const badgeIcons = [Award, Hammer, Leaf, Sparkles];
  return (
    <section className="mt-40 overflow-hidden">
      <div className="container-wide grid gap-14 md:grid-cols-12 md:gap-12">
        <div className="relative md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xs bg-walnut-deep">
            <motion.img
              src={artisan}
              alt="Master artisan Nguyễn Văn Tâm at work"
              width={1280}
              height={1600}
              loading="lazy"
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-7 md:pt-10">
          <Reveal>
            <div className="eyebrow">{t("home.story.eyebrow")}</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-5xl leading-[1.02] text-walnut-deep md:text-6xl">
              {t("home.story.title1")}
              <br />
              {t("home.story.title2")}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-ink/70">
              {t("home.story.body")}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex items-end gap-6">
              <svg viewBox="0 0 220 60" className="h-14 w-40 text-walnut-deep">
                <path
                  d="M10 40 Q 30 10 45 32 T 80 30 Q 100 18 120 34 T 165 30 Q 185 22 205 36"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-sm">
                <div className="text-walnut-deep">{t("home.story.master")}</div>
                <div className="text-ink/55">{t("home.story.masterRole")}</div>
              </div>
            </div>
          </Reveal>

          <RevealStagger className="mt-14 grid gap-8 sm:grid-cols-2">
            {badges.map((b, i) => {
              const Icon = badgeIcons[i];
              return (
              <motion.div
                key={b.label}
                variants={revealItem}
                className="flex items-start gap-4"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xs border border-bamboo/50 text-walnut">
                  <Icon className="size-4" />
                </span>
                <div>
                  <div className="font-display text-xl text-walnut-deep">{b.label}</div>
                  <div className="mt-0.5 text-sm text-ink/55">{b.sub}</div>
                </div>
              </motion.div>
              );
            })}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- CULTURAL STORY ---------------------------- */
function CulturalStory() {
  const { t } = useTranslation();
  const cardImages = [culture, artisan, imgTranh, craft, imgBau];
  const cardsRaw = t("home.culture.cards", { returnObjects: true }) as {
    tag: string;
    title: string;
    copy: string;
    year: string;
  }[];
  const cards = cardsRaw.map((c, i) => ({ ...c, img: cardImages[i] }));

  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="mt-40">
      <div className="container-wide">
        <div className="grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <div className="eyebrow">{t("home.culture.eyebrow")}</div>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] text-walnut-deep md:text-5xl whitespace-pre-line">
              {t("home.culture.title")}
            </h2>
          </Reveal>
          <Reveal className="md:col-span-8" delay={0.1}>
            <p className="text-[15px] leading-relaxed text-ink/70 md:mt-3">
              {t("home.culture.body1")}
            </p>
            <p className="mt-6 text-[15px] leading-relaxed text-ink/70">
              {t("home.culture.body2")}
            </p>
          </Reveal>
        </div>

        {/* Expanding image cards */}
        <Reveal delay={0.15}>
          <div
            className="mt-16 grid h-[420px] w-full grid-cols-5 gap-3 overflow-hidden md:flex md:h-[520px]"
            onMouseLeave={() => setActive(null)}
          >
            {cards.map((c, i) => {
              const isActive = active === i;
              const isDim = active !== null && !isActive;
              const flex = isActive ? 3.6 : active === null ? 1.2 : 0.7;
              return (
                <motion.div
                  key={c.title}
                  onMouseEnter={() => setActive(i)}
                  animate={{ flexGrow: flex }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative min-w-0 cursor-pointer overflow-hidden rounded-xs bg-secondary md:flex-1 md:basis-0"
                  style={{ flexGrow: flex }}
                >
                  <motion.img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    animate={{ scale: isActive ? 1.08 : 1, filter: isDim ? "grayscale(0.5) brightness(0.75)" : "grayscale(0) brightness(1)" }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* Bottom gradient */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-walnut-deep/85 via-walnut-deep/20 to-transparent" />

                  {/* Vertical label — visible when collapsed */}
                  <motion.div
                    animate={{ opacity: isActive ? 0 : 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-6 left-1/2 -translate-x-1/2 [writing-mode:vertical-rl] rotate-180 text-[11px] font-medium tracking-[0.28em] text-white/90 uppercase"
                  >
                    {c.tag}
                  </motion.div>

                  {/* Expanded content */}
                  <div className="absolute inset-x-0 bottom-0 hidden p-6 md:block md:p-8">
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: isActive ? 0.15 : 0 }}
                    >
                      <div className="flex items-center gap-3 text-[10px] font-medium tracking-[0.24em] text-bamboo uppercase">
                        <span>{c.tag}</span>
                        <span className="h-px w-8 bg-bamboo/60" />
                        <span className="text-white/70">{c.year}</span>
                      </div>
                      <h3 className="mt-3 max-w-md font-display text-3xl leading-tight text-white md:text-4xl">
                        {c.title}
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
                        {c.copy}
                      </p>
                    </motion.div>
                    {/* Numeric index — visible always */}
                    <motion.div
                      animate={{ opacity: isActive ? 0 : 0.85 }}
                      transition={{ duration: 0.4 }}
                      className="absolute right-4 bottom-4 font-display text-2xl text-white/80"
                    >
                      0{i + 1}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Reveal>

        {/* Quote below */}
        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7 md:col-start-3">
            <p className="font-display text-3xl leading-[1.25] text-walnut-deep md:text-4xl">
              {t("home.culture.quote")}
            </p>
            <div className="mt-6 text-sm text-ink/55">— Nguyễn Văn Tâm</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- AUDIO EXPERIENCE --------------------------- */
function AudioExperience() {
  const { t } = useTranslation();
  const tImgs = [imgTranh, imgBau, imgTranh];
  const tDurations = ["01:22", "00:58", "01:04"];
  const tRaw = t("home.audio.tracks", { returnObjects: true }) as { title: string; piece: string }[];
  const tracks = tRaw.map((tr, i) => ({ ...tr, img: tImgs[i], duration: tDurations[i] }));
  return (
    <section className="mt-24 md:mt-40">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-xs bg-[oklch(0.24_0.03_45)] px-4 py-12 text-white sm:px-8 sm:py-20 md:px-16 md:py-28">
          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 15%, rgba(201,164,106,0.4), transparent 45%), radial-gradient(circle at 90% 80%, rgba(184,137,76,0.28), transparent 50%)",
            }}
          />
          {/* Decorative instrument silhouette — hidden on mobile */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 rounded-full opacity-[0.18] lg:block"
            style={{
              backgroundImage: `url(${imgTranh})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "grayscale(0.4) contrast(1.05)",
              maskImage:
                "radial-gradient(circle, rgba(0,0,0,0.9), transparent 65%)",
              WebkitMaskImage:
                "radial-gradient(circle, rgba(0,0,0,0.9), transparent 65%)",
            }}
          />

          <div className="relative grid gap-12 md:grid-cols-12 md:gap-14">
            {/* Left: header */}
            <Reveal className="md:col-span-5">
              <div className="eyebrow !text-bamboo">{t("home.audio.eyebrow")}</div>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
                {t("home.audio.title1")}
                <br />
                <span className="italic text-bamboo">{t("home.audio.title2").split(" ")[0]}</span>{" "}
                {t("home.audio.title2").split(" ").slice(1).join(" ")}
              </h2>
              <p className="mt-6 max-w-md text-[14px] leading-relaxed text-white/70 sm:mt-8 sm:text-[15px]">
                {t("home.audio.body")}
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4 text-[10px] tracking-[0.2em] text-white/50 uppercase sm:flex sm:items-center sm:gap-6 sm:text-[11px] sm:tracking-[0.24em]">
                <div>
                  <div className="font-display text-2xl text-bamboo">24bit</div>
                  <div className="mt-1">{t("home.audio.statMaster")}</div>
                </div>
                <span className="hidden h-8 w-px bg-white/15 sm:block" />
                <div>
                  <div className="font-display text-2xl text-bamboo">96k</div>
                  <div className="mt-1">{t("home.audio.statHz")}</div>
                </div>
                <span className="hidden h-8 w-px bg-white/15 sm:block" />
                <div>
                  <div className="font-display text-2xl text-bamboo">03</div>
                  <div className="mt-1">{t("home.audio.statTracks")}</div>
                </div>
              </div>
            </Reveal>

            {/* Right: tracks */}
            <div className="flex min-w-0 flex-col gap-3 sm:gap-4 md:col-span-7">
              {tracks.map((t, i) => (
                <Reveal key={t.title} delay={i * 0.1}>
                  <div className="group w-full min-w-0 overflow-hidden rounded-xs bg-white/[0.06] p-3 ring-1 ring-white/10 backdrop-blur-md transition hover:bg-white/[0.1] hover:ring-bamboo/40 sm:flex sm:items-center sm:gap-4 sm:p-4">
                    <div className="flex min-w-0 items-center gap-3 sm:contents">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xs sm:h-20 sm:w-20">
                        <img
                          src={t.img}
                          alt={t.title}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-walnut-deep/60 to-transparent" />
                        <div className="absolute bottom-0.5 left-1.5 font-display text-[10px] text-white/90 sm:text-xs">
                          0{i + 1}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1 sm:hidden">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="truncate font-display text-lg leading-tight text-white">
                              {t.title}
                            </div>
                            <div className="mt-1 truncate text-[10px] tracking-[0.14em] text-white/45 uppercase">
                              {t.piece}
                            </div>
                          </div>
                          <span className="shrink-0 text-[10px] tabular-nums tracking-wide text-white/55 uppercase">
                            {t.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 min-w-0 overflow-hidden sm:mt-0 sm:flex-1">
                      <div className="mb-2 hidden min-w-0 items-baseline justify-between gap-2 sm:flex">
                        <div className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate font-display text-lg text-white">
                            {t.title}
                          </span>
                          <span className="truncate text-[11px] tracking-[0.16em] text-white/45 uppercase">
                            {t.piece}
                          </span>
                        </div>
                        <span className="shrink-0 text-[11px] tabular-nums tracking-wide text-white/55 uppercase">
                          {t.duration}
                        </span>
                      </div>
                      <Waveform
                        duration={t.duration}
                        bars={56}
                        variant="minimal"
                        tone="dark"
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- STORIES PREVIEW --------------------------- */
function StoriesPreview() {
  const { t } = useTranslation();
  return (
    <section className="container-wide mt-40">
      <div className="flex items-end justify-between gap-6">
        <Reveal>
          <div className="eyebrow">{t("home.stories.eyebrow")}</div>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-walnut-deep md:text-5xl">
            {t("home.stories.title")}
          </h2>
        </Reveal>
        <Link
          to="/stories"
          className="hidden text-sm font-medium text-walnut hover:text-walnut-deep sm:block"
        >
          {t("home.stories.all")}
        </Link>
      </div>

      <RevealStagger className="mt-14 grid gap-8 md:grid-cols-3">
        {stories.slice(0, 3).map((s) => (
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
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
                <span className="absolute top-5 left-5 rounded-xs bg-white/85 px-3 py-1 text-[11px] tracking-wide text-walnut-deep uppercase backdrop-blur">
                  {s.category}
                </span>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs tracking-wide text-ink/55 uppercase">
                <span>{s.date}</span>
                <span>{s.readingTime}</span>
              </div>
              <h3 className="mt-3 font-display text-2xl leading-[1.15] text-walnut-deep group-hover:text-walnut">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{s.excerpt}</p>
            </Link>
          </motion.article>
        ))}
      </RevealStagger>
    </section>
  );
}

/* ------------------------------ TESTIMONIALS --------------------------- */
function Testimonials() {
  const { t } = useTranslation();
  const testimonials = t("home.voices.testimonials", { returnObjects: true }) as {
    quote: string;
    name: string;
    role: string;
  }[];
  return (
    <section className="container-wide mt-40">
      <Reveal>
        <div className="eyebrow">{t("home.voices.eyebrow")}</div>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.05] text-walnut-deep md:text-5xl">
          {t("home.voices.title")}
        </h2>
      </Reveal>

      <RevealStagger className="mt-16 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <motion.figure
            key={t.name}
            variants={revealItem}
            className="flex h-full flex-col justify-between rounded-xs border border-line bg-white p-8"
          >
            <blockquote className="font-display text-xl leading-[1.35] text-walnut-deep">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span
                className="grid size-11 place-items-center rounded-xs bg-secondary font-display text-walnut-deep"
                aria-hidden
              >
                {t.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div>
                <div className="text-sm text-walnut-deep">{t.name}</div>
                <div className="text-xs text-ink/55">{t.role}</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </RevealStagger>

      <Reveal>
        <div className="mt-24 flex flex-col items-start justify-between gap-8 rounded-xs bg-white p-10 md:flex-row md:items-center md:p-14">
          <div>
            <div className="eyebrow">{t("home.voices.visitEyebrow")}</div>
            <h3 className="mt-3 font-display text-3xl leading-[1.1] text-walnut-deep md:text-4xl whitespace-pre-line">
              {t("home.voices.visitTitle")}
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticButton>
              {t("home.voices.book")}
              <ArrowRight className="size-4" />
            </MagneticButton>
            <MagneticButton variant="ghost">{t("home.voices.contact")}</MagneticButton>
          </div>
        </div>
      </Reveal>

      <div className="pointer-events-none mt-16" aria-hidden>
        <img src={craft} alt="" className="hidden" />
      </div>
    </section>
  );
}
