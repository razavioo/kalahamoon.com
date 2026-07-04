'use client';

import { useState, useEffect, useRef, type FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  formatPublicBillingPlanPrice,
  getLocalizedPublicBillingPlans,
  ORGANIZATION_TRIAL_DAYS,
} from '@/lib/billing-plans';
import { toLocaleNumber, toEasternArabicDigits } from '@/lib/format-number';
import { buildPublicSignupHref } from '@/lib/public-signup';
import {
  MessageSquare,
  Bot,
  Zap,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Send,
  MessageCircle,
  Store,
  Globe,
  GripVertical,
  Play,
  ChevronRight,
  ShieldCheck,
  Users,
  TrendingUp,
  BadgePercent,
} from 'lucide-react';
import { AppMark } from '@/components/AppMark';
import { SocialProofSection } from '@/components/SocialProofSection';
import { FAQSection } from '@/components/FAQSection';
import { MobileStickyBar } from '@/components/MobileStickyBar';
import MatomoAnalytics from '@/components/MatomoAnalytics';
import PublicFooter from '@/components/PublicFooter';
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  TiltCard,
  motion,
  useReducedMotion,
  ScrollProgress,
} from '@/components/motion';
import {
  useScroll,
  useInView,
  useMotionValueEvent,
} from 'framer-motion';

const DISCOUNT_PERCENT = 50;
const DISCOUNT_CODE = 'creative-friend-50';
const ENAMAD_TRUST_SEAL_HTML = "<a referrerpolicy='origin' href='https://trustseal.enamad.ir/?id=738435&Code=VISgx99OcBBNQ9gulnhqm0AG0H0Popw3'><img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=738435&Code=VISgx99OcBBNQ9gulnhqm0AG0H0Popw3' alt='' style='cursor:pointer' code='VISgx99OcBBNQ9gulnhqm0AG0H0Popw3'></a>";

function localizeNumber(value: number, locale: string) {
  return toLocaleNumber(value, locale);
}

/* ================================================================== */
/*  Integrations Panel — sleek channels overview in app frame          */
/* ================================================================== */
function IntegrationsPanel({ t, prefersReduced, locale }: {
  t: ReturnType<typeof useTranslations>; prefersReduced: boolean | null; locale: string;
}) {
  const isRTL = ['fa', 'ar'].includes(locale);
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'telegram' | 'basalam' | 'digikala'>('whatsapp');
  const [syncing, setSyncing] = useState(false);
  const [success, setSuccess] = useState(false);

  const channelsList = [
    { id: 'whatsapp' as const, name: t('showcase.integrations.channels.whatsapp.name'), desc: t('showcase.integrations.channels.whatsapp.desc'), stat: t('showcase.integrations.channels.whatsapp.stat'), icon: <MessageCircle className="w-5 h-5 text-green-400" /> },
    { id: 'telegram' as const, name: t('showcase.integrations.channels.telegram.name'), desc: t('showcase.integrations.channels.telegram.desc'), stat: t('showcase.integrations.channels.telegram.stat'), icon: <Send className="w-5 h-5 text-info" /> },
    { id: 'basalam' as const, name: t('showcase.integrations.channels.basalam.name'), desc: t('showcase.integrations.channels.basalam.desc'), stat: t('showcase.integrations.channels.basalam.stat'), icon: <Store className="w-5 h-5 text-orange-400" /> },
    { id: 'digikala' as const, name: t('showcase.integrations.channels.digikala.name'), desc: t('showcase.integrations.channels.digikala.desc'), stat: t('showcase.integrations.channels.digikala.stat'), icon: <Globe className="w-5 h-5 text-warning" /> },
  ];

  const handleTest = () => {
    if (syncing) return;
    setSyncing(true);
    setSuccess(false);
    setTimeout(() => {
      setSyncing(false);
      setSuccess(true);
    }, 1200);
  };

  const activeData = channelsList.find(c => c.id === activeChannel)!;

  return (
    <div className="p-4 md:p-6 h-full flex flex-col overflow-y-auto scrollbar-none select-none">
      <div className="mb-4 flex items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-bold text-white/80">{t('showcase.integrations.label')}</span>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr] flex-1 min-h-0">
        <div className="space-y-2.5 overflow-y-auto">
          {channelsList.map((ch) => {
            const isActive = ch.id === activeChannel;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => { setActiveChannel(ch.id); setSuccess(false); }}
                className={`w-full text-start p-3.5 border transition-all rounded-none duration-150 flex items-center gap-3.5 cursor-pointer ${
                  isActive 
                    ? 'border-emerald-500/40 bg-emerald-500/[0.04]' 
                    : 'border-white/5 bg-white/[0.015] hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 bg-white/5">
                  {ch.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-black text-white">{ch.name}</span>
                    <span className="font-mono text-[9px] text-white/30 uppercase">{ch.id}</span>
                  </div>
                  <p className="text-xs text-white/55 truncate mt-0.5">{ch.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-none border border-white/8 bg-black/20 p-4 md:p-5 flex flex-col justify-between h-full min-h-[220px]">
          <div>
            <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
              <div>
                <div className="text-[10px] font-mono tracking-wider text-white/40 uppercase">{t('showcase.integrations.status')}</div>
                <div className="text-base font-black text-white mt-0.5">{activeData.name}</div>
              </div>
              <div className="flex items-center gap-1.5 rounded-none border border-green-500/20 bg-green-500/10 px-2.5 py-1 text-[10px] font-mono font-bold text-green-400">
                <span className="w-1.5 h-1.5 rounded-none bg-green-400 animate-pulse" />
                {t('showcase.integrations.connected')}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-none border border-white/5 bg-white/[0.02] p-3">
                <div className="text-[10px] font-mono text-white/30">{isRTL ? 'گزارش آخرین فعالیت' : 'Activity Log'}</div>
                <p className="mt-1.5 text-xs font-semibold text-white/70 leading-relaxed">{activeData.stat}</p>
              </div>

              <div className="rounded-none border border-white/5 bg-white/[0.01] p-3 font-mono text-[11px] text-white/45 space-y-1 text-left" dir="ltr">
                <div>URL: https://api.kalahamoon.com/v1/sync/{activeData.id}</div>
                <div>METHOD: POST (Webhook Live)</div>
                <div>SECURE: SSL/TLS Enabled</div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex-shrink-0">
            <button
              type="button"
              onClick={handleTest}
              className={`w-full py-2.5 text-xs font-bold transition-all rounded-none text-center cursor-pointer border ${
                syncing
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : success
                  ? 'border-green-500/30 bg-green-500/10 text-green-400'
                  : 'border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white'
              }`}
            >
              {syncing
                ? t('showcase.integrations.syncing')
                : success
                ? (isRTL ? 'اتصال موفقیت‌آمیز بود' : 'Connection Successful')
                : t('showcase.integrations.testConnection')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Slidable Features Showcase (Swiss Modern & High-End Editorial) ── */
function SlidableFeatures({
  t,
  prefersReduced,
  locale,
  isRTL,
}: {
  t: ReturnType<typeof useTranslations>;
  prefersReduced: boolean | null;
  locale: string;
  isRTL: boolean;
}) {
  const [activeSlide, setActiveSlide] = useState(0);

  const formatNum = (n: number) => {
    const s = n < 10 ? `0${n}` : `${n}`;
    return locale === 'fa' ? toEasternArabicDigits(s) : s;
  };

  const slides = [
    {
      id: 'integrations',
      accent: 'emerald' as const,
      label: t('showcase.integrations.label'),
      title: t('showcase.integrations.title'),
      description: t('showcase.integrations.description'),
      icon: Globe,
      component: <IntegrationsPanel t={t} prefersReduced={prefersReduced} locale={locale} />,
    },
    {
      id: 'inbox',
      accent: 'green' as const,
      label: t('showcase.inbox.label'),
      title: t('showcase.inbox.title'),
      description: t('showcase.inbox.description'),
      icon: MessageSquare,
      component: <InboxPanel t={t} prefersReduced={prefersReduced} locale={locale} discountUnlocked={false} />,
    },
    {
      id: 'ai',
      accent: 'blue' as const,
      label: t('showcase.ai.label'),
      title: t('showcase.ai.title'),
      description: t('showcase.ai.description'),
      icon: Bot,
      component: <AIPanel t={t} prefersReduced={prefersReduced} locale={locale} discountUnlocked={false} />,
    },
    {
      id: 'pipeline',
      accent: 'orange' as const,
      label: t('showcase.pipeline.label'),
      title: t('showcase.pipeline.title'),
      description: t('showcase.pipeline.description'),
      icon: BarChart3,
      component: <PipelinePanel t={t} prefersReduced={prefersReduced} discountUnlocked={false} />,
    },
    {
      id: 'automation',
      accent: 'purple' as const,
      label: t('showcase.automation.label'),
      title: t('showcase.automation.title'),
      description: t('showcase.automation.description'),
      icon: Play,
      component: <AutomationPanel t={t} prefersReduced={prefersReduced} isRTL={isRTL} discountUnlocked={false} />,
    },
  ];

  const currentSlide = slides[activeSlide];

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const accentStyles = {
    emerald: {
      border: 'border-emerald-500/15',
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      indicator: 'bg-emerald-500',
    },
    green: {
      border: 'border-green-500/15',
      text: 'text-green-400',
      bg: 'bg-green-500/10',
      indicator: 'bg-green-500',
    },
    blue: {
      border: 'border-info/15',
      text: 'text-info',
      bg: 'bg-info/10',
      indicator: 'bg-info',
    },
    orange: {
      border: 'border-accent-500/15',
      text: 'text-accent-400',
      bg: 'bg-accent-500/10',
      indicator: 'bg-accent-500',
    },
    purple: {
      border: 'border-warning/15',
      text: 'text-warning',
      bg: 'bg-warning/10',
      indicator: 'bg-warning',
    },
  };

  const activeStyles = accentStyles[currentSlide.accent];

  return (
    <div className="w-full">
      {/* ── Slide Navigation Tabs ── */}
      <div className="flex border-b border-white/5 overflow-x-auto scrollbar-none mb-6">
        <div className="flex w-full min-w-max">
          {slides.map((slide, idx) => {
            const isActive = idx === activeSlide;
            const slideAccent = accentStyles[slide.accent];
            const Icon = slide.icon;
            return (
              <button
                key={slide.id}
                onClick={() => setActiveSlide(idx)}
                className={`flex-1 min-w-[150px] py-4 px-6 border-b-2 text-start transition-all duration-200 cursor-pointer ${
                  isActive
                    ? `${slideAccent.border} ${slideAccent.text} bg-white/[0.02]`
                    : 'border-transparent text-white/40 hover:text-white/60 hover:bg-white/[0.005]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span className="font-mono text-xs font-semibold tracking-wider uppercase truncate">
                    {slide.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Layout: Sidebar Info + Interactive Mockup ── */}
      <div className="grid gap-6 lg:grid-cols-[0.85fr_2.15fr] items-stretch">
        {/* Info Column */}
        <div className="flex flex-col justify-between rounded-none border border-white/10 bg-[#151413]/65 p-6 ring-1 ring-white/[0.02]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-accent-400 tracking-widest uppercase">
                {currentSlide.id}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-xl font-bold tracking-tight text-white md:text-2xl leading-tight">
                {currentSlide.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">
                {currentSlide.description}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="group flex h-10 w-10 items-center justify-center rounded-none border border-white/10 bg-white/[0.02] text-white/60 hover:text-white hover:border-white/20 active:translate-y-[1px] transition-all cursor-pointer"
              aria-label="Previous slide"
            >
              <ArrowRight className={`h-4 w-4 transition-transform ${isRTL ? '' : 'rotate-180 group-hover:-translate-x-0.5'}`} />
            </button>

            <button
              onClick={handleNext}
              className="group flex h-10 w-10 items-center justify-center rounded-none border border-white/10 bg-white/[0.02] text-white/60 hover:text-white hover:border-white/20 active:translate-y-[1px] transition-all cursor-pointer"
              aria-label="Next slide"
            >
              <ArrowRight className={`h-4 w-4 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`} />
            </button>
          </div>
        </div>

        {/* Mockup Column */}
        <div className={`relative overflow-hidden rounded-none border bg-[#151413]/65 shadow-none ring-1 ring-white/[0.02] ${activeStyles.border} flex flex-col h-[640px] md:h-[580px] lg:h-[520px]`}>
          <div className="relative z-10 flex-1 flex flex-col h-full min-h-0">
            {currentSlide.component}
          </div>
        </div>
      </div>
    </div>
  );
}

function CurveDivider({ fromBg, toBg, flip = false }: { fromBg: string; toBg: string; flip?: boolean }) {
  return (
    <div className="relative w-full overflow-hidden leading-[0] z-10" style={{ backgroundColor: fromBg }}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-[40px] md:h-[60px]"
        style={{ color: toBg, transform: flip ? 'scaleX(-1)' : undefined }}
        fill="currentColor"
      >
        <path d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z" />
      </svg>
    </div>
  );
}

/* ================================================================== */
/*  Landing Page                                                       */
/* ================================================================== */
export default function LandingPage({ locale }: { locale: string }) {
  const t = useTranslations('landingPage');
  const tCommon = useTranslations('common');
  const tCatalog = useTranslations('billingCatalog');
  const plans = getLocalizedPublicBillingPlans(tCatalog);
  const isRTL = ['ar', 'fa', 'ckb'].includes(locale);
  const localizedTrialDays = localizeNumber(ORGANIZATION_TRIAL_DAYS, locale);
  const prefersReduced = useReducedMotion();
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#151413] text-white select-none dark">
      <MatomoAnalytics />
      <ScrollProgress />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[#151413]" />

      <NavBar locale={locale} t={t} tCommon={tCommon} localizedTrialDays={localizedTrialDays} />

      <main className="relative z-10">
        {/* ── Hero ── */}
        <HeroSection locale={locale} t={t} isRTL={isRTL} localizedTrialDays={localizedTrialDays} />

        <CurveDivider fromBg="#151413" toBg="#0c0b0a" />

        {/* ── Feature Showcases ── */}
        <section id="features" className="scroll-mt-24 pb-8 md:pb-10 bg-[#0c0b0a]">
          <div className="mx-auto max-w-7xl px-4 py-3 md:px-6 md:py-4">
            <FadeIn>
              <SlidableFeatures
                t={t}
                prefersReduced={prefersReduced}
                locale={locale}
                isRTL={isRTL}
              />
            </FadeIn>
          </div>
        </section>

        <CurveDivider fromBg="#0c0b0a" toBg="#1c1a19" flip />

        {/* ── Social Proof ── */}
        <SocialProofSection locale={locale} localizedTrialDays={localizedTrialDays} prefersReduced={prefersReduced} />

        <CurveDivider fromBg="#1c1a19" toBg="#121110" />

        {/* ── Pricing ── */}
        <PricingSection id="pricing" locale={locale} t={t} plans={plans} localizedTrialDays={localizedTrialDays} />

        <CurveDivider fromBg="#121110" toBg="#181716" flip />

        {/* ── FAQ ── */}
        <FAQSection prefersReduced={prefersReduced} />

        <CurveDivider fromBg="#181716" toBg="#0d0d0c" />

        {/* ── Demo ── */}
        <DemoSection t={t} locale={locale} />

        <CurveDivider fromBg="#0d0d0c" toBg="#151413" flip />

        {/* ── Final CTA ── */}
        <FinalCTA locale={locale} t={t} isRTL={isRTL} localizedTrialDays={localizedTrialDays} />
      </main>

      {/* ── Mobile Sticky CTA ── */}
      <MobileStickyBar locale={locale} />

      <PublicFooter locale={locale} />
    </div>
  );
}

/* ================================================================== */
/*  NavBar                                                             */
/* ================================================================== */
function NavBar({ locale, t, tCommon, localizedTrialDays }: {
  locale: string;
  t: ReturnType<typeof useTranslations>;
  tCommon: ReturnType<typeof useTranslations>;
  localizedTrialDays: string;
}) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 50));
  const appUrl = process.env.NEXT_PUBLIC_RUNTIME_APP_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://app.kalahamoon.com';

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 transition-all duration-300" style={{ paddingTop: scrolled ? 6 : 14, paddingBottom: scrolled ? 6 : 14 }}>
      <motion.div
        className="max-w-7xl mx-auto rounded-none px-5 py-2.5 flex items-center justify-between border border-white/5 shadow-none transition-all duration-500"
        style={{ backgroundColor: scrolled ? 'rgba(21,20,19,0.92)' : 'rgba(21,20,19,0.4)', backdropFilter: scrolled ? 'blur(24px)' : 'blur(12px)' }}
      >
        <div className="flex items-center gap-2">
          <AppMark className="h-7 w-7 rounded-none" />
          <span className="text-lg font-bold tracking-tight text-white">{tCommon('appName')}</span>
          <div className="hidden md:flex items-center gap-8 ps-8 text-sm font-medium text-white/60">
            <a href="#features" className="hover:text-accent-400 transition-colors">{t('nav.features')}</a>
            <a href="#pricing" className="hover:text-accent-400 transition-colors">{t('nav.pricing')}</a>
            <a href="#faq" className="hover:text-accent-400 transition-colors">{t('nav.faq')}</a>
            <a href="#contact" className="hover:text-accent-400 transition-colors">{t('nav.contact')}</a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`${appUrl}/${locale}/login`} className="text-sm font-medium hover:text-accent-400 transition-colors px-3 py-2">{t('nav.login')}</Link>
          <Link href={buildPublicSignupHref(locale)} className="border border-primary bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 active:translate-y-[1px]">
            {t('nav.startTrial', { days: localizedTrialDays })}
          </Link>
        </div>
      </motion.div>
    </nav>
  );
}

/* ================================================================== */
/*  Hero — compact product screenshot lead-in                          */
/* ================================================================== */
function HeroSection({ locale, t, isRTL, localizedTrialDays }: {
  locale: string; t: ReturnType<typeof useTranslations>; isRTL: boolean; localizedTrialDays: string;
}) {
  const heroImage = isRTL ? '/hero/hero-dashboard-fa.webp' : '/hero/hero-dashboard-en.webp';
  const dashboardLabel = isRTL ? 'داشبورد کالاهامون' : 'KALAHAMOON DASHBOARD';

  return (
    <section className="relative isolate overflow-hidden px-6 pb-8 pt-24 text-white md:pb-12 md:pt-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-accent-500/5 to-transparent" />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
        <FadeIn delay={0.05}>
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-start">
            <div className="mb-4 inline-flex items-center gap-2 rounded-none border border-accent-400/25 bg-accent-400/10 px-3 py-1 text-[11px] font-bold text-accent-100">
              <span className="h-px w-4 bg-accent-300" aria-hidden="true" /> {t('hero.badge')}
            </div>
            <h1 className={`mb-4 text-3xl font-black leading-tight md:text-5xl lg:text-6xl ${isRTL ? '' : 'tracking-tight'}`}>
              <span className="text-white">{t('hero.titleLine1')}</span>{' '}
              <span className="text-white/80">{t('hero.titleLine2')}</span>{' '}
              <span className="font-display font-semibold text-accent-200">{t('hero.titleAccent')}</span>
            </h1>
            <p className="mx-auto mb-6 max-w-2xl text-base leading-8 text-white/72 lg:mx-0 md:text-lg">
              {t('hero.description')}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href={buildPublicSignupHref(locale)}
                className="group border border-primary bg-primary px-8 py-3.5 text-base font-black text-primary-foreground shadow-[0_18px_60px_rgba(234,88,12,0.24)] transition-colors hover:bg-primary/90 active:translate-y-[1px]"
              >
                <span className="flex items-center gap-2">
                  {t('hero.primaryCta', { days: localizedTrialDays })}
                  <ArrowRight className={`h-4 w-4 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`} />
                </span>
              </Link>
              <a href="#contact" className="border border-white/15 bg-white/[0.03] px-7 py-3.5 font-semibold text-white/78 transition-all hover:border-white/25 hover:bg-white/[0.06] hover:text-white">
                {t('hero.secondaryCta')}
              </a>
            </div>
            <div className="mx-auto mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-2 text-xs font-semibold text-white/68 lg:mx-0 lg:justify-start">
              {[
                t('hero.confidence.trial', { days: localizedTrialDays }),
                t('hero.confidence.channels'),
                t('hero.confidence.setup'),
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-none border border-white/10 bg-white/[0.04] px-3 py-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent-300" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.14} y={18}>
          <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
            {/* Elegant double-border editorial frame with Clay Terracotta accent */}
            <div className="relative overflow-hidden rounded-none border border-white/10 bg-[#151413]/72 p-3 shadow-[0_24px_100px_rgba(0,0,0,0.35)] ring-1 ring-white/[0.03]">
              <div className="flex justify-between items-center mb-3 text-[9px] font-mono tracking-widest text-accent-400 uppercase">
                <span>Omnichannel Inbox</span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden border border-white/5 bg-black/40">
                <Image
                  src={heroImage}
                  alt=""
                  fill
                  priority
                  className="object-contain"
                  sizes="(min-width: 1024px) 54vw, 100vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#151413]/35 via-transparent to-white/[0.02]" />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function PromoChip({ locale, compact = false }: { locale: string; compact?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-none border border-accent-500/20 bg-accent-500/10 ${compact ? 'px-2.5 py-1 text-[10px]' : 'px-3 py-1.5 text-[11px]'} font-bold text-accent-300`}>
      <BadgePercent className={compact ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
      <span>{localizeNumber(DISCOUNT_PERCENT, locale)}% OFF</span>
      <span className="text-white/45">{DISCOUNT_CODE}</span>
    </div>
  );
}

/* ================================================================== */
/*  Inbox Panel — multi-channel inbox in a real app frame              */
/* ================================================================== */
function InboxPanel({ t, prefersReduced, locale, discountUnlocked }: {
  t: ReturnType<typeof useTranslations>; prefersReduced: boolean | null; locale: string; discountUnlocked: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(() => (prefersReduced ? 4 : 0));
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!inView || prefersReduced) return;
    const ts = [setTimeout(() => setCount(1), 250), setTimeout(() => setCount(2), 550), setTimeout(() => setCount(3), 850), setTimeout(() => setCount(4), 1150)];
    return () => ts.forEach(clearTimeout);
  }, [inView, prefersReduced]);

  const msgs = [
    { ch: 'WhatsApp', chIcon: <MessageCircle className="w-3 h-3" />, chColor: 'text-green-400 bg-green-500/15', avatar: 'S', avatarColor: 'bg-green-500/20 text-green-400', name: t('showcase.inbox.messages.m1.name'), text: t('showcase.inbox.messages.m1.text'), time: t('showcase.inbox.messages.m1.time') },
    { ch: 'Basalam', chIcon: <Store className="w-3 h-3" />, chColor: 'text-orange-400 bg-orange-500/15', avatar: 'R', avatarColor: 'bg-orange-500/20 text-orange-400', name: t('showcase.inbox.messages.m2.name'), text: t('showcase.inbox.messages.m2.text'), time: t('showcase.inbox.messages.m2.time') },
    { ch: 'Telegram', chIcon: <Send className="w-3 h-3" />, chColor: 'text-info bg-info/15', avatar: 'N', avatarColor: 'bg-info/20 text-info', name: t('showcase.inbox.messages.m3.name'), text: t('showcase.inbox.messages.m3.text'), time: t('showcase.inbox.messages.m3.time') },
    { ch: 'Digikala', chIcon: <Globe className="w-3 h-3" />, chColor: 'text-warning bg-warning/15', avatar: 'M', avatarColor: 'bg-warning/20 text-warning', name: t('showcase.inbox.messages.m4.name'), text: t('showcase.inbox.messages.m4.text'), time: t('showcase.inbox.messages.m4.time') },
  ];

  const activeMessage = msgs[activeIndex];

  return (
    <div ref={ref} className="p-4 md:p-6 h-full flex flex-col overflow-y-auto scrollbar-none select-none">
      {/* Section label */}
      <div className="mb-4 flex items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-green-400" />
          <span className="text-sm font-bold text-white/80">{t('showcase.inbox.label')}</span>
        </div>
        {discountUnlocked ? <PromoChip locale={locale} compact /> : null}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr] flex-1 min-h-0">
        <div className="overflow-hidden rounded-none border border-white/8 bg-[#151413]/60 flex flex-col h-full min-h-0">
        {/* Tab bar */}
        <div className="h-10 border-b border-white/5 flex items-center px-4 gap-4 bg-white/[0.03] flex-shrink-0">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-accent-400">
            <MessageSquare className="w-3 h-3" /> {t('showcase.inbox.filter')}
            <span className="w-5 h-5 rounded-none bg-accent-500/20 text-accent-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0">{toLocaleNumber(4, locale)}</span>
          </div>
          <div className="ms-auto flex gap-1.5 flex-shrink-0">
            {[{ icon: <MessageCircle className="w-3 h-3" />, c: 'text-green-400' }, { icon: <Send className="w-3 h-3" />, c: 'text-info' }, { icon: <Store className="w-3 h-3" />, c: 'text-orange-400' }, { icon: <Globe className="w-3 h-3" />, c: 'text-warning' }].map((ch, i) => (
              <div key={i} className={`w-6 h-6 rounded-none bg-white/5 flex items-center justify-center ${ch.c}`}>{ch.icon}</div>
            ))}
          </div>
        </div>

        {/* Message rows */}
        <div className="divide-y divide-white/5 flex-1 overflow-y-auto">
          {msgs.map((m, i) => (
            <motion.button
              type="button"
              key={i}
              initial={prefersReduced ? {} : { opacity: 0, x: -16 }}
              animate={i < count ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35 }}
              onClick={() => setActiveIndex(i)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-start transition-colors hover:bg-white/[0.02] ${activeIndex === i ? 'bg-accent-500/[0.06]' : ''}`}
            >
              <div className={`w-9 h-9 rounded-none ${m.avatarColor} flex items-center justify-center flex-shrink-0 font-bold text-xs`}>{m.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-white/90">{m.name}</span>
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold ${m.chColor}`}>{m.chIcon}{m.ch}</span>
                </div>
                <p className="text-xs text-white/50 truncate">{m.text}</p>
              </div>
              <div className="text-[10px] text-white/25 flex-shrink-0">{m.time}</div>
              {activeIndex === i && <div className="w-2 h-2 rounded-none bg-accent-500 flex-shrink-0 animate-pulse" />}
            </motion.button>
          ))}
        </div>
      </div>

        <div className="rounded-none border border-white/8 bg-black/20 p-4 flex flex-col justify-between h-full overflow-y-auto">
          <div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-white/30 text-left" dir="ltr">Preview</div>
                <div className="mt-1 text-lg font-black text-white">{activeMessage.name}</div>
              </div>
              <div className={`inline-flex items-center gap-1 rounded-none px-2 py-1 text-[10px] font-bold ${activeMessage.chColor}`} dir="ltr">{activeMessage.chIcon}{activeMessage.ch}</div>
            </div>
            <div className="mt-4 rounded-none border border-white/8 bg-[#151413]/70 p-4 text-sm leading-7 text-white/70">
              {activeMessage.text}
            </div>
          </div>
          {discountUnlocked ? <div className="mt-4 rounded-none border border-accent-500/15 bg-accent-500/10 p-4 flex-shrink-0">
            <div className="text-[11px] font-bold text-accent-200">{DISCOUNT_CODE}</div>
            <p className="mt-2 text-sm leading-7 text-white/65">
              {locale === 'fa' ? `برای همین گفتگو هم پیشنهاد خرید با ${localizeNumber(DISCOUNT_PERCENT, locale)}٪ تخفیف آماده است.` : `A ${localizeNumber(DISCOUNT_PERCENT, locale)}% purchase offer is ready for this conversation too.`}
            </p>
          </div> : null}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  AI Panel — conversation in a real app frame                        */
/* ================================================================== */
function AIPanel({ t, prefersReduced, locale, discountUnlocked }: {
  t: ReturnType<typeof useTranslations>; prefersReduced: boolean | null; locale: string; discountUnlocked: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [messages, setMessages] = useState<Array<{ id: string; side: 'customer' | 'ai'; text: string; time: string }>>([
    { id: 'm1', side: 'customer', text: t('showcase.ai.customerMsg'), time: '09:00' },
    { id: 'm2', side: 'ai', text: t('showcase.ai.aiReply'), time: '09:01' },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    if (!inView || prefersReduced) return;
    const hourThread = [
      { id: 'm3', side: 'customer' as const, text: locale === 'fa' ? 'اگر دو عدد بگیرم با کد تخفیف چقدر می‌شود؟' : 'If I buy two, what does the discount make it?', time: '09:14' },
      { id: 'm4', side: 'ai' as const, text: discountUnlocked ? (locale === 'fa' ? `با کد ${DISCOUNT_CODE} قیمت نهایی ۵۰٪ کمتر می‌شود و ارسال هم رایگان می‌ماند.` : `With ${DISCOUNT_CODE}, the final price drops 50% and shipping stays free.`) : (locale === 'fa' ? 'یک پیشنهاد خرید ویژه آماده شده. با بستن پنجره جزئیاتش را می‌بینید.' : 'A special purchase offer is ready. Close the window to reveal the details.'), time: '09:16' },
      { id: 'm5', side: 'customer' as const, text: locale === 'fa' ? 'خیلی خوبه. برای عصر هم رزرو کن.' : 'Nice. Reserve it for this evening too.', time: '09:36' },
      { id: 'm6', side: 'ai' as const, text: locale === 'fa' ? 'رزرو انجام شد. تا یک ساعت آینده پیگیری خودکار هم فعال می‌ماند.' : 'Reserved. Automated follow-up stays active for the next hour.', time: '10:00' },
    ];
    const timers = hourThread.flatMap((message, index) => ([
      setTimeout(() => setIsThinking(message.side === 'ai'), 1500 + index * 1600),
      setTimeout(() => {
        setIsThinking(false);
        setMessages((current) => current.some((entry) => entry.id === message.id) ? current : [...current, message]);
      }, 2300 + index * 1600),
    ]));
    return () => timers.forEach(clearTimeout);
  }, [discountUnlocked, inView, locale, prefersReduced]);

  return (
    <div ref={ref} className="p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-info" />
          <span className="text-sm font-bold text-white/80">{t('showcase.ai.label')}</span>
        </div>
        {discountUnlocked ? <PromoChip locale={locale} compact /> : null}
      </div>

      <div className="rounded-none border border-white/8 bg-[#151413]/60 overflow-hidden">
        <div className="h-10 border-b border-white/5 flex items-center px-4 gap-3 bg-white/[0.03] text-left" dir="ltr">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-info">
            <span className="h-px w-4 bg-info" aria-hidden="true" /> AI Assistant
          </div>
          <div className="ms-auto flex items-center gap-1.5 text-[10px] text-green-400">
            <span className="w-1.5 h-1.5 rounded-none bg-green-400 animate-pulse" /> Active
          </div>
        </div>

        <div className="grid gap-4 p-5 xl:grid-cols-[0.72fr_1.28fr]">
          <div className="rounded-none border border-white/8 bg-black/20 p-4 text-left" dir="ltr">
            <div className="text-xs font-bold text-white/30">Intent Stack</div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-none border border-info/15 bg-info/10 px-2 py-1 text-[10px] font-bold text-info"><Zap className="w-3 h-3" /> {t('showcase.ai.intentBuying')}</span>
              <span className="inline-flex items-center gap-1 rounded-none border border-warning/15 bg-warning/10 px-2 py-1 text-[10px] font-bold text-warning">{t('showcase.ai.intentLocation')}</span>
            </div>
            <div className="mt-5 rounded-none border border-white/8 bg-[#151413]/70 p-4 text-sm leading-7 text-white/60">
              {locale === 'fa' ? 'رشته گفتگو در این دمو از ۰۹:۰۰ تا ۱۰:۰۰ ادامه پیدا می‌کند و بعد از یک دقیقه، سوال بعدی مشتری هم نمایش داده می‌شود.' : 'This demo thread keeps going from 09:00 to 10:00, with the next customer follow-up appearing after a short delay.'}
            </div>
          </div>

          <div className="space-y-4">
            {messages.map((message) => (
              <motion.div key={message.id} initial={prefersReduced ? {} : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex items-start gap-2.5 ${message.side === 'ai' ? 'justify-end' : ''}`}>
                {message.side === 'customer' && <div className="flex h-8 w-8 items-center justify-center rounded-none bg-white/10 text-[10px] font-bold text-white/50">C</div>}
                <div className={`max-w-[82%] rounded-none px-3.5 py-2.5 text-sm shadow-none ${message.side === 'ai' ? 'border border-accent-500/30 bg-accent-500/20 text-white' : 'border border-white/5 bg-[#1d1c1a] text-white/85'}`}>
                  <div className={`mb-1 flex items-center gap-2 text-[10px] font-bold ${message.side === 'ai' ? 'text-accent-200' : 'text-white/30'}`}>
                    {message.side === 'ai' && <Bot className="w-3 h-3" />}
                    <span>{locale === 'fa' ? toEasternArabicDigits(message.time) : message.time}</span>
                  </div>
                  {message.text}
                </div>
                {message.side === 'ai' && <div className="flex h-8 w-8 items-center justify-center rounded-none bg-accent-500/20"><Bot className="w-4 h-4 text-accent-400" /></div>}
              </motion.div>
            ))}

            {isThinking && (
              <div className="flex justify-end">
                <div className="rounded-none bg-accent-600/25 px-3 py-2 text-xs text-accent-100">{t('showcase.ai.thinking')}</div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button type="button" className="rounded-none border border-accent-500/15 bg-accent-500/10 px-2.5 py-1.5 text-xs font-bold text-accent-400">{t('showcase.ai.suggestAction1')}</button>
              <button type="button" className="rounded-none border border-white/8 bg-white/5 px-2.5 py-1.5 text-xs font-bold text-white/40">{t('showcase.ai.suggestAction2')}</button>
              <span className="ms-auto text-xs text-white/25">{locale === 'fa' ? '۰۹:۰۰ ← ۱۰:۰۰' : '09:00 → 10:00'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryBridgeSection({ t, prefersReduced, discountUnlocked, locale }: {
  t: ReturnType<typeof useTranslations>; prefersReduced: boolean | null; discountUnlocked: boolean; locale: string;
}) {
  const stats = [
    { icon: <MessageSquare className="w-4 h-4" />, value: t('stats.channels.value'), label: t('stats.channels.label'), sub: t('stats.channels.sub'), tone: 'text-green-400 bg-green-500/10 border-green-500/20' },
    { icon: <Zap className="w-4 h-4" />, value: t('stats.responseTime.value'), label: t('stats.responseTime.label'), sub: t('stats.responseTime.sub'), tone: 'text-info bg-info/10 border-info/20' },
    { icon: <BarChart3 className="w-4 h-4" />, value: t('stats.stages.value'), label: t('stats.stages.label'), sub: t('stats.stages.sub'), tone: 'text-accent-400 bg-accent-500/10 border-accent-500/20' },
    { icon: <ShieldCheck className="w-4 h-4" />, value: t('stats.uptime.value'), label: t('stats.uptime.label'), sub: t('stats.uptime.sub'), tone: 'text-warning bg-warning/10 border-warning/20' },
  ];

  const proofCards = [
    { icon: <Globe className="w-4 h-4" />, title: t('proof.cards.workspace.title'), description: t('proof.cards.workspace.description') },
    { icon: <Users className="w-4 h-4" />, title: t('proof.cards.admin.title'), description: t('proof.cards.admin.description') },
    { icon: <TrendingUp className="w-4 h-4" />, title: t('proof.cards.invites.title'), description: t('proof.cards.invites.description') },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <FadeIn>
        <div className="relative overflow-hidden rounded-none border border-white/10 bg-[#151413]/65 p-5 shadow-none ring-1 ring-white/[0.02] md:p-7">
          <div className="absolute inset-0 bg-muted/5" />
          <div className="relative grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-none border border-accent-400/20 bg-accent-400/10 px-3 py-1 text-[11px] font-bold text-accent-100">
                  <span className="h-px w-4 bg-accent-300" aria-hidden="true" />
                  {t('proof.title')}
                </span>
                {discountUnlocked ? <div className="inline-flex items-center rounded-none border border-accent-500/20 bg-accent-500/10 px-3 py-1 text-[10px] font-bold text-accent-300">{DISCOUNT_CODE}</div> : null}
              </div>
              <h2 className="mt-4 max-w-xl text-2xl font-black leading-tight text-white md:text-4xl">
                {t('stats.title')}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/68 md:text-base">
                {t('proof.description')}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-none border border-white/8 bg-black/20 p-4">
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-none border ${stat.tone}`}>
                      {stat.icon}
                    </div>
                    <div className="mt-4 text-2xl font-black text-white">{stat.value}</div>
                    <div className="mt-1 text-sm font-semibold text-white/80">{stat.label}</div>
                    <div className="mt-1 text-xs leading-6 text-white/52">{discountUnlocked && stat.label === t('stats.responseTime.label') ? (locale === 'fa' ? `همراه با ${localizeNumber(DISCOUNT_PERCENT, locale)}٪ تخفیف خرید` : `Now with ${localizeNumber(DISCOUNT_PERCENT, locale)}% purchase discount`) : stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-1">
              {proofCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={prefersReduced ? {} : { opacity: 0, y: 22 }}
                  whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="relative overflow-hidden rounded-none border border-white/10 bg-[#151413]/55 p-5"
                >
                  <div className="absolute inset-y-0 start-0 w-px bg-accent-500/70" />
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-none border border-white/10 bg-white/5 text-accent-400">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-black text-white/90">{card.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-white/58">{card.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ================================================================== */
/*  Pipeline Panel — realistic kanban in app frame                     */
/* ================================================================== */
function PipelinePanel({ t, prefersReduced, discountUnlocked }: {
  t: ReturnType<typeof useTranslations>; prefersReduced: boolean | null; discountUnlocked: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [show, setShow] = useState(Boolean(prefersReduced));
  const [draggedDeal, setDraggedDeal] = useState<string | null>(null);
  const [highlightStage, setHighlightStage] = useState<string | null>(null);
  const [dealStages, setDealStages] = useState<Record<string, string>>({
    d1: 'new',
    d2: 'qualified',
    d3: 'proposal',
    d4: 'negotiation',
  });

  useEffect(() => {
    if (!inView || prefersReduced) return;
    const t1 = setTimeout(() => setShow(true), 300);
    const t2 = setTimeout(() => setDealStages((current) => ({ ...current, d2: 'proposal' })), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [inView, prefersReduced]);

  const stages = ['new', 'qualified', 'proposal', 'negotiation', 'won'] as const;
  const stageMeta: Record<string, { bg: string; text: string; border: string; dot: string }> = {
    new: { bg: 'bg-info/8', text: 'text-info', border: 'border-info/20', dot: 'bg-info' },
    qualified: { bg: 'bg-warning/8', text: 'text-warning', border: 'border-warning/20', dot: 'bg-warning' },
    proposal: { bg: 'bg-accent-500/8', text: 'text-accent-400', border: 'border-accent-500/20', dot: 'bg-accent-400' },
    negotiation: { bg: 'bg-yellow-500/8', text: 'text-yellow-400', border: 'border-yellow-500/20', dot: 'bg-yellow-400' },
    won: { bg: 'bg-green-500/8', text: 'text-green-400', border: 'border-green-500/20', dot: 'bg-green-400' },
  };

  const deals = [
    { key: 'd1', value: t('showcase.pipeline.deals.d1.value'), name: t('showcase.pipeline.deals.d1.name') },
    { key: 'd2', value: t('showcase.pipeline.deals.d2.value'), name: t('showcase.pipeline.deals.d2.name') },
    { key: 'd3', value: t('showcase.pipeline.deals.d3.value'), name: t('showcase.pipeline.deals.d3.name') },
    { key: 'd4', value: t('showcase.pipeline.deals.d4.value'), name: t('showcase.pipeline.deals.d4.name') },
  ];

  return (
    <div ref={ref} className="p-4 md:p-6 h-full flex flex-col overflow-y-auto scrollbar-none select-none">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-accent-400" />
          <span className="text-sm font-bold text-white/80">{t('showcase.pipeline.label')}</span>
        </div>
        <div className="flex items-center gap-2">
          {discountUnlocked ? <div className="hidden sm:block rounded-none border border-accent-500/20 bg-accent-500/10 px-2.5 py-1 text-[10px] font-bold text-accent-300">{DISCOUNT_CODE}</div> : null}
          <span className="text-xs text-white/30">{t('showcase.pipeline.totalValue')}</span>
          <span className="text-sm font-black text-accent-400">{t('showcase.pipeline.totalAmount')}</span>
        </div>
      </div>

      <div className="pb-2 flex-1 min-h-0 flex flex-col justify-between overflow-x-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 flex-1 items-stretch min-h-[220px]">
          {stages.map((stage, si) => {
            const meta = stageMeta[stage];
            const stageDeals = deals.filter((deal) => dealStages[deal.key] === stage);

            return (
              <div
                key={stage}
                onDragOver={(event) => {
                  event.preventDefault();
                  setHighlightStage(stage);
                }}
                onDrop={() => {
                  if (!draggedDeal) return;
                  setDealStages((current) => ({ ...current, [draggedDeal]: stage }));
                  setDraggedDeal(null);
                  setHighlightStage(null);
                }}
                onDragLeave={() => setHighlightStage((current) => current === stage ? null : current)}
                className={`flex-1 rounded-none ${meta.bg} border ${meta.border} p-2.5 transition-all ${highlightStage === stage ? 'ring-2 ring-accent-400/50' : ''} flex flex-col h-full min-h-[180px]`}
              >
                <div className="flex items-center justify-between mb-3 px-1 flex-shrink-0">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-none ${meta.dot}`} />
                    <span className={`text-[11px] font-bold ${meta.text}`}>{t(`showcase.pipeline.stages.${stage}`)}</span>
                  </div>
                  <span className="text-[10px] text-white/20 font-bold">{stageDeals.length}</span>
                </div>

                <div className="space-y-2 flex-1 overflow-y-auto pr-0.5">
                  {stageDeals.map((deal, di) => (
                    <motion.div
                      key={deal.key}
                      draggable
                      onDragStart={() => setDraggedDeal(deal.key)}
                      initial={prefersReduced ? {} : { opacity: 0, y: 8 }}
                      animate={show ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: si * 0.08 + di * 0.04, duration: 0.3 }}
                      className={`rounded-none border p-2.5 transition-colors group cursor-grab active:cursor-grabbing ${draggedDeal === deal.key ? 'border-accent-500/30 bg-accent-500/10' : 'border-white/8 bg-[#151413]/60 hover:border-white/15'}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-white/80">{deal.name}</span>
                        <GripVertical className="w-3 h-3 text-white/10 group-hover:text-white/20 transition-colors" />
                      </div>
                      <span className={`text-[11px] font-bold ${meta.text}`}>{deal.value}</span>
                      <div className="mt-2 text-[10px] text-white/30 text-left" dir="ltr">drag & drop</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Funnel visualization */}
      <div className="mt-4 space-y-1 flex-shrink-0">
        {[
          { w: 100, label: stages[0], color: 'bg-info/20' },
          { w: 72, label: stages[1], color: 'bg-warning/20' },
          { w: 48, label: stages[2], color: 'bg-accent-500/20' },
          { w: 30, label: stages[3], color: 'bg-warning/25' },
          { w: 18, label: stages[4], color: 'bg-success/35' },
        ].map((bar, i) => (
          <motion.div
            key={i}
            initial={prefersReduced ? { width: `${bar.w}%` } : { width: 0 }}
            animate={show ? { width: `${bar.w}%` } : {}}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: 'easeOut' }}
            className={`h-1.5 rounded-none ${bar.color}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Automation Panel — HORIZONTAL flow with full-width                 */
/* ================================================================== */
function AutomationPanel({ t, prefersReduced, isRTL, discountUnlocked }: {
  t: ReturnType<typeof useTranslations>; prefersReduced: boolean | null; isRTL: boolean; discountUnlocked: boolean;
}) {
  const tAuto = useTranslations('automation');
  const tAutomationDetail = useTranslations('settings.automationDetail');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [step, setStep] = useState(() => (prefersReduced ? 5 : 0));
  const scenarios = [
    {
      id: 'price-inquiry',
      chip: isRTL ? 'استعلام قیمت' : 'Price Inquiry',
      trigger: tAuto('types.MESSAGE_RECEIVED'),
      condition: isRTL ? 'شامل «قیمت»' : 'Contains "price"',
      action: t('showcase.automation.action'),
      successTitle: isRTL ? 'ارسال لیست قیمت' : 'Send Price List',
      successText: isRTL
        ? 'با دریافت پیام قیمت، لیست قیمت برای مشتری ارسال می‌شود.'
        : 'When a customer asks for pricing, the price list is sent automatically.',
      failTitle: isRTL ? 'بدون ارسال' : 'No Reply',
      failText: isRTL
        ? 'اگر پیام درباره قیمت نباشد، این قانون اجرا نمی‌شود.'
        : 'If the message is not about pricing, this rule does not run.',
    },
    {
      id: 'new-lead',
      chip: isRTL ? 'لید جدید' : 'New Lead',
      trigger: tAuto('types.LEAD_CREATED'),
      condition: isRTL ? 'منبع = واتساپ' : 'Source = WhatsApp',
      action: tAuto('actions.assign_user'),
      successTitle: isRTL ? 'تخصیص خودکار' : 'Auto Assign',
      successText: isRTL
        ? 'لیدهای جدید واتساپ به صورت خودکار به کارشناس فروش تخصیص داده می‌شوند.'
        : 'New WhatsApp leads are assigned automatically to the sales rep.',
      failTitle: isRTL ? 'بدون تخصیص' : 'Skipped',
      failText: isRTL
        ? 'اگر منبع لید متفاوت باشد، این تخصیص انجام نمی‌شود.'
        : 'If the lead source is different, this assignment is skipped.',
    },
    {
      id: 'stage-change',
      chip: isRTL ? 'تغییر مرحله' : 'Stage Change',
      trigger: tAuto('types.STAGE_CHANGED'),
      condition: isRTL ? 'مرحله = مذاکره' : 'Stage = Negotiation',
      action: tAuto('actions.send_notification'),
      successTitle: isRTL ? 'ارسال اعلان' : 'Notify Team',
      successText: isRTL
        ? 'با ورود لید به مرحله مذاکره، برای تیم فروش اعلان ارسال می‌شود.'
        : 'When a lead enters negotiation, the team gets notified.',
      failTitle: isRTL ? 'اعلانی ارسال نشد' : 'No Notification',
      failText: isRTL
        ? 'اگر مرحله چیز دیگری باشد، اعلان ارسال نمی‌شود.'
        : 'If the stage is different, no notification is sent.',
    },
    {
      id: 'low-stock',
      chip: isRTL ? 'کمبود موجودی' : 'Low Stock',
      trigger: tAuto('types.PRODUCT_LOW_STOCK'),
      condition: isRTL ? 'موجودی < ۵' : 'Stock < 5',
      action: tAuto('actions.send_notification'),
      successTitle: isRTL ? 'هشدار موجودی' : 'Stock Alert',
      successText: isRTL
        ? 'وقتی موجودی محصول کم شود، هشدار برای تیم ارسال می‌شود.'
        : 'When stock gets low, an alert is sent to the team.',
      failTitle: isRTL ? 'نیازی به هشدار نیست' : 'No Alert',
      failText: isRTL
        ? 'اگر موجودی کافی باشد، هشداری ارسال نمی‌شود.'
        : 'If inventory is healthy, no alert is sent.',
    },
  ] as const;
  const [activeScenarioId, setActiveScenarioId] = useState('price-inquiry');

  useEffect(() => {
    if (!inView || prefersReduced) return;
    const ts = [setTimeout(() => setStep(1), 200), setTimeout(() => setStep(2), 650), setTimeout(() => setStep(3), 1100), setTimeout(() => setStep(4), 1650), setTimeout(() => setStep(5), 2400)];
    return () => ts.forEach(clearTimeout);
  }, [inView, prefersReduced]);

  const activeScenario = scenarios.find((scenario) => scenario.id === activeScenarioId) ?? scenarios[0];
  const sectionLabels = {
    trigger: tAutomationDetail('trigger'),
    conditions: tAutomationDetail('conditions'),
    actions: tAutomationDetail('actions'),
  };

  const nodes = [
    { label: sectionLabels.trigger, text: activeScenario.trigger, icon: <MessageCircle className="w-5 h-5" />, color: 'border-green-500/30 text-green-400', bg: 'bg-green-500/10', sReq: 1 },
    { label: sectionLabels.conditions, text: activeScenario.condition, icon: <Zap className="w-5 h-5" />, color: 'border-info/30 text-info', bg: 'bg-info/10', sReq: 2 },
    { label: sectionLabels.actions, text: activeScenario.action, icon: <Send className="w-5 h-5" />, color: 'border-accent-500/30 text-accent-400', bg: 'bg-accent-500/10', sReq: 3 },
  ];
  const flowLabels = {
    entering: isRTL ? 'ورود پیام' : 'Message In',
    checking: isRTL ? 'در حال بررسی' : 'Checking',
    passed: isRTL ? 'شرط تایید شد' : 'Passed',
    stopped: isRTL ? 'متوقف شد' : 'Stopped',
    evaluation: isRTL ? 'بررسی شرط' : 'Condition Check',
    successTitle: activeScenario.successTitle,
    successText: activeScenario.successText,
    failTitle: activeScenario.failTitle,
    failText: activeScenario.failText,
  };

  return (
    <div ref={ref} dir={isRTL ? 'rtl' : 'ltr'} className={`w-full p-4 md:p-6 h-full flex flex-col overflow-y-auto scrollbar-none select-none ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="mb-4 flex w-full items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4 text-warning" />
          <span className="text-sm font-bold text-white/80">{t('showcase.automation.label')}</span>
        </div>
        <motion.div initial={prefersReduced ? {} : { opacity: 0 }} animate={step >= 4 ? { opacity: 1 } : {}} className="flex items-center gap-3 flex-shrink-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-green-500/10 border border-green-500/15 text-green-400 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-none bg-green-400 animate-pulse" /> {t('showcase.automation.ruleActive')}
          </span>
          {discountUnlocked ? <span className="hidden sm:inline-flex items-center rounded-none border border-accent-500/20 bg-accent-500/10 px-2.5 py-1 text-[10px] font-bold text-accent-300">{DISCOUNT_CODE}</span> : null}
          <span className="text-[10px] text-white/25">{t('showcase.automation.executionsToday')}</span>
        </motion.div>
      </div>

      <div className="space-y-4 flex-1 flex flex-col justify-between min-h-0">
        <div className={`flex w-full flex-wrap gap-2 flex-shrink-0 ${isRTL ? 'justify-end' : 'justify-start'}`}>
          {scenarios.map((scenario) => {
            const active = scenario.id === activeScenarioId;
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => setActiveScenarioId(scenario.id)}
                className={`rounded-none border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? 'border-accent-500/35 bg-accent-500/12 text-accent-300'
                    : 'border-white/10 bg-white/[0.03] text-white/55 hover:border-white/20 hover:text-white/80'
                }`}
              >
                {scenario.chip}
              </button>
            );
          })}
        </div>

        <div className={`hidden md:grid gap-3 md:grid-cols-3 flex-shrink-0 ${isRTL ? 'text-right' : 'text-left'}`}>
          {nodes.map((node, i) => (
            <div key={i} className={`flex items-center ${isRTL ? 'text-right' : 'text-left'}`}>
              <motion.div
                initial={prefersReduced ? {} : { opacity: 0, scale: .85 }}
                animate={step >= node.sReq ? { opacity: 1, scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 200 }}
                className={`flex-1 rounded-none border ${node.color} bg-[#151413]/40 p-4 flex items-center gap-3`}
              >
                <div className={`w-11 h-11 rounded-none ${node.bg} flex items-center justify-center flex-shrink-0`}>{node.icon}</div>
                <div className={`min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className={`text-[10px] font-bold tracking-wider ${isRTL ? '' : 'uppercase'} ${node.color.split(' ').pop()}`}>{node.label}</div>
                  <div className="text-sm font-semibold text-white/85 truncate">{node.text}</div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
        <div className={`flex md:hidden flex-col items-center gap-0 flex-shrink-0 ${isRTL ? 'text-right' : 'text-left'}`}>
          {nodes.map((node, i) => (
            <div key={i} className="flex flex-col items-center w-full">
              <motion.div
                initial={prefersReduced ? {} : { opacity: 0, scale: .85 }}
                animate={step >= node.sReq ? { opacity: 1, scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 200 }}
                className={`w-full rounded-none border ${node.color} bg-[#151413]/40 p-4 flex items-center gap-3`}
              >
                <div className={`w-11 h-11 rounded-none ${node.bg} flex items-center justify-center flex-shrink-0`}>{node.icon}</div>
                <div className={`min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className={`text-[10px] font-bold tracking-wider ${isRTL ? '' : 'uppercase'} ${node.color.split(' ').pop()}`}>{node.label}</div>
                  <div className="text-sm font-semibold text-white/85">{node.text}</div>
                </div>
              </motion.div>
              {i < nodes.length - 1 && (
                <motion.div initial={prefersReduced ? {} : { opacity: 0, scaleY: 0 }} animate={step >= node.sReq + 1 ? { opacity: 1, scaleY: 1 } : {}} transition={{ duration: .25 }} className="flex flex-col items-center py-1 origin-top">
                  <div className="w-px h-6 bg-white/10 relative">
                    {step >= 4 && !prefersReduced && <motion.div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-none bg-accent-500 shadow-none" animate={{ top: ['-4px', '100%'] }} transition={{ duration: .6, repeat: Infinity, repeatDelay: 2, delay: i * .6 }} />}
                  </div>
                  <ChevronRight className="w-3 h-3 text-white/15 rotate-90 -mt-1" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <div className={`w-full rounded-none border border-white/8 bg-[#151413]/35 p-4 flex-shrink-0 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="flex w-full items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] text-white/35">
              <span>{flowLabels.entering}</span>
              <span className="h-1 w-1 rounded-none bg-white/20" />
              <span>{flowLabels.evaluation}</span>
            </div>
            <div className={`text-[11px] font-bold tracking-[0.22em] text-white/40 ${isRTL ? 'text-right' : 'text-left'}`}>
              {step >= 5 ? flowLabels.passed : flowLabels.checking}
            </div>
          </div>

          <div className="mt-3 h-px bg-white/10" />

          <div className="mt-4 space-y-3">
            <div className={`rounded-none border border-green-500/15 bg-green-500/10 px-4 py-3 ${step >= 4 ? 'opacity-100' : 'opacity-40'} ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-none border border-green-400/20 bg-green-400/10 text-green-300">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="min-w-0 space-y-1">
                  <div className="text-sm font-semibold text-white/88">{flowLabels.successTitle}</div>
                  <div className="text-xs leading-6 text-white/55">{flowLabels.successText}</div>
                </div>
              </div>
            </div>

            <div className={`rounded-none border border-red-500/15 bg-red-500/10 px-4 py-3 ${step >= 3 ? 'opacity-100' : 'opacity-40'} ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-none border border-red-400/20 bg-red-400/10 text-red-300">
                  <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                </div>
                <div className="min-w-0 space-y-1">
                  <div className="text-sm font-semibold text-white/88">{flowLabels.failTitle}</div>
                  <div className="text-xs leading-6 text-white/55">{flowLabels.failText}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketplaceCollageSectionContent({ t, prefersReduced, isRTL }: {
  t: ReturnType<typeof useTranslations>; prefersReduced: boolean | null; isRTL: boolean;
}) {
  const productImage = isRTL ? '/hero/hero-dashboard-fa.webp' : '/hero/hero-dashboard-en.webp';
  const tiles = [
    { src: '/platforms/basalam-logotype.svg', alt: t('integrations.channels.basalam'), title: 'Marketplace sync', note: t('showcase.inbox.messages.m2.text') },
    { src: '/platforms/digikala.svg', alt: t('integrations.channels.digikala'), title: 'Order snapshot', note: t('showcase.inbox.messages.m4.text') },
  ];
  const channels = [
    { label: t('integrations.channels.whatsapp'), icon: <MessageCircle className="h-4 w-4" />, tone: 'text-green-400 bg-green-500/10 border-green-500/20' },
    { label: t('integrations.channels.telegram'), icon: <Send className="h-4 w-4" />, tone: 'text-info bg-info/10 border-info/20' },
    { label: t('integrations.channels.basalam'), icon: <Store className="h-4 w-4" />, tone: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
    { label: t('integrations.channels.digikala'), icon: <Globe className="h-4 w-4" />, tone: 'text-warning bg-warning/10 border-warning/20' },
  ];

  return (
    <section className="scroll-mt-24 bg-white/[0.008]">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-12">
        <FadeIn>
          <div className="relative overflow-hidden rounded-none border border-white/10 bg-[#151413]/55 p-4 ring-1 ring-white/[0.02] md:p-6">
            <div className="relative grid gap-5 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
              <div className="rounded-none border border-white/8 bg-white/[0.025] p-5 md:p-6">
                <span className="inline-flex items-center gap-2 rounded-none border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold text-white/45">
                  <Globe className="h-3.5 w-3.5 text-accent-400" />
                  {t('integrations.title')}
                </span>
                <h2 className="mt-4 max-w-lg text-2xl font-black leading-tight text-white md:text-4xl">
                  {t('integrations.title')}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/58 md:text-base">
                  {t('integrations2.description')}
                </p>

                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {channels.map((channel) => (
                    <div key={channel.label} className="flex items-center gap-3 rounded-none border border-white/8 bg-black/20 px-3 py-2.5">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-none border ${channel.tone}`}>
                        {channel.icon}
                      </div>
                      <span className="text-sm font-semibold text-white/75">{channel.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
                <motion.div
                  initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
                  whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  className="relative overflow-hidden rounded-none border border-white/10 bg-[#151413]/70 p-2 sm:row-span-2"
                >
                  <div className="flex h-8 items-center justify-between border-b border-white/8 bg-white/[0.03] px-3">
                    <div className="text-[10px] font-bold tracking-[0.22em] text-white/35">{t('integrations2.flowLabel')}</div>
                    <div className="flex gap-1.5">
                      <span className="h-2 w-2 rounded-none bg-green-400/80" />
                      <span className="h-2 w-2 rounded-none bg-accent-400/80" />
                    </div>
                  </div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/30">
                    <Image src={productImage} alt="" fill className="object-contain" sizes="(min-width: 1024px) 42vw, 100vw" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#151413]/35 via-transparent to-transparent" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 border-t border-white/8 bg-black/20 p-2">
                    {[MessageCircle, Send, Store].map((Icon, index) => (
                      <div key={index} className="rounded-none border border-white/8 bg-white/[0.03] p-2 text-white/45">
                        <Icon className="h-4 w-4" />
                      </div>
                    ))}
                  </div>
                </motion.div>

                {tiles.map((tile, index) => (
                  <motion.div
                    key={tile.title}
                    initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
                    whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className="relative overflow-hidden rounded-none border border-white/10 bg-[#151413]/65 p-4"
                  >
                    <div className="relative flex min-h-[118px] flex-col justify-between">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-xs font-bold text-white/35">Marketplace</div>
                          <h3 className="mt-1 text-base font-black text-white/90">{tile.title}</h3>
                        </div>
                        <div className="relative h-12 w-12 overflow-hidden rounded-none border border-white/10 bg-white/[0.04] p-2">
                          <Image src={tile.src} alt={tile.alt} fill className="object-contain p-2" sizes="48px" unoptimized />
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-white/52">{tile.note}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Pricing                                                            */
/* ================================================================== */
function PricingSection({ id, locale, t, plans, localizedTrialDays }: {
  id?: string; locale: string; t: ReturnType<typeof useTranslations>; plans: ReturnType<typeof getLocalizedPublicBillingPlans>; localizedTrialDays: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 bg-[#121110] py-8 md:py-12 border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-none border border-white/10 bg-[#151413]/55 px-5 py-8 ring-1 ring-white/[0.02] md:px-8 md:py-10">
          <div className="relative z-10">
            <FadeIn>
              <div className="mb-8 text-center">
                <span className="mb-4 inline-flex items-center gap-2 rounded-none border border-accent-400/20 bg-accent-400/10 px-3 py-1 text-[11px] font-bold text-accent-100">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {t('pricing.reassurance', { days: localizedTrialDays })}
                </span>
                <h2 className="mb-3 text-3xl font-black text-white md:text-4xl">{t('pricing.title')}</h2>
                <p className="mx-auto max-w-2xl text-sm leading-7 text-white/62 md:text-base">{t('pricing.description', { days: localizedTrialDays })}</p>
              </div>
            </FadeIn>
            <StaggerContainer className="grid gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <StaggerItem key={plan.key} className="h-full">
                  <PricingCard
                    name={plan.title}
                    priceLabel={formatPublicBillingPlanPrice(plan.key, locale)}
                    description={plan.description}
                    bestFor={plan.bestFor}
                    features={plan.features}
                    popular={plan.highlighted}
                    popularLabel={t('pricing.mostPopular')}
                    perMonthLabel={t('pricing.perMonth')}
                    ctaHref={buildPublicSignupHref(locale, plan.key)}
                    ctaLabel={t('pricing.choosePlan', { plan: plan.title })}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Demo — visual + simplified form                                    */
/* ================================================================== */
function DemoSection({ t, locale }: {
  t: ReturnType<typeof useTranslations>;
  locale: string;
}) {
  return (
    <FadeIn>
      <section id="contact" className="scroll-mt-24 bg-[#0d0d0c] py-8 md:py-12 border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="relative overflow-hidden rounded-none border border-white/10 bg-[#151413]/50 ring-1 ring-white/[0.02]">
            <div className="relative grid lg:grid-cols-2">
              <div className="flex items-center justify-center p-6 md:p-10">
                <DemoVisual locale={locale} />
              </div>
              <div className="flex flex-col justify-center border-s border-white/10 bg-white/[0.03] p-6 md:p-10">
                <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-none border border-accent-400/20 bg-accent-400/10 px-3 py-1 text-[11px] font-bold text-accent-100">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {t('demo.kicker')}
                </span>
                <h3 className="mb-3 text-2xl font-black leading-tight text-white md:text-3xl">
                  {t('demo.titleLead')} {t('demo.titleAccent') && <span className="text-accent-200">{t('demo.titleAccent')} </span>}{t('demo.titleTail')}
                </h3>
                <p className="mb-6 text-sm leading-7 text-white/64">{t('demo.description')}</p>
                <DemoForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}

/* ── Demo Visual ── */
function DemoVisual({ locale }: { locale: string }) {
  const isFa = locale === 'fa';
  const customerTime = isFa ? toEasternArabicDigits('09:00') : '09:00';
  const aiTime = isFa ? toEasternArabicDigits('09:01') : '09:01';

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-none border border-white/10 bg-[#151413]/70 p-3 ring-1 ring-white/[0.02]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-none border border-white/8 bg-black/45 p-4 flex flex-col justify-between" dir={isFa ? 'rtl' : 'ltr'}>
        {/* Chat Visual Mockup */}
        <div className="space-y-4">
          <div className="flex items-start gap-2.5">
            <div className="h-7 w-7 rounded-none bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/50 shrink-0">C</div>
            <div className="rounded-none border border-white/5 bg-[#1d1c1a]/90 p-3 text-xs text-white/90 max-w-[82%] leading-relaxed">
              <div className="mb-1 text-[9px] font-bold text-white/30">{customerTime}</div>
              {isFa ? 'چطور می‌توانم ورودی واتساپ و باسلام را متصل کنم؟' : 'How do I connect Basalam and WhatsApp channels?'}
            </div>
          </div>

          <div className="flex items-start gap-2.5 justify-end">
            <div className="rounded-none border border-accent-500/30 bg-accent-500/20 p-3 text-xs text-white max-w-[82%] leading-relaxed">
              <div className="mb-1 flex items-center gap-1 text-[9px] font-bold text-accent-300">
                <Bot className="w-3 h-3" />
                <span>{aiTime}</span>
              </div>
              {isFa 
                ? 'کافی است به تنظیمات کانال بروید و با اسکن کیوآرکد واتساپ و وارد کردن توکن باسلام، همگام‌سازی را در ۱ دقیقه فعال کنید.' 
                : 'Just head to Channel Settings. Scan the WhatsApp QR code and enter your Basalam credentials to sync in 1 minute.'}
            </div>
            <div className="h-7 w-7 rounded-none bg-accent-500/20 flex items-center justify-center shrink-0"><Bot className="w-4 h-4 text-accent-400" /></div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-2 flex items-center justify-between text-[9px] text-white/30 font-mono">
          <span>AI REP ACTIVE</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-none bg-green-400 animate-pulse" /> LIVE</span>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { label: 'Inbox', value: '+24%' },
          { label: 'AI', value: isFa ? toEasternArabicDigits('1m') : '1m' },
          { label: 'CRM', value: 'Live' },
        ].map((item) => (
          <div key={item.label} className="rounded-none border border-white/8 bg-black/20 p-2 text-center">
            <div className="text-sm font-black text-white">{item.value}</div>
            <div className="mt-1 text-[10px] font-semibold text-white/35">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Final CTA ── */
function FinalCTA({ locale, t, isRTL, localizedTrialDays }: { locale: string; t: ReturnType<typeof useTranslations>; isRTL: boolean; localizedTrialDays: string }) {
  return (
    <section className="bg-[#151413] py-8 md:py-12 border-t border-white/5">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <FadeIn>
          <div className="relative isolate overflow-hidden rounded-none border border-white/10 bg-[#151413]/55 px-6 py-10 text-center ring-1 ring-white/[0.02] md:px-10 md:py-12">
            <div className="absolute inset-0 -z-10 border border-accent-500/10 bg-accent-500/5" />
            <div className="relative z-10">
              <span className="mb-4 inline-flex items-center gap-2 rounded-none border border-accent-400/20 bg-accent-400/10 px-3 py-1 text-[11px] font-bold text-accent-100">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {t('finalCta.kicker', { days: localizedTrialDays })}
              </span>
              <h2 className="mb-4 text-2xl font-black leading-tight text-white md:text-4xl">{t('finalCta.title')}</h2>
              <p className="mx-auto mb-8 max-w-xl text-sm leading-7 text-white/64 md:text-base">{t('finalCta.description')}</p>
              <Link href={buildPublicSignupHref(locale)}
                className="group inline-flex items-center gap-2 rounded-none border border-primary bg-primary px-8 py-4 text-lg font-black text-primary-foreground shadow-[0_18px_60px_rgba(234,88,12,0.28)] transition-colors hover:bg-primary/90 active:translate-y-[1px]">
                {t('finalCta.cta')}
                <ArrowRight className={`h-5 w-5 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`} />
              </Link>
              <p className="mx-auto mt-4 max-w-md text-xs font-semibold text-white/55">{t('finalCta.reassurance')}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Form                                                               */
/* ================================================================== */
function DemoForm() {
  const t = useTranslations('landingPage');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/landing/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (!res.ok) throw new Error('Failed');
      toast.success(t('demo.form.success'));
      setFormData({ name: '', email: '', message: '' });
    } catch { toast.error(t('demo.form.error')); } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-busy={loading}>
      <div className="space-y-1.5">
        <label htmlFor="landing-demo-name" className="text-[11px] font-bold text-white/62">{t('demo.form.fullName')}</label>
        <input id="landing-demo-name" name="name" required autoComplete="name" type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
          className="w-full select-text rounded-none border border-white/15 bg-white/[0.07] px-4 py-2.5 text-sm text-white transition-colors placeholder:text-white/35 focus:border-accent-400/60 focus:outline-none"
          placeholder={t('demo.form.fullNamePlaceholder')} />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="landing-demo-email" className="text-[11px] font-bold text-white/62">{t('demo.form.email')}</label>
        <input id="landing-demo-email" name="email" required autoComplete="email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
          className="w-full select-text rounded-none border border-white/15 bg-white/[0.07] px-4 py-2.5 text-sm text-white transition-colors placeholder:text-white/35 focus:border-accent-400/60 focus:outline-none"
          placeholder={t('demo.form.emailPlaceholder')} />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="landing-demo-message" className="text-[11px] font-bold text-white/62">{t('demo.form.help')}</label>
        <textarea id="landing-demo-message" name="message" rows={3} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
          className="w-full select-text resize-none rounded-none border border-white/15 bg-white/[0.07] px-4 py-2.5 text-sm text-white transition-colors placeholder:text-white/35 focus:border-accent-400/60 focus:outline-none"
          placeholder={t('demo.form.helpPlaceholder')} />
      </div>
      <button disabled={loading} type="submit" aria-busy={loading}
        className="w-full rounded-none border border-primary bg-primary py-3 font-bold text-primary-foreground shadow-[0_16px_48px_rgba(234,88,12,0.22)] transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-[1px]">
        <span>{loading ? t('demo.form.submitting') : t('demo.form.submit')}</span>
      </button>
    </form>
  );
}

/* ================================================================== */
/*  Pricing Card                                                       */
/* ================================================================== */
function PricingCard({ name, priceLabel, description, bestFor, features, popular = false, popularLabel, perMonthLabel, ctaHref, ctaLabel }: {
  name: string; priceLabel: string; description: string; bestFor: string; features: string[]; popular?: boolean;
  popularLabel: string; perMonthLabel: string; ctaHref: string; ctaLabel: string;
}) {
  return (
    <div className={`relative flex h-full flex-col overflow-hidden rounded-none border bg-[#1d1c1a] p-8 ${popular ? 'border-accent-400/55 shadow-[0_0_80px_rgba(251,146,60,0.12)] ring-1 ring-accent-300/20' : 'border-white/10 ring-1 ring-white/[0.02]'}`}>
      {popular && <div className="absolute end-0 top-0 rounded-none bg-accent-500 px-5 py-1.5 text-xs font-black text-white">{popularLabel}</div>}
      <div className="flex min-h-full flex-col">
        <h3 className="text-2xl font-black text-white">{name}</h3>
        <p className="mt-3 text-sm leading-7 text-white/62">{description}</p>
        <div className="mt-7 min-h-[7.5rem]">
          <div className="mt-2 mb-1 flex flex-wrap items-end gap-2">
            <span className="text-[1.6rem] leading-none font-black text-white sm:text-[1.8rem]">{priceLabel}</span>
            <span className="mb-1 text-sm font-semibold text-white/55">{perMonthLabel}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-white/60">{bestFor}</p>
        </div>
        <ul className="mb-8 mt-2 flex-1 space-y-3">
          {features.map(f => <li key={f} className="flex items-start gap-3 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" /><span className="leading-6 text-white/75">{f}</span></li>)}
        </ul>
        <div className="space-y-3 pt-2">
          <Link href={ctaHref} className={`block w-full rounded-none py-3 text-center font-bold transition-colors ${popular ? 'border border-primary bg-primary text-primary-foreground shadow-[0_16px_48px_rgba(234,88,12,0.22)] hover:bg-primary/90' : 'border border-white/15 bg-white/[0.03] text-white/85 hover:bg-white/[0.06] hover:text-white'}`}>{ctaLabel}</Link>
        </div>
      </div>
    </div>
  );
}
