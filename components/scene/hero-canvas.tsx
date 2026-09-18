"use client";

import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping } from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import { KnotScene } from "@/components/scene/knot-scene";

type HeroCanvasProps = {
  lite?: boolean;
  isDark?: boolean;
};

function detectLite() {
  if (typeof window === "undefined") return true;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 900;
  const weak = (navigator.hardwareConcurrency ?? 8) <= 4;
  return coarse || narrow || weak;
}

function detectTheme(): "dark" | "light" {
  if (typeof document === "undefined") return "dark";
  const el = document.documentElement;
  if (el.classList.contains("light")) return "light";
  if (el.classList.contains("dark")) return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function HeroCanvas({
  lite: liteProp,
  isDark,
}: HeroCanvasProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const [liteDetected, setLiteDetected] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">(
    isDark === false ? "light" : "dark",
  );
  const [active, setActive] = useState(true);

  const lite = liteProp ?? liteDetected;

  useEffect(() => {
    if (liteProp === undefined) setLiteDetected(detectLite());
    if (isDark === undefined) setTheme(detectTheme());
    else setTheme(isDark ? "dark" : "light");

    setActive(true);

    const mo = new MutationObserver(() => {
      if (isDark === undefined) setTheme(detectTheme());
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && !document.hidden),
      { threshold: 0, rootMargin: "120px" },
    );
    if (wrap.current) io.observe(wrap.current);

    const onVis = () => {
      if (document.hidden) setActive(false);
      else setActive(true);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      mo.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [isDark, liteProp]);

  return (
    <div ref={wrap} className="absolute inset-0 h-full w-full" aria-hidden="true">
      <Canvas
        className="h-full w-full"
        frameloop={active ? "always" : "never"}
        dpr={lite ? 1 : [1, 1.5]}
        resize={{ scroll: false, debounce: { scroll: 0, resize: 80 } }}
        camera={{ position: [0, 0, 6], fov: 35, near: 0.1, far: 30 }}
        gl={{
          alpha: true,
          antialias: !lite,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          gl.setClearAlpha(0);
          scene.background = null;
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.92;
        }}
        style={{ pointerEvents: "none", touchAction: "none" }}
      >
        <Suspense fallback={null}>
          <KnotScene lite={lite} theme={theme} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default HeroCanvas;
