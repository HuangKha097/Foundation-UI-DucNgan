import { useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  duration?: string;
  bars?: number;
  className?: string;
  variant?: "card" | "inline" | "minimal";
  tone?: "light" | "dark";
};

function seededBars(count: number) {
  const arr: number[] = [];
  for (let i = 0; i < count; i++) {
    const s = Math.sin(i * 0.7) * 0.5 + Math.cos(i * 0.31) * 0.5;
    arr.push(Math.abs(s) * 0.7 + 0.15);
  }
  return arr;
}

export function Waveform({
  title = "Đàn Tranh — Sample Sound",
  duration = "00:45",
  bars = 48,
  className,
  variant = "card",
  tone = "light",
}: Props) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const heights = seededBars(bars);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 1) {
          setPlaying(false);
          return 0;
        }
        return p + 0.01;
      });
    }, 450);
    return () => clearInterval(id);
  }, [playing]);

  const elapsedSeconds = Math.floor(progress * 45);
  const elapsed = `00:${elapsedSeconds.toString().padStart(2, "0")}`;

  const isDark = tone === "dark";

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause sample" : "Play sample"}
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-full transition",
            isDark
              ? "bg-bamboo text-walnut-deep hover:bg-white"
              : "bg-walnut text-white hover:bg-walnut-deep",
          )}
        >
          {playing ? <Pause className="size-3.5" /> : <Play className="ml-0.5 size-3.5" />}
        </button>
        <div className="flex h-8 min-w-0 flex-1 items-center gap-[2px] overflow-hidden">
          {heights.map((h, i) => {
            const active = i / bars <= progress;
            return (
              <span
                key={i}
                style={{
                  height: `${Math.round(h * 100)}%`,
                  transitionDelay: `${i * 6}ms`,
                }}
                className={cn(
                  "min-w-px flex-1 rounded-full transition-colors duration-500 sm:max-w-[3px]",
                  active
                    ? isDark
                      ? "bg-bamboo"
                      : "bg-walnut"
                    : isDark
                      ? "bg-white/35"
                      : "bg-line",
                )}
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        variant === "card"
          ? "flex items-center gap-4 rounded-xs bg-white/85 p-4 pr-6 shadow-soft backdrop-blur-md sm:gap-5 sm:p-5"
          : "flex items-center gap-4",
        className,
      )}
    >
      <button
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? "Pause sample" : "Play sample"}
        className={cn(
          "grid size-11 shrink-0 place-items-center rounded-xs transition sm:size-12",
          isDark
            ? "bg-bamboo text-walnut-deep hover:bg-white"
            : "bg-walnut text-white hover:bg-walnut-deep",
        )}
      >
        {playing ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4" />}
      </button>
      <div className="min-w-0 flex-1">
        <div
          className={cn(
            "mb-1.5 flex items-center justify-between gap-3 text-[11px] tracking-wide uppercase",
            isDark ? "text-white/60" : "text-ink/60",
          )}
        >
          <span className="truncate font-medium">{title}</span>
          <span className="tabular-nums">
            {elapsed} / {duration}
          </span>
        </div>
        <div className="flex h-10 min-w-0 items-center gap-[2px] overflow-hidden">
          {heights.map((h, i) => {
            const active = i / bars <= progress;
            return (
              <span
                key={i}
                style={{
                  height: `${Math.round(h * 100)}%`,
                  transitionDelay: `${i * 6}ms`,
                }}
                className={cn(
                  "min-w-0 flex-1 rounded-full transition-colors duration-500 sm:max-w-[4px]",
                  active
                    ? isDark
                      ? "bg-bamboo"
                      : "bg-walnut"
                    : isDark
                      ? "bg-white/20"
                      : "bg-line",
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
