"use client";

import { useActionState, useState } from "react";
import { ArrowRight, Eye, EyeOff, KeyRound } from "lucide-react";
import { unlockVault, type VaultActionState } from "@/app/vault/actions";
import { KnotMark } from "@/components/knot-mark";
import { VaultChrome } from "@/components/vault/vault-chrome";
import { useI18n } from "@/lib/i18n";

function SplitLine({ text }: { text: string }) {
  return (
    <span>
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="vault-char-in"
          style={{ animationDelay: `${index * 28}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export function VaultGate() {
  const { t } = useI18n();
  const [state, action, pending] = useActionState<VaultActionState, FormData>(
    unlockVault,
    null,
  );
  const [visible, setVisible] = useState(false);
  const [length, setLength] = useState(0);
  const scale = 1 + Math.min(length, 16) * 0.012;

  return (
    <>
      <VaultChrome locked />
      <main className="relative flex min-h-dvh items-center justify-center overflow-hidden grain-panel px-5 pt-24 pb-16 sm:px-6">
        <div className="vault-knot-spin pointer-events-none absolute -right-24 top-[12%] opacity-30 sm:-right-10 sm:opacity-50 lg:right-0">
          <div style={{ transform: `scale(${scale})` }} className="transition-transform duration-700 ease-out">
            <KnotMark
              className="h-56 w-56 sm:h-72 sm:w-72"
              sizes="(min-width: 640px) 18rem, 14rem"
              priority
            />
          </div>
        </div>

        <div className="relative z-10 w-full max-w-lg">
          <p className="kicker mb-5">{t.vault.kicker}</p>
          <h1
            className="display relative z-10 max-w-[11ch] text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
            aria-label={t.vault.gateTitle}
          >
            <SplitLine text={t.vault.gateTitle} />
          </h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-muted sm:text-base">
            {t.vault.gateBody}
          </p>

          <form
            action={action}
            className={state?.ok === false ? "vault-shake mt-10" : "mt-10"}
          >
            <label className="block font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              {t.vault.password}
              <div className="relative mt-3">
                <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-lime-text" />
                <input
                  name="password"
                  type={visible ? "text" : "password"}
                  autoComplete="off"
                  required
                  onChange={(event) => setLength(event.target.value.length)}
                  className="w-full rounded-full border border-line bg-bg-elevated py-3.5 pr-12 pl-11 text-sm text-ink outline-none transition focus:border-lime"
                />
                <button
                  type="button"
                  onClick={() => setVisible((value) => !value)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                  aria-label={visible ? t.vault.hide : t.vault.show}
                >
                  {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            {state?.ok === false ? (
              <p className="mt-3 text-sm text-pop">{t.vault.error}</p>
            ) : null}

            <button
              type="submit"
              disabled={pending}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-[#141714] transition hover:brightness-110 disabled:opacity-60"
            >
              {pending ? t.vault.unlocking : t.vault.unlock}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
