import { notFound } from "next/navigation";
import Image from "next/image";
import { PricingGrid } from "../../../components/PricingGrid";
import { PublicChrome } from "../../../components/PublicChrome";
import { formatNumber, isLocale, translate } from "../../../lib/i18n";

const trialDays = 14;

export default async function PricingPage({
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
    <PublicChrome locale={rawLocale} compact>
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-accent-400">
            {translate(rawLocale, "pricingPage.eyebrow")}
          </p>
          <h1 className="mt-5 font-display text-4xl font-medium leading-tight text-white md:text-6xl">
            {translate(rawLocale, "pricingPage.title")}
          </h1>
          <p className="mt-5 text-base leading-8 text-white/62">
            {translate(rawLocale, "pricingPage.descriptionLead", { days: localizedTrialDays })}{" "}
            {translate(rawLocale, "billingCatalog.note")} {translate(rawLocale, "pricingPage.descriptionTail")}
          </p>
        </div>
        <div className="mx-auto mb-10 max-w-4xl overflow-hidden border border-white/10 bg-white/[0.02]">
          <Image src="/pricing/trust-strip.svg" alt="" className="h-24 w-full object-cover" width={896} height={96} />
        </div>
        <PricingGrid locale={rawLocale} />
        <div className="mt-10 border border-white/10 bg-white/[0.025] p-6 text-center text-sm leading-7 text-white/58">
          {translate(rawLocale, "pricingPage.contactLeadIn")}{" "}
          <a className="font-mono font-bold text-accent-400 hover:text-accent-300" href="mailto:hello@kalahamoon.com">
            hello@kalahamoon.com
          </a>
        </div>
      </section>
    </PublicChrome>
  );
}
