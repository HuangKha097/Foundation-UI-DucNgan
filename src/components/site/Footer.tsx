import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-32 bg-[oklch(0.22_0.03_45)] text-white/85">
      <div className="container-wide grid gap-16 py-24 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="font-display text-5xl leading-[0.95] tracking-tight text-white md:text-6xl">
            Đức Ngân
          </div>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/60">
            {t("footer.description")}
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-10 flex max-w-md items-center gap-2 rounded-xs border border-white/15 p-1.5 pl-5"
          >
            <input
              type="email"
              placeholder={t("footer.newsletterPlaceholder")}
              className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xs bg-bamboo px-5 py-2.5 text-xs font-medium tracking-wide text-walnut-deep uppercase transition hover:bg-white"
            >
              {t("footer.subscribe")}
            </button>
          </form>
        </div>

        <div className="grid gap-10 md:col-span-7 md:grid-cols-3">
          <FooterCol title={t("footer.colShop")}>
            <FooterLink to="/shop">{t("footer.linkAll")}</FooterLink>
            <FooterLink to="/instruments">{t("footer.linkGuide")}</FooterLink>
            <FooterLink to="/shop">{t("footer.linkGifts")}</FooterLink>
            <FooterLink to="/shop">{t("footer.linkCare")}</FooterLink>
          </FooterCol>
          <FooterCol title={t("footer.colHouse")}>
            <FooterLink to="/craftsmanship">{t("footer.linkCraft")}</FooterLink>
            <FooterLink to="/stories">{t("footer.linkStories")}</FooterLink>
            <FooterLink to="/contact">{t("footer.linkShowroom")}</FooterLink>
            <FooterLink to="/contact">{t("footer.linkContact")}</FooterLink>
          </FooterCol>
          <FooterCol title={t("footer.colVisit")}>
            <p className="text-sm leading-relaxed text-white/60">
              {t("footer.addressLine1")}
              <br />
              {t("footer.addressLine2")}
              <br />
              {t("footer.addressLine3")}
            </p>
            <p className="mt-4 text-sm text-white/60">
              {t("footer.hours")}
            </p>
          </FooterCol>
        </div>
      </div>

      {/* Map strip */}
      <div className="relative h-64 overflow-hidden border-y border-white/10 md:h-72">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(139,90,43,0.45), rgba(58,36,24,0.85))",
          }}
        />
        <svg
          className="absolute inset-0 h-full w-full opacity-40"
          viewBox="0 0 800 300"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <path
              key={i}
              d={`M0 ${20 + i * 14} Q 200 ${10 + i * 15} 400 ${25 + i * 13} T 800 ${20 + i * 14}`}
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
          ))}
        </svg>
        <div className="relative z-10 flex h-full items-center justify-center">
          <a
            href="https://www.google.com/maps/search/?api=1&query=526+%C4%90i%E1%BB%87n+Bi%C3%AAn+Ph%E1%BB%A7%2C+Ph%C6%B0%E1%BB%9Dng+11%2C+Qu%E1%BA%ADn+10%2C+TP.+H%E1%BB%93+Ch%C3%AD+Minh"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-xs border border-white/25 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white hover:text-walnut-deep"
          >
            {t("footer.openInMaps")}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      <div className="container-wide flex flex-col items-start justify-between gap-6 py-8 text-xs text-white/45 md:flex-row md:items-center">
        <div>© {new Date().getFullYear()} Đức Ngân · {t("footer.rights")}</div>
        <div className="flex items-center gap-5">
          <a href="#" aria-label="Instagram" className="transition hover:text-white">
            <Instagram className="size-4" />
          </a>
          <a href="#" aria-label="Facebook" className="transition hover:text-white">
            <Facebook className="size-4" />
          </a>
          <a href="#" aria-label="YouTube" className="transition hover:text-white">
            <Youtube className="size-4" />
          </a>
          <span className="text-white/25">|</span>
          <a href="#" className="transition hover:text-white">
            {t("footer.privacy")}
          </a>
          <a href="#" className="transition hover:text-white">
            {t("footer.terms")}
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-5 text-[11px] tracking-[0.28em] text-bamboo uppercase">
        {title}
      </div>
      <ul className="space-y-2.5 text-sm text-white/70">{children}</ul>
    </div>
  );
}

function FooterLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        to={to}
        className="inline-flex items-center gap-1 transition-colors hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}
