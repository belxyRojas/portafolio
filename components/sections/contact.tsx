"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/social-icons";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error" | "unconfigured";

export function Contact() {
  const { t, locale } = useI18n();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company") || "").trim()) {
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          locale,
        }),
      });

      if (response.status === 503) {
        setStatus("unconfigured");
        return;
      }
      if (!response.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative z-10 scroll-mt-24 bg-transparent py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:gap-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="kicker mb-4">{t.contact.kicker}</p>
          <h2 className="display text-[1.7rem] font-semibold tracking-tight text-ink sm:text-4xl">
            {t.contact.title}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-muted">
            {t.contact.body}
          </p>
          <div className="mt-8 space-y-3 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="flex items-start gap-2 break-all text-ink hover:text-lime-text sm:items-center sm:break-normal"
            >
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-lime-text sm:mt-0" />
              {site.email}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-muted hover:text-lime-text"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </a>
            <p className="pt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {t.contact.locationLabel} · {site.location[locale]}
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="card-surface rounded-3xl p-5 sm:p-6">
          <label className="sr-only" htmlFor="company">
            Company
          </label>
          <input
            id="company"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs text-muted">
              {t.contact.name}
              <input
                required
                name="name"
                className="mt-2 w-full rounded-xl border border-line bg-bg px-3 py-2.5 text-sm text-ink outline-none focus:border-lime"
              />
            </label>
            <label className="block text-xs text-muted">
              {t.contact.email}
              <input
                required
                type="email"
                name="email"
                className="mt-2 w-full rounded-xl border border-line bg-bg px-3 py-2.5 text-sm text-ink outline-none focus:border-lime"
              />
            </label>
          </div>
          <label className="mt-4 block text-xs text-muted">
            {t.contact.message}
            <textarea
              required
              name="message"
              rows={6}
              minLength={12}
              className="mt-2 w-full resize-none rounded-xl border border-line bg-bg px-3 py-2.5 text-sm text-ink outline-none focus:border-lime"
            />
          </label>
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-[#141714] disabled:opacity-60"
          >
            {status === "sending" ? t.contact.sending : t.contact.submit}
            <ArrowRight className="h-4 w-4" />
          </button>
          {status === "success" ? (
            <p className="mt-4 text-sm text-lime-text">{t.contact.success}</p>
          ) : null}
          {status === "error" ? (
            <p className="mt-4 text-sm text-pop">{t.contact.error}</p>
          ) : null}
          {status === "unconfigured" ? (
            <p className="mt-4 text-sm text-muted">
              {t.contact.unconfigured}{" "}
              <a className="text-lime-text" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
