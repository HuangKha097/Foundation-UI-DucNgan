import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, ShieldCheck, Truck, Wallet } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/instruments";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout · Đức Ngân" },
      {
        name: "description",
        content:
          "Complete your order of handcrafted Vietnamese traditional instruments.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

type PaymentMethod = "cod" | "bank" | "card";

function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, count, clear } = useCart();
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [submitting, setSubmitting] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuth();

  const shipping = items.length === 0 ? 0 : subtotal > 20_000_000 ? 0 : 250_000;
  const total = subtotal + shipping;

  const orderId = useMemo(
    () => "DN-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    [],
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const summary = {
      id: orderId,
      placedAt: new Date().toISOString(),
      customer: {
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        phone: String(form.get("phone") ?? ""),
        address: String(form.get("address") ?? ""),
        city: String(form.get("city") ?? ""),
        note: String(form.get("note") ?? ""),
      },
      payment,
      items,
      subtotal,
      shipping,
      total,
    };
    try {
      sessionStorage.setItem("dn.lastOrder", JSON.stringify(summary));
    } catch {}
    // Persist to database if the user is logged in
    if (user) {
      try {
        await supabase.from("orders").insert({
          user_id: user.id,
          order_code: orderId,
          status: "pending",
          customer_name: summary.customer.name,
          customer_email: summary.customer.email,
          customer_phone: summary.customer.phone,
          shipping_address: summary.customer.address,
          shipping_city: summary.customer.city,
          note: summary.customer.note || null,
          payment_method: payment,
          items: JSON.parse(JSON.stringify(items)),
          item_count: count,
          subtotal,
          shipping_fee: shipping,
          total,
        });
      } catch (err) {
        console.error("Failed to save order", err);
      }
    } else {
      await new Promise((r) => setTimeout(r, 500));
    }
    clear();
    navigate({ to: "/order/success" });
  }

  if (count === 0) {
    return (
      <div className="container-wide pt-40 pb-32 text-center">
        <div className="eyebrow">{t("checkout.emptyEyebrow")}</div>
        <h1 className="mt-4 font-display text-5xl text-walnut-deep">
          {t("checkout.emptyTitle")}
        </h1>
        <p className="mt-4 text-sm text-ink/60">
          {t("checkout.emptyBody")}
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-xs bg-walnut px-6 py-3 text-sm font-medium text-white transition hover:bg-walnut-deep"
        >
          {t("checkout.emptyCta")}
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-32">
      <div className="container-wide">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-ink/60 uppercase transition hover:text-walnut-deep"
        >
          <ArrowLeft className="size-3.5" />
          {t("checkout.backShop")}
        </Link>

        <div className="mt-6 flex items-end justify-between gap-6 border-b border-line pb-8">
          <div>
            <div className="eyebrow">{t("checkout.eyebrow")}</div>
            <h1 className="mt-4 font-display text-5xl leading-[1] text-walnut-deep md:text-6xl">
              {t("checkout.title")}
            </h1>
          </div>
          <div className="hidden text-right text-xs tracking-[0.2em] text-ink/50 uppercase md:block">
            {t("checkout.orderLabel")} · {orderId}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16"
        >
          {/* Left: forms */}
          <div className="space-y-14 lg:col-span-7">
            <Section
              step="01"
              title={t("checkout.section.contact")}
              subtitle={t("checkout.section.contactSub")}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t("checkout.field.name")} name="name" required autoComplete="name" />
                <Field
                  label={t("checkout.field.email")}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
                <Field
                  label={t("checkout.field.phone")}
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className="sm:col-span-2"
                />
              </div>
            </Section>

            <Section
              step="02"
              title={t("checkout.section.shipping")}
              subtitle={t("checkout.section.shippingSub")}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label={t("checkout.field.address")}
                  name="address"
                  required
                  autoComplete="street-address"
                  className="sm:col-span-2"
                  placeholder={t("checkout.field.addressPh")}
                />
                <Field
                  label={t("checkout.field.city")}
                  name="city"
                  required
                  autoComplete="address-level2"
                />
                <Field label={t("checkout.field.postal")} name="postal" autoComplete="postal-code" />
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-medium tracking-[0.24em] text-ink/60 uppercase">
                    {t("checkout.field.note")}
                  </label>
                  <textarea
                    name="note"
                    rows={3}
                    placeholder={t("checkout.field.notePh")}
                    className="mt-2 w-full resize-none rounded-xs border border-line bg-white px-4 py-3 text-sm text-walnut-deep placeholder:text-ink/40 focus:border-walnut focus:outline-none"
                  />
                </div>
              </div>
            </Section>

            <Section
              step="03"
              title={t("checkout.section.payment")}
              subtitle={t("checkout.section.paymentSub")}
            >
              <div className="grid gap-3">
                <PaymentOption
                  active={payment === "cod"}
                  onClick={() => setPayment("cod")}
                  icon={<Wallet className="size-4" />}
                  title={t("checkout.pay.codTitle")}
                  desc={t("checkout.pay.codDesc")}
                />
                <PaymentOption
                  active={payment === "bank"}
                  onClick={() => setPayment("bank")}
                  icon={<ShieldCheck className="size-4" />}
                  title={t("checkout.pay.bankTitle")}
                  desc={t("checkout.pay.bankDesc")}
                />
                <PaymentOption
                  active={payment === "card"}
                  onClick={() => setPayment("card")}
                  icon={<Truck className="size-4" />}
                  title={t("checkout.pay.cardTitle")}
                  desc={t("checkout.pay.cardDesc")}
                />
              </div>
            </Section>
          </div>

          {/* Right: summary */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-xs border border-line bg-white/70 p-6">
                <div className="text-[10px] font-medium tracking-[0.28em] text-walnut uppercase">
                  {t("checkout.summaryEyebrow")}
                </div>
                <ul className="mt-5 divide-y divide-line">
                  {items.map((it) => (
                    <li key={it.slug} className="flex gap-4 py-4 first:pt-0">
                      <div className="relative aspect-square w-20 shrink-0">
                        <div className="h-full w-full overflow-hidden rounded-xs bg-secondary">
                          <img
                            src={it.image}
                            alt={it.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="absolute -top-1.5 -right-1.5 z-10 grid size-5 place-items-center rounded-full bg-walnut-deep text-[10px] font-medium text-white shadow-sm ring-2 ring-paper">
                          {it.qty}
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="text-[10px] tracking-[0.2em] text-ink/50 uppercase">
                          {it.category}
                        </div>
                        <div className="mt-0.5 truncate font-display text-base text-walnut-deep">
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

                <div className="mt-5 space-y-2 border-t border-line pt-5 text-sm">
                  <Row label={t("checkout.subtotal")} value={formatPrice(subtotal)} />
                  <Row
                    label={t("checkout.shipping")}
                    value={shipping === 0 ? t("checkout.free") : formatPrice(shipping)}
                  />
                  <div className="mt-3 flex items-baseline justify-between border-t border-line pt-4">
                    <span className="text-xs tracking-[0.2em] text-ink/60 uppercase">
                      {t("checkout.total")}
                    </span>
                    <span className="font-display text-2xl text-walnut-deep tabular-nums">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileTap={{ scale: 0.99 }}
                className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-xs bg-walnut-deep px-6 py-4 text-sm font-medium tracking-wide text-white transition hover:bg-walnut disabled:opacity-60"
              >
                {submitting
                  ? t("checkout.placing")
                  : t("checkout.placeOrder", { total: formatPrice(total) })}
              </motion.button>
              <p className="mt-3 flex items-center justify-center gap-2 text-[11px] tracking-[0.16em] text-ink/50 uppercase">
                <ShieldCheck className="size-3.5" />
                {t("checkout.secure")}
              </p>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}

function Section({
  step,
  title,
  subtitle,
  children,
}: {
  step: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-6 flex items-baseline gap-4 border-b border-line pb-3">
        <span className="font-display text-2xl text-walnut">{step}</span>
        <div>
          <h2 className="font-display text-2xl text-walnut-deep">{title}</h2>
          {subtitle && <p className="text-xs text-ink/55">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  placeholder,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={"block " + (className ?? "")}>
      <span className="block text-[10px] font-medium tracking-[0.24em] text-ink/60 uppercase">
        {label}
        {required && <span className="ml-1 text-walnut">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xs border border-line bg-white px-4 py-3 text-sm text-walnut-deep placeholder:text-ink/40 focus:border-walnut focus:outline-none"
      />
    </label>
  );
}

function PaymentOption({
  active,
  onClick,
  icon,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex items-center gap-4 rounded-xs border p-4 text-left transition " +
        (active
          ? "border-walnut bg-white shadow-soft"
          : "border-line bg-white/50 hover:border-walnut/60 hover:bg-white")
      }
    >
      <span
        className={
          "grid size-10 shrink-0 place-items-center rounded-xs " +
          (active
            ? "bg-walnut text-white"
            : "bg-secondary text-walnut-deep")
        }
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="font-display text-base text-walnut-deep">{title}</div>
        <div className="text-xs text-ink/60">{desc}</div>
      </div>
      <span
        className={
          "grid size-5 place-items-center rounded-full border " +
          (active
            ? "border-walnut bg-walnut text-white"
            : "border-line bg-white")
        }
      >
        {active && <Check className="size-3" />}
      </span>
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between text-ink/70">
      <span>{label}</span>
      <span className="tabular-nums text-walnut-deep">{value}</span>
    </div>
  );
}