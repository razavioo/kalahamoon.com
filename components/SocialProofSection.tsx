'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Bot, MessageCircle, Quote, ShieldCheck, Store } from 'lucide-react';
import { toLocaleNumber } from '@/lib/format-number';

export function SocialProofSection({ locale, localizedTrialDays }: { locale: string; localizedTrialDays: string; prefersReduced: boolean | null }) {
  const t = useTranslations('landingPage.socialProof');

  const testimonials = [
    { key: 't1', avatar: '/avatars/avatar_1.png' },
    { key: 't2', avatar: '/avatars/avatar_2.png' },
    { key: 't3', avatar: '/avatars/avatar_3.png' },
  ] as const;

  const trustItems = [
    { icon: <MessageCircle className="h-4 w-4" />, value: t('trust.channels.value', { count: toLocaleNumber(4, locale) }), label: t('trust.channels.label') },
    { icon: <Bot className="h-4 w-4" />, value: t('trust.automation.value'), label: t('trust.automation.label') },
    { icon: <Store className="h-4 w-4" />, value: t('trust.marketplaces.value'), label: t('trust.marketplaces.label') },
    { icon: <ShieldCheck className="h-4 w-4" />, value: t('trust.trial.value', { days: localizedTrialDays }), label: t('trust.trial.label') },
  ];

  return (
    <section className="bg-[#1c1a19] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="mb-8 text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-none border border-accent-400/20 bg-accent-400/10 px-3 py-1 text-[11px] font-bold text-accent-100">
          <span className="h-px w-4 bg-accent-300" aria-hidden="true" />
          {t('label')}
        </span>
        <h2 className="text-2xl font-black tracking-tight text-white md:text-4xl">{t('title')}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/64 md:text-base">{t('description')}</p>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((item) => (
          <div key={item.label} className="rounded-none border border-white/10 bg-[#151413]/65 p-4 ring-1 ring-white/[0.02]">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-none border border-accent-400/20 bg-accent-400/10 text-accent-200">
              {item.icon}
            </div>
            <div className="text-xl font-black text-white">{item.value}</div>
            <p className="mt-1 text-xs leading-6 text-white/58">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map(({ key, avatar }) => {
          const testimonial = {
            quote: t(`testimonials.${key}.quote`),
            name: t(`testimonials.${key}.name`),
            role: t(`testimonials.${key}.role`),
            company: t(`testimonials.${key}.company`),
          };

          return (
            <div key={key} className="relative flex h-full flex-col rounded-none border border-white/10 bg-[#151413]/65 p-6 ring-1 ring-white/[0.02]">
              <Quote className="mb-4 h-5 w-5 text-accent-300/70" />

              <p className="mb-6 flex-1 text-sm leading-7 text-white/74">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="w-9 h-9 rounded-full relative overflow-hidden shrink-0">
                  <Image src={avatar} alt={testimonial.name} fill className="object-cover" sizes="36px" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white/90">{testimonial.name}</div>
                  <div className="text-xs text-white/55">{testimonial.role} · {testimonial.company}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
