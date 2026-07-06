import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Đặt lại mật khẩu — Đức Ngân" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase auto-handles the recovery token from URL hash and fires PASSWORD_RECOVERY
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = z
      .object({
        password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự").max(72),
        confirm: z.string(),
      })
      .refine((d) => d.password === d.confirm, { message: "Mật khẩu nhập lại không khớp", path: ["confirm"] })
      .safeParse({ password, confirm });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Đã đổi mật khẩu thành công");
    navigate({ to: "/profile", replace: true });
  };

  return (
    <div className="min-h-dvh bg-paper pt-28 pb-16 md:pt-36">
      <div className="mx-auto w-full max-w-md px-6">
        <div className="text-center">
          <div className="eyebrow">Đức Ngân</div>
          <h1 className="mt-3 font-display text-4xl text-walnut-deep md:text-5xl">Đặt lại mật khẩu</h1>
          <p className="mt-3 text-sm text-ink/65">Nhập mật khẩu mới cho tài khoản của bạn.</p>
        </div>

        {!ready ? (
          <p className="mt-10 text-center text-sm text-ink/60">
            Vui lòng mở liên kết khôi phục từ email để tiếp tục.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-4">
            <Field label="Mật khẩu mới">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm outline-none placeholder:text-ink/35"
                minLength={6}
                maxLength={72}
                required
                autoComplete="new-password"
              />
            </Field>
            <Field label="Nhập lại mật khẩu">
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm outline-none placeholder:text-ink/35"
                minLength={6}
                maxLength={72}
                required
                autoComplete="new-password"
              />
            </Field>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xs bg-walnut px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-walnut-deep disabled:opacity-60"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              Cập nhật mật khẩu
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-widest text-ink/55">{label}</span>
      <div className="flex items-center gap-3 border-b border-line px-1 py-3 transition-colors focus-within:border-walnut">
        <Lock className="size-4 text-ink/45" />
        {children}
      </div>
    </label>
  );
}