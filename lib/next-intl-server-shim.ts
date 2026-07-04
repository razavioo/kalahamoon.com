import { type Locale, translate, isLocale } from './i18n';

/**
 * Server-side shim for next-intl/server's getTranslations.
 * Returns a translator function for the given locale + namespace.
 */
export async function getTranslations(
  options: { locale: string; namespace?: string }
): Promise<(key: string, values?: Record<string, string | number>) => string> {
  const locale: Locale = isLocale(options.locale) ? options.locale : 'en';
  const namespace = options.namespace;

  return (key: string, values?: Record<string, string | number>) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return translate(locale, fullKey, values);
  };
}
