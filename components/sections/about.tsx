"use client";

import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

export function About() {
  const { t, locale } = useI18n();

  return (
    <section id="about" className="relative z-10 scroll-mt-24 bg-transparent py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:gap-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div>
          <p className="kicker mb-4">{t.about.kicker}</p>
          <h2 className="display max-w-xl text-[1.7rem] font-semibold tracking-tight text-ink sm:text-4xl">
            {t.about.title}
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-muted sm:text-base">
            <p>{t.about.body}</p>
            <p>{t.about.body2}</p>
            <p>{t.about.body3}</p>
          </div>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {site.location[locale]}
          </p>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-3">
            {t.about.stats.map((stat) => (
              <div key={stat.label} className="card-surface rounded-2xl p-4">
                <p className="display text-2xl text-lime-text">{stat.value}</p>
                <p className="mt-1 text-xs text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="card-surface rounded-2xl p-5">
            <p className="kicker mb-4">{t.about.educationTitle}</p>
            <ul className="space-y-4">
              {t.education.slice(0, 4).map((item) => (
                <li key={`${item.school}-${item.period}`}>
                  <p className="text-sm text-ink">{item.program}</p>
                  <p className="text-xs leading-5 text-muted">
                    {item.school} · {item.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
