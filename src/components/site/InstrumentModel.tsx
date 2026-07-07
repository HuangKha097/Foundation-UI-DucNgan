import { useEffect, useRef, useState } from "react";

// Lazy client-only registration of the <model-viewer> custom element
let loader: Promise<void> | null = null;
function ensureModelViewer() {
  if (typeof window === "undefined") return Promise.resolve();
  if (loader) return loader;
  loader = import("@google/model-viewer").then(() => undefined);
  return loader;
}

type Props = {
  src: string;
  alt: string;
  active?: boolean;
  className?: string;
  cameraOrbit?: string;
};

export function InstrumentModel({
  src,
  alt,
  active = true,
  className,
  cameraOrbit = "20deg 78deg 105%",
}: Props) {
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    ensureModelViewer().then(() => mounted && setReady(true));
    return () => {
      mounted = false;
    };
  }, []);

  if (!ready) {
    return <div ref={ref} className={className} aria-label={alt} />;
  }

  // Custom element — JSX doesn't know about it, so cast
  const MV = "model-viewer" as unknown as React.ElementType;
  return (
    <MV
      src={src}
      alt={alt}
      camera-controls={active ? true : undefined}
      auto-rotate={active ? true : undefined}
      {...(active ? { "auto-rotate-delay": "1200", "rotation-per-second": "18deg" } : {})}
      interaction-prompt="none"
      disable-zoom={active ? undefined : true}
      camera-orbit={cameraOrbit}
      exposure="1.1"
      shadow-intensity="1.2"
      shadow-softness="0.9"
      environment-image="neutral"
      className={className}
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
        "--poster-color": "transparent",
      } as React.CSSProperties}
    />
  );
}