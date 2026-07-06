import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
  href?: string;
};

export function MagneticButton({
  children,
  onClick,
  variant = "primary",
  className,
  type = "button",
  ariaLabel,
  href,
}: Props) {
  const ref = useRef<any>(null);

  const handleMove = (e: any) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0,0)";
  };

  const base =
    "group relative inline-flex items-center justify-center gap-3 rounded-xs px-7 py-3.5 text-sm font-medium transition-[transform,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-walnut text-white hover:bg-walnut-deep shadow-soft"
      : "border border-walnut/40 text-walnut-deep hover:bg-walnut hover:text-white";

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        aria-label={ariaLabel}
        className={cn(base, styles, className)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-label={ariaLabel}
      className={cn(base, styles, className)}
    >
      {children}
    </motion.button>
  );
}
