'use client';

import { useParams } from 'next/navigation';
import { type Locale, translate, isLocale } from './i18n';

/**
 * Local shim for next-intl's useTranslations hook.
 * Reads locale from Next.js route params and delegates to the static
 * translate() helper so copied main-repo components compile unchanged.
 */
export function useTranslations(namespace?: string) {
  const params = useParams();
  const rawLocale = (params?.locale as string) || 'en';
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';

  return (key: string, values?: Record<string, string | number>) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return translate(locale, fullKey, values);
  };
}
