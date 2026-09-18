"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { ArrowRight, Mouse } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { HERO_SCROLL_VH, layerSkills, systemLayers } from "@/lib/site";
import {
  motionStore,
  setHeroProgress,
  setPointer,
} from "@/lib/motion-store";
import { cn } from "@/lib/utils";

const HeroCanvas = dynamic(
  () => import("@/components/scene/hero-canvas").then((mod) => mod.HeroCanvas),
  { ssr: false, loading: () => null },
);

function scrollHeroToLayer(index: number) {
  const el = document.getElementById("home");
  if (!el) return;
  const total = Math.max(1, el.offsetHeight - window.innerHeight);
  const y = el.offsetTop + ((index + 0.12) / systemLayers.length) * total;
  window.scrollTo({
    top: y,
    behavior: motionStore.reducedMotion ? "auto" : "smooth",
  });
}

function LayerRail() {
  const { t } = useI18n();
  const railRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hoveredRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  const activeIndex = Math.min(3, Math.floor(progress * 4));
  const shownIndex = hovered ?? activeIndex;
  const shownLayer = systemLayers[shownIndex] ?? "frontend";
  hoveredRef.current = hovered;

  useEffect(() => {
    let frame = 0;
    let lastProgress = -1;
    const tick = () => {
      const next = motionStore.heroProgress;
      if (Math.abs(next - lastProgress) > 0.01) {
        lastProgress = next;
        setProgress(next);
      }

      const reduced = motionStore.reducedMotion;
      const mx = reduced ? 0 : motionStore.mouseX;
      const my = reduced ? 0 : motionStore.mouseY;
      const layer = hoveredRef.current ?? Math.min(3, Math.floor(next * 4));

      const rail = railRef.current;
      if (rail) {
        rail.style.transform = `translate3d(${mx * 14}px, ${my * 10 - next * 36}px, 0)`;
      }
      const skills = skillsRef.current;
      if (skills) {
        skills.style.transform = `translate3d(${mx * -18}px, ${layer * 26 + my * -10}px, 0)`;
      }
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const depth = (index - 1.5) * 8;
        const activeShift = (index - layer) * 4;
        item.style.transform = `translate3d(${mx * depth}px, ${my * depth * 0.4 + activeShift}px, 0)`;
      });

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <aside className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
      <div ref={railRef} className="flex flex-col items-end gap-4 will-change-transform">
        <span className="font-mono text-[10px] text-lime-text">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <div className="relative h-28 w-px bg-line">
          <div
            className="absolute top-0 right-0 w-px bg-lime"
            style={{ height: `${Math.max(8, progress * 100)}%` }}
          />
        </div>

        <div className="relative">
          <div
            ref={skillsRef}
            className="absolute right-full top-0 mr-6 w-28 text-right will-change-transform"
          >
            <ul className="space-y-1">
              {layerSkills[shownLayer].map((skill) => (
                <li
                  key={`${shownLayer}-${skill}`}
                  className="font-mono text-[10px] tracking-[0.08em] text-lime-text/90"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <ul className="space-y-2 text-right" onMouseLeave={() => setHovered(null)}>
            {systemLayers.map((layer, index) => (
              <li key={layer}>
                <button
                  type="button"
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  onMouseEnter={() => setHovered(index)}
                  onClick={() => scrollHeroToLayer(index)}
                  className={cn(
                    "block w-full cursor-pointer text-right font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 will-change-transform",
                    shownIndex === index ? "text-lime-text" : "text-muted/70 hover:text-ink",
                  )}
                >
                  {t.hero.layers[layer]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export function Hero() {
  const { t, locale } = useI18n();
  const { resolvedTheme } = useTheme();
  const pinRef = useRef<HTMLElement>(null);
  const canvasShiftRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [lite, setLite] = useState(true);
  const [progress, setProgress] = useState(0);

  const isDark = resolvedTheme !== "light";
  const activeIndex = Math.min(3, Math.floor(progress * 4));

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      const reduced = reducedMq.matches;
      setShowCanvas(desktop.matches);
      setLite(
        !desktop.matches ||
          (navigator.hardwareConcurrency ?? 8) <= 4 ||
          reduced,
      );
      motionStore.reducedMotion = reduced;
    };

    sync();
    desktop.addEventListener("change", sync);
    reducedMq.addEventListener("change", sync);
    return () => {
      desktop.removeEventListener("change", sync);
      reducedMq.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (window.innerWidth < 1024) return;
      setPointer(
        (event.clientX / window.innerWidth) * 2 - 1,
        (event.clientY / window.innerHeight) * -2 + 1,
      );
    };

    const measure = () => {
      const el = pinRef.current;
      if (!el) return;
      const total = Math.max(1, el.offsetHeight - window.innerHeight);
      const next = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total));
      setHeroProgress(next);
    };

    let frame = 0;
    let last = -1;
    const tick = () => {
      const p = motionStore.heroProgress;
      if (Math.abs(p - last) > 0.008) {
        last = p;
        setProgress(p);
      }

      if (!motionStore.reducedMotion) {
        const canvas = canvasShiftRef.current;
        if (canvas) {
          canvas.style.transform = `translate3d(0, ${p * 48}px, 0) scale(${1 + p * 0.06})`;
        }
        const copy = copyRef.current;
        if (copy) {
          copy.style.transform = `translate3d(0, ${p * -42}px, 0)`;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    measure();
    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      id="home"
      ref={pinRef}
      className="relative h-[240svh] bg-bg md:h-[320svh] lg:h-[var(--hero-scroll)]"
      style={{ ["--hero-scroll" as string]: `${HERO_SCROLL_VH}vh` }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden grain-panel">
        <div
          ref={canvasShiftRef}
          className="pointer-events-none absolute inset-y-0 right-[-4%] z-0 hidden w-[62%] origin-center will-change-transform lg:block"
        >
          {showCanvas ? (
            <div className="absolute inset-0">
              <HeroCanvas isDark={isDark} lite={lite} />
            </div>
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-bg from-0% via-bg/55 via-28% to-transparent to-55%" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-5 pb-20 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:px-8">
          <div ref={copyRef} className="will-change-transform">
            <p className="mb-5 flex max-w-[18rem] items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:mb-6 sm:max-w-none sm:text-[11px] sm:tracking-[0.28em]">
              <span className="h-px w-6 shrink-0 bg-gradient-to-r from-violet to-pop sm:w-8" />
              {t.hero.kicker}
            </p>
            <h1
              className={cn(
                "display max-w-[11ch] font-semibold tracking-tight text-ink text-[clamp(2.35rem,9vw,7.5rem)]",
                locale === "es" ? "leading-[1.08]" : "leading-[0.96] sm:leading-[0.92]",
              )}
            >
              {t.hero.line1}
              <span className="mt-1 block max-w-full bg-gradient-to-r from-lime via-violet to-pop bg-clip-text pr-[0.12em] pb-[0.08em] text-transparent">
                {t.hero.line2}
              </span>
            </h1>

            <div className="relative mt-6 min-h-[11.5rem] max-w-xl sm:mt-7 sm:min-h-[10.5rem]">
              {systemLayers.map((layer, index) => {
                const offset = index - activeIndex;
                const visible = index === activeIndex;
                return (
                  <div
                    key={layer}
                    className="absolute inset-x-0 top-0 transition-[opacity,transform] duration-500 ease-out"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: `translate3d(0, ${offset * 28}px, 0)`,
                      pointerEvents: visible ? "auto" : "none",
                    }}
                  >
                    <p className="kicker mb-3">
                      {String(index + 1).padStart(2, "0")} — {t.hero.layers[layer]}
                    </p>
                    <p className="max-w-md text-base leading-7 text-muted sm:text-lg">
                      {t.hero.layerStories[layer]}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {layerSkills[layer].map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-line bg-bg-elevated/70 px-2.5 py-1 font-mono text-[10px] text-muted"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex max-w-xl flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-[#141714] transition hover:brightness-110"
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-bg-elevated/80 px-5 py-3 text-sm font-medium text-ink transition hover:border-violet/60 hover:text-violet"
              >
                {t.hero.ctaSecondary}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="absolute bottom-6 left-5 flex max-w-[70%] items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-muted sm:bottom-8 sm:left-6 sm:max-w-none sm:text-xs sm:tracking-[0.22em] lg:left-8">
            <Mouse className="h-4 w-4" />
            {t.hero.scroll}
          </div>

          <LayerRail />
        </div>
      </div>
    </section>
  );
}
