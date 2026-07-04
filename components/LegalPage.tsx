import type { Locale } from "../lib/i18n";
import { listSectionKeys, translate } from "../lib/i18n";
import { PublicChrome } from "./PublicChrome";

interface LegalPageProps {
  locale: Locale;
  namespace: "privacy" | "terms";
}

export function LegalPage({ locale, namespace }: LegalPageProps) {
  const sectionKeys = listSectionKeys(locale, `legal.${namespace}.sections`);

  return (
    <PublicChrome locale={locale} compact>
      <article className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-accent-400">
          {translate(locale, `legal.${namespace}.title`)}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight text-white md:text-6xl">
          {translate(locale, `legal.${namespace}.title`)}
        </h1>
        <p className="mt-4 font-mono text-xs text-white/45">{translate(locale, `legal.${namespace}.lastUpdated`)}</p>

        <div className="mt-14 space-y-5">
          {sectionKeys.map((key, index) => (
            <section key={key} className="border border-white/10 bg-white/[0.025] p-6 md:p-8">
              <div className="flex gap-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-white/10 bg-white/[0.03] font-mono text-xs font-bold text-white/50">
                  {new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  }).format(index + 1)}
                </span>
                <div>
                  <h2 className="font-display text-xl font-medium text-white">
                    {translate(locale, `legal.${namespace}.sections.${key}.title`)}
                  </h2>
                  <p className="mt-3 text-sm leading-8 text-white/62">
                    {translate(locale, `legal.${namespace}.sections.${key}.content`)}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </article>
    </PublicChrome>
  );
}
