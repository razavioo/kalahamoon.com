'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const;

export function FAQSection(_props: { prefersReduced: boolean | null }) {
  const t = useTranslations('landingPage.faq');
  const [open, setOpen] = useState<string | null>(null);

  const items = FAQ_KEYS.map((key) => ({
    key,
    q: t(`items.${key}.q`),
    a: t(`items.${key}.a`),
  }));

  return (
    <section id="faq" className="scroll-mt-24 bg-[#181716] py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="mb-10 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-none border border-accent-400/20 bg-accent-400/10 px-3 py-1 text-[11px] font-bold text-accent-100">
            <span className="h-px w-4 bg-accent-300" aria-hidden="true" />
            {t('label')}
          </span>
          <h2 className="text-2xl font-black tracking-tight text-white md:text-4xl">{t('title')}</h2>
        </div>

        <div className="space-y-3">
          {items.map((item) => {
            const isOpen = open === item.key;
            return (
              <div
                key={item.key}
                className={`rounded-none border ring-1 ring-white/[0.02] transition-colors ${isOpen ? 'border-accent-400/35 bg-white/[0.07]' : 'border-white/10 bg-[#151413]/65'}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : item.key)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
                >
                  <span className="text-sm font-medium text-white/90">{item.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-white/70' : 'text-white/40'}`} />
                </button>

                {isOpen && (
                  <p className="px-5 pb-5 text-sm leading-7 text-white/66">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
