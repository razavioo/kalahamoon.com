export type CurrencyCode = 'IRR' | 'USD' | 'EUR' | 'AED' | (string & {});
export type DisplayUnit = 'CURRENCY' | 'IRR' | 'TOMAN';
export type ReportingMode = 'SPLIT_BY_CURRENCY' | 'CONVERT_OPTIONAL' | 'BASE_CURRENCY_ONLY';

export interface ExchangeRateSnapshot {
  baseCurrency: CurrencyCode;
  quoteCurrency: CurrencyCode;
  rate: number;
  capturedAt: string;
  source?: string | null;
}

export interface Money {
  amount: number;
  currency: CurrencyCode;
}

export interface MoneyInput {
  amount: number;
  currency: CurrencyCode;
  displayUnit?: DisplayUnit | null;
}

export interface MoneyPresentation {
  amount: number;
  currency: CurrencyCode;
  displayAmount: number;
  displayCurrency: CurrencyCode;
  displayUnit: DisplayUnit;
  formatted: string;
}

export interface MoneyDisplayPreferences {
  baseCurrency?: CurrencyCode | null;
  defaultDisplayCurrency?: CurrencyCode | null;
  defaultDisplayUnit?: DisplayUnit | null;
  reportingMode?: ReportingMode | null;
}

export interface FormatMoneyOptions {
  locale?: string;
  displayUnit?: DisplayUnit | null;
  defaultDisplayUnit?: DisplayUnit | null;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export const TOMAN_TO_RIAL = 10;
export const DEFAULT_MONEY_PREFERENCES: Required<MoneyDisplayPreferences> = {
  baseCurrency: 'IRR',
  defaultDisplayCurrency: 'IRR',
  defaultDisplayUnit: 'TOMAN',
  reportingMode: 'SPLIT_BY_CURRENCY',
};

export function normalizeMoneyLocale(locale: string | null | undefined): string {
  const normalizedLocale = String(locale || '').trim().toLowerCase();
  if (normalizedLocale === 'fa' || normalizedLocale.startsWith('fa-')) {
    return 'fa-IR';
  }
  if (normalizedLocale === 'en' || normalizedLocale.startsWith('en-')) {
    return 'en-US';
  }

  return locale || 'en-US';
}

export function normalizeCurrencyCode(currency: string | null | undefined): CurrencyCode {
  const normalized = String(currency || '').trim().toUpperCase();
  if (!normalized) {
    return 'IRR';
  }

  if (normalized === 'TOMAN' || normalized === 'IRT') {
    return 'IRR';
  }

  return normalized as CurrencyCode;
}

export function normalizeDisplayUnit(
  displayUnit: string | null | undefined,
  currency?: string | null
): DisplayUnit {
  const normalizedUnit = String(displayUnit || '').trim().toUpperCase();
  if (normalizedUnit === 'IRR' || normalizedUnit === 'TOMAN' || normalizedUnit === 'CURRENCY') {
    return normalizedUnit;
  }

  return normalizeCurrencyCode(currency) === 'IRR' ? 'TOMAN' : 'CURRENCY';
}

export function normalizeMoneyDisplayPreferences(
  preferences?: MoneyDisplayPreferences | null
): Required<MoneyDisplayPreferences> {
  return {
    baseCurrency: normalizeCurrencyCode(preferences?.baseCurrency ?? DEFAULT_MONEY_PREFERENCES.baseCurrency),
    defaultDisplayCurrency: normalizeCurrencyCode(preferences?.defaultDisplayCurrency ?? DEFAULT_MONEY_PREFERENCES.defaultDisplayCurrency),
    defaultDisplayUnit: normalizeDisplayUnit(
      preferences?.defaultDisplayUnit ?? DEFAULT_MONEY_PREFERENCES.defaultDisplayUnit,
      preferences?.defaultDisplayCurrency ?? preferences?.baseCurrency ?? DEFAULT_MONEY_PREFERENCES.defaultDisplayCurrency
    ),
    reportingMode: (preferences?.reportingMode ?? DEFAULT_MONEY_PREFERENCES.reportingMode) as ReportingMode,
  };
}

export function canonicalizeMoneyInput(input: MoneyInput): Money {
  const currency = normalizeCurrencyCode(input.currency);
  const displayUnit = normalizeDisplayUnit(input.displayUnit, currency);

  if (currency === 'IRR' && displayUnit === 'TOMAN') {
    return {
      amount: input.amount * TOMAN_TO_RIAL,
      currency: 'IRR',
    };
  }

  return {
    amount: input.amount,
    currency,
  };
}

function formatIranianMoney(
  amount: number,
  displayUnit: DisplayUnit,
  locale: string,
  minimumFractionDigits: number,
  maximumFractionDigits: number
): string {
  const isToman = displayUnit === 'TOMAN';
  const displayAmount = isToman ? amount / TOMAN_TO_RIAL : amount;
  const label = isToman ? (locale.startsWith('fa') ? 'تومان' : 'Toman') : 'IRR';
  return `${new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(displayAmount)} ${label}`;
}

export function formatMoney(amount: number, currency: string = 'IRR', options: FormatMoneyOptions = {}): string {
  const normalizedCurrency = normalizeCurrencyCode(currency);
  const locale = normalizeMoneyLocale(options.locale);
  const minimumFractionDigits = options.minimumFractionDigits ?? 0;
  const maximumFractionDigits = options.maximumFractionDigits ?? 0;
  const displayUnit = normalizeDisplayUnit(options.displayUnit ?? options.defaultDisplayUnit, normalizedCurrency);

  if (normalizedCurrency === 'IRR') {
    return formatIranianMoney(amount, displayUnit, locale, minimumFractionDigits, maximumFractionDigits);
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: normalizedCurrency,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(amount);
  } catch {
    return `${new Intl.NumberFormat(locale, {
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(amount)} ${normalizedCurrency}`;
  }
}

export function formatMinorMoney(
  amountMinor: bigint | number,
  currency: string,
  options: Omit<FormatMoneyOptions, 'displayUnit'> & { displayUnit?: DisplayUnit | null } = {}
): string {
  const normalizedCurrency = normalizeCurrencyCode(currency);
  const numericAmountMinor = typeof amountMinor === 'bigint' ? Number(amountMinor) : amountMinor;

  if (normalizedCurrency === 'USD') {
    return formatMoney(numericAmountMinor / 100, normalizedCurrency, {
      ...options,
      defaultDisplayUnit: 'CURRENCY',
    });
  }

  return formatMoney(numericAmountMinor, normalizedCurrency, options);
}

export function buildMoneyPresentation(
  amount: number,
  currency: string,
  preferences?: MoneyDisplayPreferences | null,
  locale = 'en-US'
): MoneyPresentation {
  const normalizedCurrency = normalizeCurrencyCode(currency);
  const normalizedPreferences = normalizeMoneyDisplayPreferences(preferences);
  const displayUnit = normalizeDisplayUnit(normalizedPreferences.defaultDisplayUnit, normalizedCurrency);
  const displayAmount = normalizedCurrency === 'IRR' && displayUnit === 'TOMAN'
    ? amount / TOMAN_TO_RIAL
    : amount;

  return {
    amount,
    currency: normalizedCurrency,
    displayAmount,
    displayCurrency: normalizedCurrency,
    displayUnit,
    formatted: formatMoney(amount, normalizedCurrency, {
      locale,
      defaultDisplayUnit: displayUnit,
    }),
  };
}

export function sumMoneyByCurrency<T extends { currency: string; amount: number }>(items: T[]): Record<string, number> {
  return items.reduce<Record<string, number>>((totals, item) => {
    const currency = normalizeCurrencyCode(item.currency);
    totals[currency] = (totals[currency] || 0) + item.amount;
    return totals;
  }, {});
}
