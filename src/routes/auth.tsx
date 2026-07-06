import { createFileRoute, Link, useNavigate, useSearch, redirect } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User as UserIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

const searchSchema = z.object({
  mode: z.enum(["signin", "signup", "forgot"]).optional(),
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Đăng nhập — Đức Ngân" },
      { name: "description", content: "Đăng nhập, đăng ký hoặc khôi phục tài khoản Đức Ngân." },
      { name: "robots", content: "noindex" },
    ],
  }),
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: "/profile" });
  },
  component: AuthPage,
});

type Mode = "signin" | "signup" | "forgot";

function AuthPage() {
  const search = useSearch({ from: "/auth" });
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>(search.mode ?? "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const goAfterAuth = () => {
    const redirectPath = search.redirect && search.redirect.startsWith("/") ? search.redirect : "/profile";
    navigate({ to: redirectPath, replace: true });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const parsed = z.object({
          email: z.string().trim().email("Email không hợp lệ").max(255),
          password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự").max(72),
          fullName: z.string().trim().min(2, "Vui lòng nhập họ tên").max(100),
        }).safeParse({ email, password, fullName });
        if (!parsed.success) {
          toast.error(parsed.error.issues[0].message);
          return;
        }
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/profile`,
            data: { full_name: parsed.data.fullName },
          },
        });
        if (error) {
          toast.error(error.message.includes("already") ? "Email đã được đăng ký" : error.message);
          return;
        }
        toast.success("Đăng ký thành công — chào mừng bạn!");
        goAfterAuth();
      } else if (mode === "signin") {
        const parsed = z.object({
          email: z.string().trim().email("Email không hợp lệ"),
          password: z.string().min(1, "Vui lòng nhập mật khẩu"),
        }).safeParse({ email, password });
        if (!parsed.success) {
          toast.error(parsed.error.issues[0].message);
          return;
        }
        const { error } = await supabase.auth.signInWithPassword(parsed.data);
        if (error) {
          toast.error(error.message.includes("Invalid") ? "Email hoặc mật khẩu không đúng" : error.message);
          return;
        }
        toast.success("Đăng nhập thành công");
        goAfterAuth();
      } else {
        const parsed = z.string().trim().email("Email không hợp lệ").safeParse(email);
        if (!parsed.success) {
          toast.error(parsed.error.issues[0].message);
          return;
        }
        const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success("Đã gửi email khôi phục — kiểm tra hộp thư của bạn");
        setMode("signin");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error("Đăng nhập Google thất bại");
        return;
      }
      if (result.redirected) return;
      goAfterAuth();
    } finally {
      setLoading(false);
    }
  };

  const title =
    mode === "signin" ? "Đăng nhập" : mode === "signup" ? "Tạo tài khoản" : "Quên mật khẩu";
  const sub =
    mode === "signin"
      ? "Chào mừng trở lại Đức Ngân."
      : mode === "signup"
        ? "Gia nhập cộng đồng yêu nhạc cụ truyền thống."
        : "Nhập email — chúng tôi sẽ gửi liên kết khôi phục.";

  return (
    <div className="min-h-dvh bg-paper pt-28 pb-16 md:pt-36">
      <div className="mx-auto w-full max-w-md px-6">
        <div className="text-center">
          <div className="eyebrow">Đức Ngân</div>
          <h1 className="mt-3 font-display text-4xl text-walnut-deep md:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-ink/65">{sub}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          {mode === "signup" && (
            <Field icon={<UserIcon className="size-4" />} label="Họ và tên">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full bg-transparent text-sm outline-none placeholder:text-ink/35"
                maxLength={100}
                required
              />
            </Field>
          )}
          <Field icon={<Mail className="size-4" />} label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ban@example.com"
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink/35"
              maxLength={255}
              required
              autoComplete="email"
            />
          </Field>
          {mode !== "forgot" && (
            <Field icon={<Lock className="size-4" />} label="Mật khẩu">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm outline-none placeholder:text-ink/35"
                minLength={mode === "signup" ? 6 : 1}
                maxLength={72}
                required
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
              />
            </Field>
          )}

          {mode === "signin" && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="text-xs text-ink/60 underline-offset-4 hover:text-walnut hover:underline"
              >
                Quên mật khẩu?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xs bg-walnut px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-walnut-deep disabled:opacity-60"
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            {mode === "signin" ? "Đăng nhập" : mode === "signup" ? "Đăng ký" : "Gửi liên kết"}
          </button>
        </form>

        {mode !== "forgot" && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-line" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-paper px-3 text-xs uppercase tracking-widest text-ink/45">hoặc</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-xs border border-walnut/30 bg-transparent px-6 py-3 text-sm font-medium text-walnut-deep transition-colors hover:bg-walnut hover:text-white disabled:opacity-60"
            >
              <GoogleIcon />
              Tiếp tục với Google
            </button>
          </>
        )}

        <div className="mt-8 text-center text-sm text-ink/65">
          {mode === "signin" && (
            <>
              Chưa có tài khoản?{" "}
              <button onClick={() => setMode("signup")} className="text-walnut hover:underline">
                Đăng ký ngay
              </button>
            </>
          )}
          {mode === "signup" && (
            <>
              Đã có tài khoản?{" "}
              <button onClick={() => setMode("signin")} className="text-walnut hover:underline">
                Đăng nhập
              </button>
            </>
          )}
          {mode === "forgot" && (
            <button onClick={() => setMode("signin")} className="text-walnut hover:underline">
              ← Quay lại đăng nhập
            </button>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-xs text-ink/50 hover:text-walnut">
            ← Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-widest text-ink/55">{label}</span>
      <div className="flex items-center gap-3 border-b border-line px-1 py-3 transition-colors focus-within:border-walnut">
        <span className="text-ink/45">{icon}</span>
        {children}
      </div>
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.3 14.7 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12S6.7 21.6 12 21.6c6.9 0 11.5-4.8 11.5-11.6 0-.8-.1-1.4-.2-1.9H12z"/>
    </svg>
  );
}