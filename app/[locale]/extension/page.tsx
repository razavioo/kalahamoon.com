import { notFound } from "next/navigation";
import Image from "next/image";
import { PublicChrome } from "../../../components/PublicChrome";
import { isLocale, translate } from "../../../lib/i18n";
import { runtimeHref, runtimePath } from "../../../lib/links";

const stepKeys = ["download", "developerMode", "loadUnpacked", "configure"] as const;
const featureKeys = ["capture", "review", "route", "control"] as const;
const faqKeys = ["safe", "update", "where"] as const;

export default async function ExtensionPage({
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
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-24">
        <div>
          <p className="w-fit border border-accent-500/30 bg-accent-500/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent-400">
            {translate(locale, "extensionPage.eyebrow")}
          </p>
          <h1 className="mt-7 font-display text-4xl font-medium leading-tight text-white md:text-6xl">
            {translate(locale, "extensionPage.title")}
          </h1>
          <p className="mt-6 text-base leading-8 text-white/62">{translate(locale, "extensionPage.description")}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={runtimeHref(locale, "login")} className="inline-flex justify-center bg-accent-500 px-6 py-3 font-mono text-xs font-bold uppercase text-white hover:bg-accent-600">
              {translate(locale, "extensionPage.login")}
            </a>
            <a href={runtimePath("api/extension/download/chrome")} className="inline-flex justify-center border border-white/15 px-6 py-3 font-mono text-xs font-bold uppercase text-white/70 hover:bg-white/10">
              {translate(locale, "extensionPage.manualCta")}
            </a>
          </div>
          <p className="mt-5 border-s border-white/15 ps-4 text-sm leading-7 text-white/50">{translate(locale, "extensionPage.manualHint")}</p>
        </div>
        <div className="border border-white/10 bg-[#1d1a17] p-4 md:p-6">
          <div className="border border-white/10 bg-white/[0.02] p-4">
            <Image
              src="/hero/hero-dashboard-en.webp"
              alt={translate(locale, "extensionPage.visualTitle")}
              className="h-auto w-full"
              width={1200}
              height={900}
            />
          </div>
          <div className="mt-4 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
            {[translate(locale, "extensionPage.visualBadge"), translate(locale, "extensionPage.browserChrome"), translate(locale, "extensionPage.supportedDestinations")].map((item) => (
              <div key={item} className="bg-[#151413] px-4 py-3 font-mono text-[11px] text-white/55">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl font-medium text-white md:text-5xl">{translate(locale, "extensionPage.installTitle")}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/58">{translate(locale, "extensionPage.installLead")}</p>
          <div className="mt-10 grid gap-px border border-white/10 bg-white/10">
            {stepKeys.map((key, index) => (
              <article key={key} className="grid gap-5 bg-[#151413] p-6 sm:grid-cols-[3rem_1fr]">
                <span className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.03] font-mono text-xs font-bold text-accent-300">
                  {new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", { minimumIntegerDigits: 2, useGrouping: false }).format(index + 1)}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-medium text-white">{translate(locale, `extensionPage.steps.${key}.title`)}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/58">{translate(locale, `extensionPage.steps.${key}.description`)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl font-medium text-white md:text-5xl">{translate(locale, "extensionPage.featureTitle")}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {featureKeys.map((key) => (
              <article key={key} className="border border-white/10 bg-white/[0.025] p-6">
                <p className="font-mono text-[11px] font-bold uppercase text-accent-400">{key}</p>
                <p className="mt-4 text-sm leading-7 text-white/62">{translate(locale, `extensionPage.features.${key}`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-4xl font-medium text-white">{translate(locale, "extensionPage.faqTitle")}</h2>
          <div className="mt-8 space-y-4">
            {faqKeys.map((key) => (
              <article key={key} className="border border-white/10 bg-white/[0.025] p-6">
                <h3 className="font-display text-xl font-medium text-white">{translate(locale, `extensionPage.faq.${key}.q`)}</h3>
                <p className="mt-3 text-sm leading-7 text-white/58">{translate(locale, `extensionPage.faq.${key}.a`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicChrome>
  );
}
