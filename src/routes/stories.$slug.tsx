import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getStory, stories } from "@/data/stories";
import { Reveal } from "@/components/site/Reveal";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/stories/$slug")({
  loader: ({ params }) => {
    const story = getStory(params.slug);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [
          { title: "Story not found · Đức Ngân" },
          { name: "robots", content: "noindex" },
        ],
      };
    const s = loaderData.story;
    return {
      meta: [
        { title: `${s.title} · Đức Ngân` },
        { name: "description", content: s.excerpt },
        { property: "og:title", content: s.title },
        { property: "og:description", content: s.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: StoryPage,
  notFoundComponent: NotFound,
});

function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="container-wide pt-40 pb-24 text-center">
      <div className="eyebrow">{t("stories.notFoundEyebrow")}</div>
      <h1 className="mt-4 font-display text-4xl text-walnut-deep">
        {t("stories.notFoundTitle")}
      </h1>
      <Link
        to="/stories"
        className="mt-6 inline-block text-sm text-walnut hover:text-walnut-deep"
      >
        {t("stories.back")}
      </Link>
    </div>
  );
}

function StoryPage() {
  const { t } = useTranslation();
  const { story } = Route.useLoaderData();
  const related = stories.filter((s) => s.slug !== story.slug).slice(0, 3);

  return (
    <article className="pt-32 pb-20">
      <div className="container-wide">
        <Link
          to="/stories"
          className="inline-flex items-center gap-2 text-xs tracking-wide text-ink/60 uppercase hover:text-walnut"
        >
          <ArrowLeft className="size-3.5" />
          {t("stories.allLink")}
        </Link>

        <Reveal>
          <div className="mx-auto mt-12 max-w-3xl text-center">
            <div className="eyebrow">
              {story.category} · {story.readingTime}
            </div>
            <h1 className="mt-5 font-display text-5xl leading-[1.02] text-walnut-deep md:text-6xl">
              {story.title}
            </h1>
            <p className="mt-6 text-lg text-ink/65">{story.excerpt}</p>
            <div className="mt-6 text-xs tracking-wide text-ink/50 uppercase">
              {story.date}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-16 aspect-[16/9] max-w-5xl overflow-hidden rounded-xs bg-secondary">
            <img src={story.image} alt={story.title} className="h-full w-full object-cover" />
          </div>
        </Reveal>

        <div className="mx-auto mt-16 max-w-2xl space-y-6 text-[17px] leading-[1.75] text-ink/80">
          {story.body.map((p: string, i: number) => (
            <Reveal delay={i * 0.05} key={i}>
              {i === 0 ? (
                <p>
                  <span className="float-left mt-2 mr-3 font-display text-6xl leading-none text-walnut">
                    {p[0]}
                  </span>
                  {p.slice(1)}
                </p>
              ) : (
                <p>{p}</p>
              )}
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-24 max-w-5xl border-t border-line pt-16">
          <div className="eyebrow">{t("stories.moreStories")}</div>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {related.map((s) => (
              <Link
                key={s.slug}
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
                <h3 className="mt-5 font-display text-xl leading-[1.2] text-walnut-deep group-hover:text-walnut">
                  {s.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
