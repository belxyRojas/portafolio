"use client";

import { useI18n } from "@/lib/i18n";

export function TechStack() {
  const { t } = useI18n();

  return (
    <section id="stack" className="relative z-10 scroll-mt-24 section-wash-deep py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <p className="kicker mb-4">{t.stack.kicker}</p>
        <h2 className="display max-w-2xl text-[1.7rem] font-semibold tracking-tight text-ink sm:text-4xl">
          {t.stack.title}
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {t.stack.groups.map((group) => (
            <article key={group.title} className="card-surface rounded-2xl p-5">
              <h3 className="text-sm font-medium text-ink">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line bg-bg px-3 py-1 font-mono text-[11px] text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
