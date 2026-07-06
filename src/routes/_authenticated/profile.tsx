import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, LogOut, User as UserIcon, Package, KeyRound, MapPin, Phone, Mail, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, getInitials } from "@/context/AuthContext";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Tài khoản của tôi — Đức Ngân" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

type OrderRow = {
  id: string;
  order_code: string;
  status: string;
  payment_method: string;
  item_count: number;
  total: number;
  items: Array<{ name?: string; qty?: number; image?: string; price?: number }>;
  shipping_address: string;
  shipping_city: string | null;
  created_at: string;
};

type Tab = "info" | "orders" | "password";

function ProfilePage() {
  const { user, profile, refreshProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("info");

  const initials = getInitials(profile?.full_name, user?.email);

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/", replace: true });
  };

  return (
    <div className="min-h-dvh bg-paper pt-28 pb-24 md:pt-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-5 border-b border-line pb-10 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="flex items-center gap-5">
            <div className="grid size-20 shrink-0 place-items-center rounded-full bg-walnut text-white md:size-24">
              <span className="font-display text-2xl md:text-3xl">{initials}</span>
            </div>
            <div>
              <div className="eyebrow">Tài khoản</div>
              <h1 className="mt-1 font-display text-3xl text-walnut-deep md:text-4xl">
                {profile?.full_name || "Chào bạn"}
              </h1>
              <p className="mt-1 text-sm text-ink/60">{user?.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-xs border border-walnut/30 px-5 py-2.5 text-sm font-medium text-walnut-deep transition-colors hover:bg-walnut hover:text-white"
          >
            <LogOut className="size-4" /> Đăng xuất
          </button>
        </div>

        {/* Layout: sidebar + content */}
        <div className="mt-10 grid gap-10 md:grid-cols-[220px_1fr]">
          <aside>
            <nav className="flex gap-1 overflow-x-auto md:flex-col md:gap-0.5">
              <TabButton active={tab === "info"} onClick={() => setTab("info")} icon={<UserIcon className="size-4" />} label="Thông tin cá nhân" />
              <TabButton active={tab === "orders"} onClick={() => setTab("orders")} icon={<Package className="size-4" />} label="Đơn hàng của tôi" />
              <TabButton active={tab === "password"} onClick={() => setTab("password")} icon={<KeyRound className="size-4" />} label="Đổi mật khẩu" />
            </nav>
          </aside>
          <section>
            {tab === "info" && <InfoPanel user={user} profile={profile} refreshProfile={refreshProfile} />}
            {tab === "orders" && <OrdersPanel userId={user?.id} />}
            {tab === "password" && <PasswordPanel />}
          </section>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 whitespace-nowrap rounded-xs px-4 py-3 text-left text-sm transition-colors ${
        active ? "bg-walnut text-white" : "text-ink/70 hover:bg-line/50 hover:text-walnut"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

/* ---------------- Info panel ---------------- */

function InfoPanel({
  user,
  profile,
  refreshProfile,
}: {
  user: ReturnType<typeof useAuth>["user"];
  profile: ReturnType<typeof useAuth>["profile"];
  refreshProfile: () => Promise<void>;
}) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name ?? "");
      setPhone(profile.phone ?? "");
      setAddress(profile.address ?? "");
      setCity(profile.city ?? "");
    }
  }, [profile]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const parsed = z
      .object({
        full_name: z.string().trim().min(2, "Họ tên tối thiểu 2 ký tự").max(100),
        phone: z.string().trim().max(20, "Số điện thoại quá dài").optional().or(z.literal("")),
        address: z.string().trim().max(255).optional().or(z.literal("")),
        city: z.string().trim().max(100).optional().or(z.literal("")),
      })
      .safeParse({ full_name: fullName, phone, address, city });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, ...parsed.data }, { onConflict: "id" });
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Đã lưu thông tin");
    await refreshProfile();
  };

  return (
    <div>
      <PanelHeader title="Thông tin cá nhân" subtitle="Cập nhật thông tin liên hệ và địa chỉ giao hàng của bạn." />
      <form onSubmit={handleSave} className="mt-8 grid gap-5 md:grid-cols-2">
          <Field label="Họ và tên" className="md:col-span-2">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              maxLength={100}
              required
              className="w-full bg-transparent text-sm outline-none"
            />
          </Field>
          <Field label="Số điện thoại">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0912 345 678"
              maxLength={20}
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink/35"
            />
          </Field>
          <Field label="Thành phố">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Hà Nội"
              maxLength={100}
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink/35"
            />
          </Field>
          <Field label="Địa chỉ giao hàng" className="md:col-span-2">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Số nhà, đường, phường/xã, quận/huyện"
              maxLength={255}
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink/35"
            />
          </Field>

          <div className="mt-4 md:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xs bg-walnut px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-walnut-deep disabled:opacity-60"
            >
              {saving && <Loader2 className="size-4 animate-spin" />}
              Lưu thay đổi
            </button>
          </div>
        </form>

      {/* Contact summary */}
      <div className="mt-10 grid gap-3 rounded-xs border border-line bg-white/50 p-6 text-sm text-ink/70">
        <div className="flex items-center gap-2"><Mail className="size-4 text-walnut/70" /> {user?.email}</div>
        {profile?.phone && <div className="flex items-center gap-2"><Phone className="size-4 text-walnut/70" /> {profile.phone}</div>}
        {(profile?.address || profile?.city) && (
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 text-walnut/70" />
            <span>{[profile.address, profile.city].filter(Boolean).join(", ")}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Orders panel ---------------- */

function OrdersPanel({ userId }: { userId: string | undefined }) {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      setLoading(false);
      if (error) {
        toast.error("Không tải được đơn hàng");
        return;
      }
      setOrders((data as unknown as OrderRow[]) ?? []);
    })();
  }, [userId]);

  return (
    <div>
      <PanelHeader title="Đơn hàng của tôi" subtitle="Xem lại toàn bộ đơn hàng đã đặt." />
      {loading ? (
        <div className="mt-8 flex items-center justify-center py-16"><Loader2 className="size-6 animate-spin text-walnut" /></div>
      ) : orders.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((o) => <OrderCard key={o.id} order={o} />)}
        </div>
      )}
    </div>
  );
}

function OrderCard({ order }: { order: OrderRow }) {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(order.created_at).toLocaleDateString("vi-VN", {
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
  return (
    <div className="overflow-hidden rounded-xs border border-line bg-white/60 transition-colors hover:border-walnut/40">
      <button onClick={() => setExpanded((v) => !v)} className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs tracking-wider text-walnut-deep">#{order.order_code}</span>
            <StatusBadge status={order.status} />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink/55">
            <span className="flex items-center gap-1"><Calendar className="size-3" /> {date}</span>
            <span>· {order.item_count} sản phẩm</span>
            <span>· {paymentLabel(order.payment_method)}</span>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="font-display text-lg text-walnut-deep">{formatVnd(order.total)}</div>
          <div className="mt-1 text-[10px] uppercase tracking-widest text-ink/45">{expanded ? "Thu gọn" : "Chi tiết"}</div>
        </div>
      </button>
      {expanded && (
        <div className="border-t border-line bg-paper/40 px-5 py-5">
          <div className="space-y-3">
            {order.items.map((it, i) => (
              <div key={i} className="flex items-center gap-3">
                {it.image && <img src={it.image} alt="" className="size-14 shrink-0 rounded-xs object-cover" />}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm text-walnut-deep">{it.name}</div>
                  <div className="text-xs text-ink/55">SL: {it.qty} · {formatVnd((it.price ?? 0) * (it.qty ?? 1))}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-line pt-4 text-xs text-ink/65">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-3.5 text-walnut/70" />
              <span>{order.shipping_address}{order.shipping_city ? `, ${order.shipping_city}` : ""}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    pending: { label: "Chờ xử lý", cls: "bg-amber-100 text-amber-800" },
    confirmed: { label: "Đã xác nhận", cls: "bg-blue-100 text-blue-800" },
    shipped: { label: "Đang giao", cls: "bg-indigo-100 text-indigo-800" },
    completed: { label: "Hoàn tất", cls: "bg-emerald-100 text-emerald-800" },
    cancelled: { label: "Đã huỷ", cls: "bg-rose-100 text-rose-800" },
  };
  const s = map[status] ?? { label: status, cls: "bg-line text-ink/70" };
  return <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${s.cls}`}>{s.label}</span>;
}

function paymentLabel(m: string) {
  return m === "cod" ? "Tiền mặt khi nhận" : m === "bank" ? "Chuyển khoản" : m === "card" ? "Thẻ" : m;
}

function formatVnd(n: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);
}

function EmptyState() {
  return (
    <div className="mt-10 rounded-xs border border-dashed border-line bg-white/40 py-16 text-center">
      <Package className="mx-auto size-8 text-walnut/40" />
      <p className="mt-4 text-sm text-ink/60">Bạn chưa có đơn hàng nào.</p>
      <a href="/shop" className="mt-5 inline-flex items-center rounded-xs bg-walnut px-6 py-2.5 text-sm text-white hover:bg-walnut-deep">
        Khám phá cửa hàng
      </a>
    </div>
  );
}

/* ---------------- Password panel ---------------- */

function PasswordPanel() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = z
      .object({ password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự").max(72), confirm: z.string() })
      .refine((d) => d.password === d.confirm, { message: "Mật khẩu nhập lại không khớp", path: ["confirm"] })
      .safeParse({ password, confirm });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Đã đổi mật khẩu");
    setPassword(""); setConfirm("");
  };

  return (
    <div>
      <PanelHeader title="Đổi mật khẩu" subtitle="Chọn mật khẩu mới cho tài khoản của bạn." />
      <form onSubmit={handleSubmit} className="mt-8 max-w-md space-y-5">
        <Field label="Mật khẩu mới">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} maxLength={72} required className="w-full bg-transparent text-sm outline-none" />
        </Field>
        <Field label="Nhập lại mật khẩu">
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} minLength={6} maxLength={72} required className="w-full bg-transparent text-sm outline-none" />
        </Field>
        <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-xs bg-walnut px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-walnut-deep disabled:opacity-60">
          {saving && <Loader2 className="size-4 animate-spin" />}
          Cập nhật mật khẩu
        </button>
      </form>
    </div>
  );
}

function PanelHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="border-b border-line pb-5">
      <h2 className="font-display text-2xl text-walnut-deep">{title}</h2>
      <p className="mt-1 text-sm text-ink/60">{subtitle}</p>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs uppercase tracking-widest text-ink/55">{label}</span>
      <div className="border-b border-line px-1 py-3 transition-colors focus-within:border-walnut">
        {children}
      </div>
    </label>
  );
}