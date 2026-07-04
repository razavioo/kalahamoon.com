'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from '@/components/motion';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { buildPublicSignupHref } from '@/lib/public-signup';

export function MobileStickyBar({ locale }: { locale: string }) {
  const t = useTranslations('landingPage.stickyBar');
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => setVisible(v > 300));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-0 inset-x-0 z-50 md:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="border-t border-white/8 bg-[#020617]/95 backdrop-blur-xl px-4 py-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-white/40 truncate">{t('sub')}</p>
            </div>
            <Link
              href={buildPublicSignupHref(locale)}
              className="shrink-0 px-5 py-2.5 bg-primary text-primary-foreground font-bold text-sm rounded-none active:translate-y-[1px] transition-colors"
            >
              {t('cta')}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
