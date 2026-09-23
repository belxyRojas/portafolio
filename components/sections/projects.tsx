"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Projects() {
  const { t } = useI18n();

  return (
    <section id="projects" className="relative z-10 scroll-mt-24 bg-transparent py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <p className="kicker mb-4">{t.projects.kicker}</p>
        <h2 className="display max-w-2xl text-[1.7rem] font-semibold tracking-tight text-ink sm:text-4xl">
          {t.projects.title}
        </h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {t.projects.items.map((project, index) => {
            const featured = index === 0;
            const className = cn(
              "card-surface group block rounded-3xl p-5 transition sm:p-6",
              featured && "lg:col-span-2 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:gap-8",
            );

            const body = (
              <>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-lime/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-lime-text">
                      {project.href ? t.projects.live : t.projects.caseStudy}
                    </span>
                    {featured ? (
                      <span className="rounded-full border border-violet/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-violet">
                        {t.projects.featured}
                      </span>
                    ) : null}
                    <span className="font-mono text-[11px] text-muted">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="mt-4 flex items-center gap-2 text-xl text-ink">
                    {project.title}
                    {project.href ? (
                      <ArrowUpRight className="h-4 w-4 text-lime-text opacity-0 transition group-hover:opacity-100" />
                    ) : null}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{project.role}</p>
                  <p className="mt-4 text-sm leading-6 text-muted">
                    {project.description}
                  </p>
                </div>
                <div
                  className={cn(
                    "mt-5 flex flex-wrap gap-2",
                    featured && "lg:mt-10 lg:content-start",
                  )}
                >
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </>
            );

            if (project.href) {
              return (
                <a
                  key={project.id}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className={className}
                >
                  {body}
                </a>
              );
            }

            return (
              <article key={project.id} className={className}>
                {body}
              </article>
            );
          })}
          <Link
            href="/vault"
            className="card-surface group relative overflow-hidden rounded-3xl p-5 sm:p-6 lg:col-span-2"
          >
            <div className="pointer-events-none absolute -right-8 top-0 h-40 w-40 rounded-full bg-violet/20 blur-3xl transition group-hover:bg-lime/20" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-lime/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-lime-text">
                    {t.projects.vaultTeaser.kicker}
                  </span>
                </div>
                <h3 className="mt-4 text-xl text-ink sm:text-2xl">
                  {t.projects.vaultTeaser.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {t.projects.vaultTeaser.body}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-lime-text">
                {t.projects.vaultTeaser.cta}
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
