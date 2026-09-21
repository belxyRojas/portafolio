"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mouse } from "lucide-react";
import { VaultChrome } from "@/components/vault/vault-chrome";
import { useI18n } from "@/lib/i18n";

type VaultWorkItem = {
  id: string;
  href: string;
  host: string;
  title: string;
  accent: string;
  wash: string;
  ink: string;
  word: string;
  category: { en: string; es: string };
  blurb: { en: string; es: string };
  focus: { en: string[]; es: string[] };
};

type VaultGalleryProps = {
  items: VaultWorkItem[];
};

function jumpTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function VaultGallery({ items }: VaultGalleryProps) {
  const { t, locale } = useI18n();
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const panels = items
      .map((item) => document.getElementById(`work-${item.id}`))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target.id?.replace("work-", "");
        const index = items.findIndex((item) => item.id === id);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-35% 0px -40% 0px", threshold: [0.15, 0.35, 0.6] },
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const onScroll = () => {
      const el = rootRef.current;
      if (!el) return;
      const total = Math.max(1, el.scrollHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, window.scrollY / total)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let revert: (() => void) | undefined;

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        if (reduced) return;

        const panels = gsap.utils.toArray<HTMLElement>("[data-vault-panel]");
        panels.forEach((panel, index) => {
          const poster = panel.querySelector("[data-poster]");
          const copy = panel.querySelector("[data-copy]");

          gsap.fromTo(
            poster,
            { clipPath: "inset(6% 6% 6% 6% round 2.5rem)", scale: 1.025 },
            {
              clipPath: "inset(0% 0% 0% 0% round 2.5rem)",
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top 85%",
                end: "top 32%",
                scrub: 1.35,
              },
            },
          );

          gsap.from(copy, {
            y: 18,
            duration: 1.15,
            ease: "power1.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 78%",
            },
          });

          if (index === panels.length - 1) return;

          gsap.to(panel, {
            scale: 0.975,
            opacity: 0.82,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        });
      }, rootRef);

      revert = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [items.length]);

  return (
    <>
      <VaultChrome locked={false} />
      <div
        className="pointer-events-none fixed inset-x-0 top-16 z-50 h-px bg-line"
        aria-hidden
      >
        <div
          className="h-full bg-lime transition-[width] duration-300 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div ref={rootRef} className="bg-bg">
        <section className="relative flex min-h-[88svh] flex-col justify-end overflow-hidden grain-panel px-5 pb-12 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <p className="kicker mb-5">{t.vault.kicker}</p>
            <h1 className="display max-w-3xl text-[2rem] font-semibold tracking-tight text-ink sm:text-6xl">
              {t.vault.galleryTitle}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted sm:text-base">
              {t.vault.galleryBody}
            </p>

            <div className="mt-10 flex flex-wrap gap-2">
              <span className="rounded-full border border-line bg-bg-elevated/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-lime-text">
                {String(items.length).padStart(2, "0")} {t.vault.sites}
              </span>
              <span className="rounded-full border border-line bg-bg-elevated/70 px-3 py-1.5 font-mono text-[11px] text-muted">
                {t.vault.studio}
              </span>
            </div>

            <div className="mt-12">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                {t.vault.index}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => jumpTo(`work-${item.id}`)}
                    className="group vault-index-card overflow-hidden rounded-2xl border border-line text-left transition duration-500 hover:border-lime/40"
                  >
                    <span
                      className="block h-1.5 w-full"
                      style={{ background: item.accent }}
                    />
                    <span className="flex items-start justify-between gap-2 px-3 py-3">
                      <span>
                        <span className="block font-mono text-[10px] text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="mt-1 block text-sm text-ink group-hover:text-lime-text">
                          {item.title}
                        </span>
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted">
              <Mouse className="h-4 w-4" />
              {t.vault.scrollHint}
            </p>
          </div>
        </section>

        <aside className="pointer-events-none fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 lg:block">
          <nav className="pointer-events-auto flex flex-col items-end gap-2">
            <span className="font-mono text-[10px] text-lime-text">
              {String(active + 1).padStart(2, "0")}
            </span>
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => jumpTo(`work-${item.id}`)}
                className="group flex items-center gap-2"
                aria-label={item.title}
              >
                <span
                  className={`hidden text-right font-mono text-[10px] uppercase tracking-[0.14em] transition-opacity duration-500 xl:block ${
                    active === index ? "text-ink opacity-100" : "text-muted opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {item.word}
                </span>
                <span
                  className="h-px transition-[width,background-color] duration-500"
                  style={{
                    width: active === index ? 28 : 12,
                    background: active === index ? item.accent : "var(--line)",
                  }}
                />
              </button>
            ))}
          </nav>
        </aside>

        <div className="relative">
          {items.map((item, index) => (
            <section
              key={item.id}
              id={`work-${item.id}`}
              data-vault-panel
              className="relative flex min-h-0 origin-top items-center bg-bg px-5 py-16 sm:px-6 lg:sticky lg:top-0 lg:min-h-dvh lg:px-8 lg:py-24"
              style={{ zIndex: index + 1 }}
            >
              <article className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  data-poster
                  className="group relative isolate overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_30px_80px_-32px_rgba(0,0,0,0.55)] sm:rounded-[2.5rem]"
                  style={{ background: item.wash, color: item.ink }}
                >
                  <div className="vault-poster-grid pointer-events-none absolute inset-0 opacity-30" />
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full blur-3xl"
                    style={{ background: item.accent, opacity: 0.35 }}
                  />
                  <div
                    className="pointer-events-none absolute -bottom-16 left-10 h-48 w-48 rounded-full blur-3xl"
                    style={{ background: item.accent, opacity: 0.18 }}
                  />
                  <p
                    className="pointer-events-none absolute -right-2 top-12 display text-[5rem] font-semibold leading-none opacity-[0.07] sm:top-16 sm:text-[9rem]"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div className="relative flex aspect-[16/11] flex-col justify-between p-5 sm:p-10">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/10 px-3 py-1 font-mono text-[10px] tracking-[0.14em]">
                        <span className="flex gap-1" aria-hidden>
                          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
                        </span>
                        {item.host}
                      </span>
                      <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
                        {t.projects.live}
                      </span>
                    </div>
                    <p
                      className="display text-[clamp(2rem,5.2vw,4.4rem)] leading-[0.9] font-semibold tracking-tight"
                      style={{ color: item.accent }}
                    >
                      {item.word}
                    </p>
                    <div className="flex items-end justify-between gap-4">
                      <span className="font-mono text-[11px] uppercase tracking-[0.24em] opacity-80">
                        {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-medium opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        {t.vault.visit}
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </a>

                <div data-copy className="lg:pl-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime-text">
                    {item.category[locale]}
                  </p>
                  <h2 className="display mt-3 text-[1.7rem] font-semibold tracking-tight text-ink sm:text-4xl">
                    {item.title}
                  </h2>
                  <p className="mt-5 max-w-md text-sm leading-7 text-muted">
                    {item.blurb[locale]}
                  </p>
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {t.vault.focus}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.focus[locale].map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-muted"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-7 inline-flex items-center gap-2 rounded-full border border-line bg-bg-elevated px-5 py-3 text-sm text-ink transition duration-500 hover:border-lime/50 hover:text-lime-text"
                  >
                    {t.vault.visit}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
