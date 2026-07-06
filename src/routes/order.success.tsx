import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Package, Mail, Truck } from "lucide-react";
import { formatPrice } from "@/data/instruments";
import { Trans, useTranslation } from "react-i18next";

type OrderSummary = {
  id: string;
  placedAt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    note?: string;
  };
  payment: string;
  items: {
    slug: string;
    name: string;
    price: number;
    image: string;
    category: string;
    qty: number;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
};

export const Route = createFileRoute("/order/success")({
  head: () => ({
    meta: [
      { title: "Order confirmed · Đức Ngân" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const [order, setOrder] = useState<OrderSummary | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("dn.lastOrder");
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
  }, []);

  return (
    <div className="pt-32 pb-32">
      <div className="container-wide max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto grid size-20 place-items-center rounded-full bg-walnut text-white"
          >
            <Check className="size-8" strokeWidth={2.4} />
          </motion.div>
          <div className="eyebrow mt-8">{t("order.eyebrow")}</div>
          <h1 className="mt-5 font-display text-5xl leading-[1] text-walnut-deep md:text-6xl">
            {t("order.title")}
          </h1>
          {order ? (
            <p className="mt-6 text-[15px] text-ink/65">
              <Trans
                i18nKey="order.confirmedWithEmail"
                values={{ id: order.id, email: order.customer.email }}
                components={{ b: <span className="text-walnut-deep" /> }}
              />
            </p>
          ) : (
            <p className="mt-6 text-[15px] text-ink/65">
              {t("order.confirmedGeneric")}
            </p>
          )}
        </motion.div>

        {/* Next steps */}
        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Mail,
              title: t("order.step1Title"),
              desc: t("order.step1Desc"),
            },
            {
              icon: Package,
              title: t("order.step2Title"),
              desc: t("order.step2Desc"),
            },
            {
              icon: Truck,
              title: t("order.step3Title"),
              desc: t("order.step3Desc"),
            },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="rounded-xs border border-line bg-white p-6"
            >
              <span className="grid size-10 place-items-center rounded-xs border border-bamboo/50 text-walnut">
                <s.icon className="size-4" />
              </span>
              <div className="mt-4 font-display text-xl text-walnut-deep">
                {s.title}
              </div>
              <p className="mt-2 text-sm text-ink/60">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Order details */}
        {order && (
          <div className="mt-14 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="eyebrow">{t("order.itemsEyebrow", { count: order.items.length })}</div>
              <ul className="mt-4 divide-y divide-line rounded-xs border border-line bg-white">
                {order.items.map((it) => (
                  <li key={it.slug} className="flex gap-4 p-5">
                    <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-xs bg-secondary">
                      <img
                        src={it.image}
                        alt={it.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="text-[10px] tracking-[0.2em] text-ink/50 uppercase">
                        {it.category}
                      </div>
                      <div className="mt-0.5 font-display text-lg text-walnut-deep">
                        {it.name}
                      </div>
                      <div className="mt-auto text-sm text-ink/60 tabular-nums">
                        {formatPrice(it.price)} × {it.qty}
                      </div>
                    </div>
                    <div className="text-right font-display text-base text-walnut-deep tabular-nums">
                      {formatPrice(it.price * it.qty)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-5">
              <div className="eyebrow">{t("order.summaryEyebrow")}</div>
              <div className="mt-4 rounded-xs border border-line bg-white p-6 text-sm">
                <Row label={t("checkout.subtotal")} value={formatPrice(order.subtotal)} />
                <Row
                  label={t("checkout.shipping")}
                  value={order.shipping === 0 ? t("checkout.free") : formatPrice(order.shipping)}
                />
                <Row label={t("order.payment")} value={paymentLabel(order.payment, t)} />
                <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
                  <span className="text-xs tracking-[0.2em] text-ink/60 uppercase">
                    {t("checkout.total")}
                  </span>
                  <span className="font-display text-2xl text-walnut-deep tabular-nums">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-xs border border-line bg-white p-6 text-sm text-ink/70">
                <div className="eyebrow !text-walnut/70">{t("order.shipTo")}</div>
                <div className="mt-3 text-walnut-deep">{order.customer.name}</div>
                <div>{order.customer.address}</div>
                <div>{order.customer.city}</div>
                <div className="mt-2 text-ink/55">{order.customer.phone}</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/shop"
            className="group inline-flex items-center gap-3 rounded-xs bg-walnut-deep px-6 py-3.5 text-sm font-medium text-white transition hover:bg-walnut"
          >
            {t("order.continueBrowsing")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xs border border-line px-6 py-3.5 text-sm text-walnut-deep transition hover:bg-white"
          >
            {t("order.backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function paymentLabel(v: string, t: (k: string) => string) {
  if (v === "cod") return t("checkout.pay.codTitle");
  if (v === "bank") return t("checkout.pay.bankTitle");
  if (v === "card") return t("checkout.pay.cardTitle");
  return v;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between py-1 text-ink/70">
      <span>{label}</span>
      <span className="tabular-nums text-walnut-deep">{value}</span>
    </div>
  );
}