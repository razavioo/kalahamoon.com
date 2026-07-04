import { notFound } from "next/navigation";
import Image from "next/image";
import { PricingGrid } from "../../components/PricingGrid";
import { PublicChrome } from "../../components/PublicChrome";
import { formatNumber, isLocale, translate } from "../../lib/i18n";
import { publicHref, signupHref } from "../../lib/links";

const trialDays = 14;
const featureKeys = ["inbox", "ai", "pipeline"] as const;
const proofKeys = ["workspace", "admin", "invites"] as const;
const channelKeys = ["whatsapp", "telegram", "basalam", "digikala", "bale", "instagram"] as const;
const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) {
    notFound();
  }

  const localizedTrialDays = formatNumber(trialDays, rawLocale);

  return (
    <PublicChrome locale={rawLocale}>
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:min-h-[calc(100vh-4.5rem)] md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-20">
        <div>
          <p className="w-fit border border-accent-500/30 bg-accent-500/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent-400">
            {translate(rawLocale, "landingPage.hero.badge")}
          </p>
          <h1 className="mt-7 max-w-3xl font-display text-5xl font-medium leading-[0.96] text-white md:text-7xl">
            {translate(rawLocale, "landingPage.hero.titleLine1")}{" "}
            <span className="text-accent-300">{translate(rawLocale, "landingPage.hero.titleLine2")}</span>{" "}
            {translate(rawLocale, "landingPage.hero.titleAccent")}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/62 md:text-lg">
            {translate(rawLocale, "landingPage.hero.description")}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={signupHref(rawLocale)} className="inline-flex justify-center bg-accent-500 px-6 py-3 font-mono text-xs font-bold uppercase text-white hover:bg-accent-600 active:translate-y-[1px]">
              {translate(rawLocale, "landingPage.hero.primaryCta", { days: localizedTrialDays })}
            </a>
            <a href={`mailto:${translate(rawLocale, "legal.support.email")}`} className="inline-flex justify-center border border-white/15 px-6 py-3 font-mono text-xs font-bold uppercase text-white/70 hover:bg-white/10 hover:text-white">
              {translate(rawLocale, "landingPage.hero.secondaryCta")}
            </a>
          </div>
          <div className="mt-8 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
            {["trial", "channels", "setup"].map((key) => (
              <div key={key} className="bg-[#151413] px-4 py-3 font-mono text-[11px] text-white/55">
                {translate(rawLocale, `landingPage.hero.confidence.${key}`, { days: localizedTrialDays })}
              </div>
            ))}
          </div>
        </div>

        <div className="border border-white/10 bg-[#1d1a17] p-4">
          <div className="border border-white/10 bg-[#0f0e0d]">
            <Image
              src={rawLocale === "fa" ? "/hero/hero-dashboard-fa.webp" : "/hero/hero-dashboard-en.webp"}
              alt={translate(rawLocale, "landingPage.mockup.tabs.inbox")}
              className="h-auto w-full"
              width={1200}
              height={900}
              priority
            />
          </div>
          <div className="grid gap-px border-x border-b border-white/10 bg-white/10 sm:grid-cols-3">
            {["channels", "responseTime", "stages"].map((key) => (
              <div key={key} className="bg-[#151413] p-4">
                <p className="font-mono text-xl font-bold text-white">{translate(rawLocale, `landingPage.stats.${key}.value`)}</p>
                <p className="mt-1 text-xs text-white/50">{translate(rawLocale, `landingPage.stats.${key}.label`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-white/10 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-[14rem_1fr]">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-accent-400">
              {translate(rawLocale, "landingPage.nav.features")}
            </p>
            <div>
              <h2 className="max-w-3xl font-display text-4xl font-medium text-white md:text-5xl">
                {translate(rawLocale, "landingPage.integrations.title")}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/58">
                {translate(rawLocale, "landingPage.integrations.description")}
              </p>
            </div>
          </div>
          <div className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {featureKeys.map((key) => (
              <article key={key} className="bg-[#151413] p-6">
                <p className="font-mono text-[11px] font-bold uppercase text-accent-400">{key}</p>
                <h3 className="mt-5 font-display text-2xl font-medium text-white">
                  {translate(rawLocale, `landingPage.features.cards.${key}.title`)}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/58">
                  {translate(rawLocale, `landingPage.features.cards.${key}.description`)}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {channelKeys.map((key) => (
              <span key={key} className="border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-xs text-white/62">
                {translate(rawLocale, `landingPage.integrations.channels.${key}`)}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-3xl font-display text-4xl font-medium text-white md:text-5xl">
            {translate(rawLocale, "landingPage.proof.title")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/58">{translate(rawLocale, "landingPage.proof.description")}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {proofKeys.map((key) => (
              <article key={key} className="border border-white/10 bg-white/[0.025] p-6">
                <h3 className="font-display text-2xl font-medium text-white">{translate(rawLocale, `landingPage.proof.cards.${key}.title`)}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{translate(rawLocale, `landingPage.proof.cards.${key}.description`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="border-t border-white/10 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-accent-400">
                {translate(rawLocale, "landingPage.nav.pricing")}
              </p>
              <h2 className="mt-4 font-display text-4xl font-medium text-white md:text-5xl">
                {translate(rawLocale, "landingPage.pricing.title")}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/58">
                {translate(rawLocale, "landingPage.pricing.description", { days: localizedTrialDays })}
              </p>
            </div>
            <a href={publicHref(rawLocale, "pricing")} className="w-fit border border-white/15 px-5 py-3 font-mono text-xs font-bold uppercase text-white/70 hover:bg-white/10">
              {translate(rawLocale, "landingPage.footer.pricing")}
            </a>
          </div>
          <PricingGrid locale={rawLocale} />
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-accent-400">
              {translate(rawLocale, "landingPage.faq.label")}
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium text-white md:text-5xl">
              {translate(rawLocale, "landingPage.faq.title")}
            </h2>
          </div>
          <div className="grid gap-3">
            {faqKeys.map((key) => (
              <article key={key} className="border border-white/10 bg-white/[0.025] p-5">
                <h3 className="font-display text-xl font-medium text-white">{translate(rawLocale, `landingPage.faq.items.${key}.q`)}</h3>
                <p className="mt-3 text-sm leading-7 text-white/58">{translate(rawLocale, `landingPage.faq.items.${key}.a`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicChrome>
  );
}
