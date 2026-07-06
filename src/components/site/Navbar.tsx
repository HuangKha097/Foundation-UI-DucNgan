import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useAuth, getInitials } from "@/context/AuthContext";

const linkDefs = [
  { to: "/", key: "home" },
  { to: "/shop", key: "shop" },
  { to: "/instruments", key: "instruments" },
  { to: "/stories", key: "stories" },
  { to: "/craftsmanship", key: "craftsmanship" },
  { to: "/contact", key: "contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, open: openCart } = useCart();
  const { t } = useTranslation();
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = linkDefs.map((l) => ({ ...l, label: t(`nav.${l.key}`) }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled
          ? "bg-paper/85 border-b border-line/60 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "container-wide flex items-center justify-between transition-all duration-700",
          scrolled ? "h-16" : "h-20 md:h-24",
        )}
      >
        <Link to="/" className="flex items-center gap-2" aria-label={t("nav.brandAria")}>
          <Logo scrolled={scrolled} />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="link-underline text-[13px] tracking-wide text-ink/80 transition-colors hover:text-walnut"
              activeProps={{ "data-active": "true", className: "text-walnut" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <LanguageSwitcher className="hidden lg:flex" />
          <IconButton label={t("nav.search")}>
            <Search className="size-4.5" />
          </IconButton>
          <IconButton label={t("nav.wishlist")}>
            <Heart className="size-4.5" />
          </IconButton>
          <IconButton label={t("nav.cart")} onClick={openCart}>
            <div className="relative">
              <ShoppingBag className="size-4.5" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-1.5 -right-2 grid min-w-4 place-items-center rounded-full bg-walnut px-1 text-[10px] font-medium text-white tabular-nums"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </IconButton>
          {user ? (
            <div className="relative">
              <button
                aria-label="Tài khoản"
                onClick={() => setMenuOpen((o) => !o)}
                className="grid size-9 place-items-center rounded-full bg-walnut text-white transition hover:bg-walnut-deep"
              >
                <span className="text-[11px] font-medium">{getInitials(profile?.full_name, user.email)}</span>
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-11 z-50 w-56 overflow-hidden rounded-xs border border-line bg-paper shadow-lg"
                    >
                      <div className="border-b border-line px-4 py-3">
                        <div className="truncate text-sm font-medium text-walnut-deep">
                          {profile?.full_name || "Tài khoản"}
                        </div>
                        <div className="truncate text-xs text-ink/55">{user.email}</div>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink/80 hover:bg-line/40 hover:text-walnut"
                      >
                        <User className="size-4" /> Hồ sơ của tôi
                      </Link>
                      <button
                        onClick={async () => {
                          setMenuOpen(false);
                          await signOut();
                          navigate({ to: "/", replace: true });
                        }}
                        className="flex w-full items-center gap-2 border-t border-line px-4 py-2.5 text-left text-sm text-ink/80 hover:bg-line/40 hover:text-walnut"
                      >
                        <LogOut className="size-4" /> Đăng xuất
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/auth"
              aria-label="Đăng nhập"
              className="grid size-10 place-items-center rounded-xs text-ink/75 transition-colors duration-500 hover:bg-line/50 hover:text-walnut"
            >
              <User className="size-4.5" />
            </Link>
          )}
          <button
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            className="ml-1 grid size-10 place-items-center rounded-xs text-ink/80 transition hover:bg-line/50 lg:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-line/60 bg-paper transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container-wide flex flex-col gap-1 py-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="font-display text-2xl text-ink/85 hover:text-walnut"
              activeProps={{ className: "text-walnut" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-6 pt-6 border-t border-line/60">
            <LanguageSwitcher compact />
          </div>
        </nav>
      </div>
    </header>
  );
}

function IconButton({
  label,
  children,
  onClick,
}: {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-xs text-ink/75 transition-colors duration-500 hover:bg-line/50 hover:text-walnut"
    >
      {children}
    </button>
  );
}

function Logo({ scrolled }: { scrolled: boolean }) {
  const { t } = useTranslation();
  return (
    <div className="leading-none">
      <div
        className={cn(
          "font-display font-semibold tracking-tight text-walnut-deep transition-all duration-700",
          scrolled ? "text-lg" : "text-xl md:text-[22px]",
        )}
      >
        Đức Ngân
      </div>
      <div className="mt-0.5 text-[9px] tracking-[0.3em] text-walnut/70 uppercase">
        {t("nav.brandTagline")}
      </div>
    </div>
  );
}
