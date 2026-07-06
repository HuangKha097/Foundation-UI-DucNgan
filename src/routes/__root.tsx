import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { LenisProvider } from "@/components/site/LenisProvider";
import { FloatingActions } from "@/components/site/FloatingActions";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/site/CartDrawer";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { useTranslation } from "react-i18next";
import "@/i18n";
import { syncLangFromStorage } from "@/i18n";

function NotFoundComponent() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-dvh items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <div className="eyebrow">{t("notFound.eyebrow")}</div>
        <h1 className="mt-4 font-display text-5xl text-walnut-deep">
          {t("notFound.title")}
        </h1>
        <p className="mt-4 text-sm text-ink/65">
          {t("notFound.body")}
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xs bg-walnut px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-walnut-deep"
          >
            {t("notFound.home")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { t } = useTranslation();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-walnut-deep">
          {t("error.title")}
        </h1>
        <p className="mt-3 text-sm text-ink/65">
          {t("error.body")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xs bg-walnut px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-walnut-deep"
          >
            {t("error.retry")}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xs border border-walnut/40 bg-transparent px-5 py-2.5 text-sm font-medium text-walnut-deep transition-colors hover:bg-walnut hover:text-white"
          >
            {t("error.home")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Đức Ngân — Vietnamese Traditional Instruments" },
      {
        name: "description",
        content:
          "Handcrafted Vietnamese traditional musical instruments. Đàn Tranh, Đàn Bầu, Đàn Tỳ Bà and more, made by master artisans with 30+ years of dedication.",
      },
      { name: "author", content: "Đức Ngân" },
      { name: "theme-color", content: "#F7F5F1" },
      { property: "og:title", content: "Đức Ngân — Vietnamese Traditional Instruments" },
      {
        property: "og:description",
        content:
          "A quiet showroom of handcrafted Vietnamese instruments. Timeless traditions, handcrafted for generations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Be+Vietnam+Pro:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { t } = useTranslation();
  useEffect(() => {
    syncLangFromStorage();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <CartProvider>
        <LenisProvider />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:rounded-xs focus:bg-walnut focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          {t("skip")}
        </a>
        <Navbar />
        <main id="main" className="pt-0">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
        <CartDrawer />
        <Toaster position="bottom-right" />
        <FloatingActions />
      </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
