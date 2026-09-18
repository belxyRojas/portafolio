"use client";

import { Mail } from "lucide-react";
import { KnotMark } from "@/components/knot-mark";
import { LinkedInIcon } from "@/components/social-icons";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-line bg-bg-deep">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-start gap-3">
          <KnotMark className="mt-0.5 h-8 w-8" />
          <div>
            <p className="text-sm font-medium text-ink">
              {site.shortName}
              <span className="text-muted"> / </span>
              <span className="text-lime-text">{site.domain}</span>
            </p>
            <p className="mt-1 max-w-md text-xs leading-5 text-muted">
              {t.footer.knot}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-muted">
          <a href={`mailto:${site.email}`} aria-label="Email" className="hover:text-lime-text">
            <Mail className="h-4 w-4" />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:text-lime-text"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-4 text-xs leading-5 text-muted sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {site.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
