import Link from "next/link";
import Image from "next/image";
import type { Locale } from "../lib/i18n";
import { getDirection, translate } from "../lib/i18n";
import { publicHref, runtimeHref, signupHref } from "../lib/links";

interface PublicChromeProps {
  locale: Locale;
  children: React.ReactNode;
  compact?: boolean;
  hideExtensionLink?: boolean;
}

export function BrandMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <Image
      src="/brand/kalahamoon-mark-small.svg"
      alt=""
      className={className}
      width={32}
      height={32}
    />
  );
}

export function PublicChrome({ locale, children, compact = false, hideExtensionLink = false }: PublicChromeProps) {
  const appName = translate(locale, "common.appName");

  return (
    <div dir={getDirection(locale)} className="dark min-h-screen overflow-hidden bg-[#151413] text-[#f5f5f4]">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.55) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <header className="relative z-10 border-b border-white/10 bg-[#151413]/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-6">
          <Link href={publicHref(locale)} className="flex min-w-0 items-center gap-2.5">
            <BrandMark />
            <span className="truncate font-display text-lg font-bold text-white">{appName}</span>
          </Link>
          <nav className="hidden items-center gap-5 md:flex">
            <Link href={`${publicHref(locale)}#features`} className="font-mono text-xs font-bold uppercase text-white/55 hover:text-white">
              {translate(locale, "landingPage.nav.features")}
            </Link>
            <Link href={publicHref(locale, "pricing")} className="font-mono text-xs font-bold uppercase text-white/55 hover:text-white">
              {translate(locale, "landingPage.nav.pricing")}
            </Link>
            {!hideExtensionLink && (
              <Link href={publicHref(locale, "extension")} className="font-mono text-xs font-bold uppercase text-white/55 hover:text-white">
                {translate(locale, "extensionPage.eyebrow")}
              </Link>
            )}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={runtimeHref(locale, "login")}
              className="border border-white/15 bg-white/[0.03] px-3 py-2 font-mono text-xs font-bold text-white/70 transition-colors hover:bg-white/10 hover:text-white active:translate-y-[1px] sm:px-4"
            >
              {translate(locale, "common.login")}
            </a>
            {!compact ? (
              <a
                href={signupHref(locale)}
                className="bg-accent-500 px-3 py-2 font-mono text-xs font-bold text-white transition-colors hover:bg-accent-600 active:translate-y-[1px] sm:px-4"
              >
                {translate(locale, "landingPage.footer.getStarted")}
              </a>
            ) : null}
          </div>
        </div>
      </header>
      <main className="relative z-10">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#151413] px-6 py-10 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <Link href={publicHref(locale)} className="flex w-fit items-center gap-2.5">
            <BrandMark />
            <span className="font-display text-lg font-bold">{translate(locale, "common.appName")}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-7 text-white/55">{translate(locale, "landingPage.footer.tagline")}</p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs font-bold uppercase text-white/35">{translate(locale, "landingPage.footer.product")}</p>
          <Link href={`${publicHref(locale)}#features`} className="text-sm text-white/65 hover:text-white">{translate(locale, "landingPage.footer.features")}</Link>
          <Link href={publicHref(locale, "pricing")} className="text-sm text-white/65 hover:text-white">{translate(locale, "landingPage.footer.pricing")}</Link>
          <a href={runtimeHref(locale, "login")} className="text-sm text-white/65 hover:text-white">{translate(locale, "landingPage.footer.login")}</a>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs font-bold uppercase text-white/35">{translate(locale, "landingPage.footer.legal_col")}</p>
          <Link href={publicHref(locale, "privacy")} className="text-sm text-white/65 hover:text-white">{translate(locale, "landingPage.footer.privacy")}</Link>
          <Link href={publicHref(locale, "terms")} className="text-sm text-white/65 hover:text-white">{translate(locale, "landingPage.footer.terms")}</Link>
          <Link href={publicHref(locale, "support")} className="text-sm text-white/65 hover:text-white">{translate(locale, "landingPage.footer.support")}</Link>
        </div>
        <div className="border border-white/10 bg-white/[0.02] p-5">
          <p className="font-mono text-xs font-bold uppercase text-accent-400">{translate(locale, "landingPage.finalCta.title")}</p>
          <p className="mt-3 text-sm leading-7 text-white/55">{translate(locale, "landingPage.finalCta.description")}</p>
          <a href={signupHref(locale)} className="mt-5 inline-flex bg-accent-500 px-4 py-2 font-mono text-xs font-bold text-white hover:bg-accent-600">
            {translate(locale, "landingPage.finalCta.cta")}
          </a>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/40">
        {translate(locale, "landingPage.footer.legal")}
      </div>
    </footer>
  );
}
