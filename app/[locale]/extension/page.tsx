import { notFound } from "next/navigation";
import Image from "next/image";
import {
  ArrowUpRight,
  CheckCircle2,
  LogIn,
  Puzzle,
  Search,
  SendHorizonal,
  Settings,
  Store,
} from "lucide-react";
import { PublicChrome } from "../../../components/PublicChrome";
import { isLocale, translate } from "../../../lib/i18n";
import { runtimeHref } from "../../../lib/links";

const CHROME_WEBSTORE_URL = "https://chromewebstore.google.com/detail/lgfdolahcmifjpemlacdemddlkopknmj";
const featureKeys = ["capture", "review", "route", "control"] as const;
const workflowKeys = ["signIn", "connectWooCommerce", "captureProduct", "sendProduct"] as const;
const faqKeys = ["priceRefresh", "safe", "update", "where"] as const;

const WORKFLOW_ICONS = {
  signIn: LogIn,
  connectWooCommerce: Store,
  captureProduct: Search,
  sendProduct: SendHorizonal,
} as const;

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
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-10 border-x border-white/10 px-6 py-12 md:grid-cols-[0.9fr_1.1fr] md:py-16">
        <div className="min-w-0 md:ps-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 border border-accent-500/30 bg-accent-500/10 px-3 py-1 font-mono text-[11px] font-bold uppercase text-accent-300">
              <Puzzle className="h-3.5 w-3.5" />
              {translate(locale, "extensionPage.eyebrow")}
            </span>
            <span className="inline-flex items-center gap-2 border border-[#7f9f83]/30 bg-[#7f9f83]/10 px-3 py-1 font-mono text-[11px] font-bold text-[#a7c4ad]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {translate(locale, "extensionPage.status")}
            </span>
          </div>
          <h1 className="mt-8 w-full max-w-3xl break-words [overflow-wrap:anywhere] font-display text-[2rem] font-medium leading-[1.02] text-white sm:text-5xl md:text-6xl">
            {translate(locale, "extensionPage.title")}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/62">{translate(locale, "extensionPage.description")}</p>
          <p className="mt-4 max-w-2xl border-s border-accent-500/50 ps-4 text-sm leading-7 text-white/70">{translate(locale, "extensionPage.releaseNote")}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={CHROME_WEBSTORE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-accent-500 px-6 py-3 font-mono text-xs font-bold uppercase text-white transition-colors hover:bg-accent-600 active:translate-y-[1px]"
            >
              <Puzzle className="h-4 w-4" />
              {translate(locale, "extensionPage.storeCta")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={runtimeHref(locale, "login")}
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/15 bg-white/[0.03] px-5 py-3 font-mono text-xs font-bold uppercase text-white/80 transition-colors hover:bg-white/10 active:translate-y-[1px]"
            >
              {translate(locale, "extensionPage.dashboard")}
            </a>
          </div>
          <p className="mt-5 max-w-xl border-s border-white/15 ps-4 text-sm leading-7 text-white/50">{translate(locale, "extensionPage.storeHint")}</p>
        </div>
        <div className="min-w-0 border-y border-white/10 bg-[#1d1a17] p-4 md:border-s md:border-y-0 md:p-6">
          <div className="border border-white/10 bg-white/[0.02] p-3">
            <div className="mb-3 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div className="min-w-0">
                <p className="truncate font-mono text-[11px] font-bold uppercase text-white">{translate(locale, "extensionPage.visualTitle")}</p>
                <p className="mt-1 truncate text-xs text-white/45">{translate(locale, "extensionPage.visualSubtitle")}</p>
              </div>
              <Puzzle className="h-4 w-4 shrink-0 text-accent-300" />
            </div>
            <div className="overflow-hidden border border-white/10 bg-[#151413]">
              <Image
                src="/extension/extension-capture.png"
                alt={translate(locale, "extensionPage.visualTitle")}
                className="h-auto w-full"
                width={1280}
                height={800}
                priority
              />
            </div>
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

      <section className="border-x border-t border-white/10 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-[12rem_1fr]">
            <span className="font-mono text-xs font-bold text-accent-300">01</span>
            <div>
              <h2 className="font-display text-4xl font-medium text-white md:text-5xl">{translate(locale, "extensionPage.installTitle")}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/58">{translate(locale, "extensionPage.installLead")}</p>
            </div>
          </div>
          <div className="mt-10 grid gap-px border border-white/10 bg-white/10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="bg-[#151413] p-6 md:p-8">
              <p className="font-mono text-[11px] font-bold uppercase text-white/45">{translate(locale, "extensionPage.publishedLabel")}</p>
              <h3 className="mt-3 font-display text-3xl font-medium text-white">{translate(locale, "extensionPage.listingTitle")}</h3>
              <a
                href={CHROME_WEBSTORE_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex min-h-12 items-center gap-2 bg-accent-500 px-6 py-3 font-mono text-xs font-bold uppercase text-white transition-colors hover:bg-accent-600 active:translate-y-[1px]"
              >
                <Puzzle className="h-4 w-4" />
                {translate(locale, "extensionPage.storeCta")}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="bg-[#1d1a17] p-6 md:p-8">
              <div className="grid gap-px border border-white/10 bg-white/10">
                {["storePointInstall", "storePointUpdates", "storePointFallback"].map((key) => (
                  <div key={key} className="flex items-start gap-3 bg-[#151413] p-4">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#a7c4ad]" />
                    <p className="text-sm leading-7 text-white/60">{translate(locale, `extensionPage.${key}`)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-x border-t border-white/10 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-[12rem_1fr]">
            <span className="font-mono text-xs font-bold text-accent-300">02</span>
            <div>
              <h2 className="font-display text-4xl font-medium text-white md:text-5xl">{translate(locale, "extensionPage.workflowTitle")}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/58">{translate(locale, "extensionPage.workflowLead")}</p>
            </div>
          </div>
          <div className="mt-10 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
            {workflowKeys.map((key, index) => {
              const Icon = WORKFLOW_ICONS[key];
              return (
                <article key={key} className="flex gap-4 bg-[#151413] p-6 md:p-7">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-accent-500/30 bg-accent-500/10 font-mono text-xs font-bold text-accent-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-accent-300" />
                      <h3 className="text-base font-bold text-white">{translate(locale, `extensionPage.workflow.${key}.title`)}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-white/58">{translate(locale, `extensionPage.workflow.${key}.description`)}</p>
                    {key === "connectWooCommerce" ? (
                      <a
                        href={runtimeHref(locale, "settings/woocommerce")}
                        className="mt-5 inline-flex min-h-10 items-center gap-2 border border-white/15 bg-white/[0.03] px-3 py-2 font-mono text-[11px] font-bold uppercase text-white/75 transition-colors hover:bg-white/10 active:translate-y-[1px]"
                      >
                        <Settings className="h-3.5 w-3.5" />
                        {translate(locale, "extensionPage.connectCta")}
                      </a>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-x border-t border-white/10 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-[12rem_1fr]">
            <span className="font-mono text-xs font-bold text-accent-300">03</span>
            <h2 className="font-display text-4xl font-medium text-white md:text-5xl">{translate(locale, "extensionPage.featureTitle")}</h2>
          </div>
          <div className="mt-10 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
            {featureKeys.map((key) => (
              <article key={key} className="bg-[#151413] p-6">
                <p className="font-mono text-[11px] font-bold uppercase text-accent-300">{key}</p>
                <p className="mt-4 text-sm leading-7 text-white/62">{translate(locale, `extensionPage.features.${key}`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-x border-y border-white/10 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-[12rem_1fr]">
            <span className="font-mono text-xs font-bold text-accent-300">04</span>
            <h2 className="font-display text-4xl font-medium text-white">{translate(locale, "extensionPage.faqTitle")}</h2>
          </div>
          <div className="mt-10 grid gap-px border border-white/10 bg-white/10">
            {faqKeys.map((key) => (
              <article key={key} className="grid gap-4 bg-[#151413] p-6 sm:grid-cols-[2.5rem_1fr]">
                <span className="flex h-10 w-10 items-center justify-center border border-[#7f9f83]/30 bg-[#7f9f83]/10 text-[#a7c4ad]">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">{translate(locale, `extensionPage.faq.${key}.q`)}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/58">{translate(locale, `extensionPage.faq.${key}.a`)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicChrome>
  );
}
