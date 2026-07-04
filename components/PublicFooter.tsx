'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ShieldCheck } from 'lucide-react';
import { AppMark } from '@/components/AppMark';

const ENAMAD_TRUST_SEAL_URL = 'https://trustseal.enamad.ir/?id=738435&Code=VISgx99OcBBNQ9gulnhqm0AG0H0Popw3';
const ENAMAD_TRUST_SEAL_HTML = "<a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=738435&Code=VISgx99OcBBNQ9gulnhqm0AG0H0Popw3'><img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=738435&Code=VISgx99OcBBNQ9gulnhqm0AG0H0Popw3' alt='' style='cursor:pointer' code='VISgx99OcBBNQ9gulnhqm0AG0H0Popw3'></a>";

interface PublicFooterProps {
  locale: string;
  variant?: 'large' | 'compact' | 'minimal';
}

export default function PublicFooter({ locale, variant = 'large' }: PublicFooterProps) {
  const t = useTranslations('landingPage');
  const tCommon = useTranslations('common');
  const tLegal = useTranslations('legal');
  const isRTL = ['ar', 'fa', 'ckb'].includes(locale);
  const [showLocalFallback, setShowLocalFallback] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowLocalFallback(['localhost', '127.0.0.1'].includes(window.location.hostname));
  }, []);

  if (variant === 'minimal') {
    return (
      <footer className="relative z-10 border-t border-border/70 py-10 px-6 bg-[#151413] text-white">
        <div className="max-w-7xl mx-auto text-center text-xs text-muted-foreground/70">
          &copy; 2026 {tCommon('appName')}
        </div>
      </footer>
    );
  }

  if (variant === 'compact') {
    return (
      <footer className="relative z-10 border-t border-border/70 py-10 px-6 bg-[#151413] text-white">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground/70">&copy; 2026 {tCommon('appName')}</span>
          <div className="flex items-center gap-6">
            <Link href={`/${locale}/privacy`} className="text-xs text-muted-foreground/70 transition-colors hover:text-foreground">
              {tLegal('privacy.title')}
            </Link>
            <Link href={`/${locale}/terms`} className="text-xs text-muted-foreground/70 transition-colors hover:text-foreground">
              {tLegal('terms.title')}
            </Link>
            <Link href={`/${locale}/support`} className="text-xs text-muted-foreground/70 transition-colors hover:text-foreground">
              {tLegal('support.title')}
            </Link>
          </div>
        </div>
      </footer>
    );
  }

  // Variant "large" (default)
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#151413] px-6 pb-8 pt-10 text-white md:pt-16">
      <div className="max-w-7xl mx-auto">
        {/* Top: brand + columns + trust seal */}
        <div className={`mb-10 grid grid-cols-2 gap-6 md:mb-14 md:grid-cols-4 md:gap-10 lg:grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr_1.7fr] ${isRTL ? 'text-right' : ''}`}>
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link href={`/${locale}`} className="flex items-center gap-2.5 w-fit">
              <AppMark className="h-8 w-8 rounded-none" />
              <span className="text-base font-bold text-white/90">{tCommon('appName')}</span>
            </Link>
            <p className="text-sm text-white/55 leading-relaxed max-w-[220px]">{t('footer.tagline')}</p>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-mono font-semibold tracking-wider uppercase text-white/40 mb-1">{t('footer.product')}</p>
            <Link href={`/${locale}#features`} className="text-sm text-white/65 hover:text-white transition-colors">{t('footer.features')}</Link>
            <Link href={`/${locale}/pricing`} className="text-sm text-white/65 hover:text-white transition-colors">{t('footer.pricing')}</Link>
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL || ''}/${locale}/login`} className="text-sm text-white/65 hover:text-white transition-colors">{t('footer.login')}</Link>
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL || ''}/${locale}/signup`} className="text-sm text-white/65 hover:text-white transition-colors">{t('footer.getStarted')}</Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-mono font-semibold tracking-wider uppercase text-white/40 mb-1">{t('footer.legal_col')}</p>
            <Link href={`/${locale}/privacy`} className="text-sm text-white/65 hover:text-white transition-colors">{t('footer.privacy')}</Link>
            <Link href={`/${locale}/terms`} className="text-sm text-white/65 hover:text-white transition-colors">{t('footer.terms')}</Link>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-mono font-semibold tracking-wider uppercase text-white/40 mb-1">{t('footer.company')}</p>
            <Link href={`/${locale}/support`} className="text-sm text-white/65 hover:text-white transition-colors">{t('footer.support')}</Link>
          </div>

          <div className="col-span-2 flex items-center justify-center md:col-span-4 lg:col-span-1 lg:justify-end">
            <div className="flex h-32 w-32 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] p-2">
              {/* eNamad Emblem */}
              <div
                aria-label={t('footer.trustSealAria')}
                className="group relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white transition-all duration-300 cursor-pointer [&_a]:relative [&_a]:z-10 [&_a]:flex [&_a]:h-full [&_a]:w-full [&_a]:items-center [&_a]:justify-center [&_img]:h-[96px] [&_img]:w-[96px] [&_img]:object-contain [&_img]:transition-transform [&_img]:duration-300 group-hover:[&_img]:scale-105"
                role="group"
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-accent-300/50" />
                {showLocalFallback ? (
                  <a
                    href={ENAMAD_TRUST_SEAL_URL}
                    target="_blank"
                    referrerPolicy="origin"
                    aria-label={t('footer.trustSealAria')}
                    className="relative z-10 flex h-full w-full items-center justify-center text-[#151413]"
                  >
                    <ShieldCheck className="h-8 w-8 text-success" aria-hidden="true" />
                  </a>
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: ENAMAD_TRUST_SEAL_HTML }} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/40">{t('footer.legal')}</p>
        </div>
      </div>
    </footer>
  );
}
