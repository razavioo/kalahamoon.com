import type { Locale } from "../lib/i18n";
import { translate } from "../lib/i18n";
import { signupHref } from "../lib/links";

interface StaticPlan {
  key: "starter" | "growth" | "pro";
  plan: "STARTER" | "GROWTH" | "PRO";
  price: Record<Locale, string>;
  highlighted?: boolean;
}

const plans: StaticPlan[] = [
  { key: "starter", plan: "STARTER", price: { en: "$29", fa: "۶۹۰,۰۰۰ تومان" } },
  { key: "growth", plan: "GROWTH", price: { en: "$79", fa: "۲,۴۹۰,۰۰۰ تومان" }, highlighted: true },
  { key: "pro", plan: "PRO", price: { en: "$199", fa: "۵,۹۹۰,۰۰۰ تومان" } },
];

export function PricingGrid({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {plans.map((item) => (
        <article
          key={item.key}
          className={`flex min-h-[30rem] flex-col border p-6 ${
            item.highlighted ? "border-accent-500 bg-accent-500/[0.055]" : "border-white/10 bg-white/[0.025]"
          }`}
        >
          {item.highlighted ? (
            <span className="mb-5 w-fit border border-accent-500/35 bg-accent-500/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-accent-400">
              {translate(locale, "landingPage.pricing.mostPopular")}
            </span>
          ) : null}
          <h2 className="font-display text-2xl font-medium text-white">
            {translate(locale, `landingPage.pricing.plans.${item.key}.title`)}
          </h2>
          <p className="mt-3 min-h-16 text-sm leading-7 text-white/58">
            {translate(locale, `landingPage.pricing.plans.${item.key}.description`)}
          </p>
          <div className="mt-6 flex items-end gap-2">
            <span className="font-mono text-4xl font-bold text-white">{item.price[locale]}</span>
            <span className="pb-1 font-mono text-xs text-white/45">{translate(locale, "landingPage.pricing.perMonth")}</span>
          </div>
          <p className="mt-5 border-t border-white/10 pt-5 font-mono text-xs leading-6 text-white/50">
            {translate(locale, `landingPage.pricing.plans.${item.key}.bestFor`)}
          </p>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-white/76">
            {["feature1", "feature2", "feature3", "feature4"].map((feature) => (
              <li key={feature} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent-400" />
                <span>{translate(locale, `landingPage.pricing.plans.${item.key}.features.${feature}`)}</span>
              </li>
            ))}
          </ul>
          <a
            href={signupHref(locale, item.plan)}
            className={`mt-auto inline-flex justify-center px-4 py-3 font-mono text-xs font-bold uppercase active:translate-y-[1px] ${
              item.highlighted
                ? "bg-accent-500 text-white hover:bg-accent-600"
                : "border border-white/15 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            {translate(locale, "landingPage.pricing.choosePlan", {
              plan: translate(locale, `landingPage.pricing.plans.${item.key}.title`),
            })}
          </a>
        </article>
      ))}
    </div>
  );
}
