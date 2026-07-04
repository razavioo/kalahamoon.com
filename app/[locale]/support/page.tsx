import { notFound } from "next/navigation";
import { PublicChrome } from "../../../components/PublicChrome";
import { isLocale, translate } from "../../../lib/i18n";

const faqKeys = ["q1", "q2", "q3"] as const;

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <PublicChrome locale={locale} compact>
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-accent-400">
          {translate(locale, "legal.support.title")}
        </p>
        <h1 className="mt-4 font-display text-4xl font-medium text-white md:text-6xl">
          {translate(locale, "legal.support.title")}
        </h1>
        <p className="mt-4 text-lg text-white/58">{translate(locale, "legal.support.subtitle")}</p>

        <div className="mt-12 border border-accent-500/25 bg-accent-500/[0.045] p-8">
          <p className="font-display text-2xl font-medium text-white">{translate(locale, "legal.support.emailLabel")}</p>
          <a href={`mailto:${translate(locale, "legal.support.email")}`} className="mt-3 block break-words font-mono text-lg font-bold text-accent-300">
            {translate(locale, "legal.support.email")}
          </a>
          <p className="mt-3 font-mono text-xs text-white/50">{translate(locale, "legal.support.responseTime")}</p>
        </div>

        <div className="mt-14">
          <h2 className="font-display text-3xl font-medium text-white">{translate(locale, "legal.support.faq.title")}</h2>
          <div className="mt-6 space-y-4">
            {faqKeys.map((key) => (
              <article key={key} className="border border-white/10 bg-white/[0.025] p-6">
                <h3 className="font-display text-xl font-medium text-white">{translate(locale, `legal.support.faq.${key}.q`)}</h3>
                <p className="mt-3 text-sm leading-7 text-white/58">{translate(locale, `legal.support.faq.${key}.a`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicChrome>
  );
}
