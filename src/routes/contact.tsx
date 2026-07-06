import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { MagneticButton } from "@/components/site/MagneticButton";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · Đức Ngân" },
      {
        name: "description",
        content:
          "Visit our Hà Nội showroom or write to us. We answer every letter, personally.",
      },
      { property: "og:title", content: "Contact · Đức Ngân" },
      {
        property: "og:description",
        content: "Visit our Hà Nội showroom or write to us.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useTranslation();
  return (
    <div className="pt-36 pb-24">
      <div className="container-wide">
        <Reveal>
          <div className="eyebrow">{t("contact.eyebrow")}</div>
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[1.02] text-walnut-deep md:text-7xl">
            {t("contact.title1")}
            <br />
            {t("contact.title2")}
          </h1>
        </Reveal>

        <div className="mt-20 grid gap-16 md:grid-cols-12">
          <Reveal delay={0.1} className="md:col-span-7">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-6 rounded-xs bg-white p-8 md:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label={t("contact.yourName")} placeholder={t("contact.namePh")} />
                <Field label={t("contact.email")} placeholder={t("contact.emailPh")} type="email" />
              </div>
              <Field label={t("contact.subject")} placeholder={t("contact.subjectPh")} />
              <div>
                <label className="mb-2 block text-xs tracking-[0.2em] text-ink/60 uppercase">
                  {t("contact.message")}
                </label>
                <textarea
                  rows={6}
                  placeholder={t("contact.messagePh")}
                  className="w-full resize-none rounded-xs border border-line bg-paper/60 px-5 py-4 text-sm text-ink outline-none transition focus:border-walnut"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className="max-w-xs text-xs text-ink/55">
                  {t("contact.note")}
                </p>
                <MagneticButton type="submit">{t("contact.send")}</MagneticButton>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-5">
            <div className="rounded-xs border border-line p-8 md:p-10">
              <div className="eyebrow">{t("contact.showroomEyebrow")}</div>
              <h2 className="mt-4 font-display text-3xl text-walnut-deep">
                {t("contact.showroomTitle")}
              </h2>
              <ul className="mt-8 space-y-6 text-sm text-ink/75">
                <Row icon={<MapPin className="size-4" />}>
                  12 Phố Hàng Bún, Ba Đình, Hà Nội, Vietnam
                </Row>
                <Row icon={<Clock className="size-4" />}>
                  {t("footer.hours")}
                </Row>
                <Row icon={<Phone className="size-4" />}>+84 24 3823 4567</Row>
                <Row icon={<Mail className="size-4" />}>hello@ducngan.vn</Row>
              </ul>

              <div className="mt-10 aspect-video overflow-hidden rounded-xs">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(139,90,43,0.35), rgba(58,36,24,0.85))",
                  }}
                >
                  <div className="grid h-full place-items-center text-xs tracking-[0.3em] text-white/70 uppercase">
                    {t("contact.mapLabel")}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs tracking-[0.2em] text-ink/60 uppercase">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xs border border-line bg-paper/60 px-5 py-3.5 text-sm text-ink outline-none transition focus:border-walnut"
      />
    </div>
  );
}

function Row({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-xs border border-line text-walnut">
        {icon}
      </span>
      <span className="pt-2">{children}</span>
    </li>
  );
}
