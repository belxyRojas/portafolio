"use client";

import { useI18n } from "@/lib/i18n";

export function Experience() {
  const { t } = useI18n();

  return (
    <section id="experience" className="relative z-10 scroll-mt-24 section-wash-deep py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <p className="kicker mb-4">{t.experience.kicker}</p>
        <h2 className="display max-w-2xl text-[1.7rem] font-semibold tracking-tight text-ink sm:text-4xl">
          {t.experience.title}
        </h2>
        <ol className="mt-12 space-y-6">
          {t.experience.items.map((job, index) => (
            <li
              key={job.company}
              className="card-surface relative rounded-3xl p-5 pl-7 sm:p-6 sm:pl-8"
            >
              <span
                className={`absolute top-7 left-3 h-2.5 w-2.5 rounded-full ${
                  index === 0 ? "bg-lime" : "bg-violet"
                }`}
              />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-lg text-ink">{job.role}</h3>
                  <p className="text-sm text-lime-text">
                    {job.href ? (
                      <a href={job.href} target="_blank" rel="noreferrer">
                        {job.company}
                      </a>
                    ) : (
                      job.company
                    )}
                  </p>
                </div>
                <p className="font-mono text-xs text-muted">{job.period}</p>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <p className="mt-4 break-words font-mono text-[11px] leading-5 text-muted/80">
                {job.stack}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
