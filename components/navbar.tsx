"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { KnotMark } from "@/components/knot-mark";
import { useI18n } from "@/lib/i18n";
import { navItems, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition",
        scrolled
          ? "border-b border-line/80 bg-bg/75 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2.5">
          <KnotMark className="h-9 w-9" priority />
          <span className="text-sm font-semibold tracking-wide text-ink">
            {site.shortName}
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                "relative text-[13px] transition",
                active === item.id ? "text-ink" : "text-muted hover:text-ink",
              )}
            >
              {t.nav[item.id]}
              {active === item.id ? (
                <span className="absolute -bottom-2 left-0 h-px w-full bg-lime" />
              ) : null}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setLocale(locale === "en" ? "es" : "en")}
            className="rounded-full border border-line px-2 py-1 font-mono text-[11px] text-muted hover:text-lime-text sm:px-2.5"
            aria-label="Toggle language"
          >
            {locale === "en" ? "ES" : "EN"}
          </button>
          <button
            type="button"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="rounded-full border border-line p-2 text-muted hover:text-lime-text"
            aria-label="Toggle theme"
          >
            {mounted && resolvedTheme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>
          <Link href="/vault" className="vault-nav-btn inline-flex items-center rounded-full bg-lime px-3 py-1.5 text-sm font-semibold text-[#141714] transition duration-500 hover:brightness-110">
            {t.nav.vault}
          </Link>
          <a
            href={site.resume}
            download={site.resumeFileName}
            className="hidden items-center gap-2 rounded-full border border-lime/40 px-3 py-1.5 text-sm text-ink hover:bg-lime hover:text-[#141714] lg:inline-flex"
          >
            {t.nav.resume}
            <Download className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            className="rounded-full border border-line p-2 text-ink md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-bg/95 px-4 py-4 backdrop-blur-xl sm:px-6 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted hover:text-lime-text"
              >
                {t.nav[item.id]}
              </a>
            ))}
            <Link
              href="/vault"
              onClick={() => setOpen(false)}
              className="vault-nav-btn inline-flex w-fit items-center gap-2 rounded-full bg-lime px-3.5 py-2 text-sm font-semibold text-[#141714]"
            >
              {t.nav.vault}
            </Link>
            <a
              href={site.resume}
              download={site.resumeFileName}
              className="inline-flex items-center gap-2 text-sm text-lime-text"
            >
              {t.nav.resume}
              <Download className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
