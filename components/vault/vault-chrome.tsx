"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { KnotMark } from "@/components/knot-mark";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

export function VaultChrome() {
  const { t, locale, setLocale } = useI18n();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <KnotMark className="h-9 w-9" priority />
          <span className="text-sm font-semibold tracking-wide text-ink">
            {site.shortName}
            <span className="hidden text-muted sm:inline"> / {t.vault.kicker}</span>
          </span>
        </Link>

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
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-full border border-line p-2 text-muted hover:text-lime-text"
            aria-label="Toggle theme"
          >
            {mounted && resolvedTheme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
