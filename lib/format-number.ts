/**
 * Number formatting utility with Persian Eastern Arabic-Indic numeral support.
 *
 * Use `toLocaleNumber(n, locale)` anywhere a number is displayed to the user.
 * Pass it to Recharts `tickFormatter` for chart axes.
 */

const EASTERN_ARABIC = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

/**
 * Convert ASCII digits in a string to Eastern Arabic-Indic numerals (used in Persian).
 */
export function toEasternArabicDigits(str: string): string {
    return str.replace(/\d/g, (d) => EASTERN_ARABIC[parseInt(d, 10)]);
}

/**
 * Format a number for display in the given locale.
 *
 * - `fa`: returns Eastern Arabic-Indic numeral string
 * - other: returns standard western numeral string
 */
export function toLocaleNumber(value: number | string, locale: string): string {
    const n = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(n)) return String(value);

    if (locale === 'fa') {
        // Use Intl for grouping/decimal formatting, then convert digits
        try {
            const formatted = new Intl.NumberFormat('fa-IR').format(n);
            return formatted; // fa-IR already returns Eastern Arabic-Indic digits
        } catch {
            return toEasternArabicDigits(String(n));
        }
    }

    return new Intl.NumberFormat('en-US').format(n);
}

/**
 * Format a compact number (e.g. 1.2K, 3.4M) for chart labels.
 */
export function toCompactNumber(value: number, locale: string): string {
    try {
        const formatted = new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US', {
            notation: 'compact',
            maximumFractionDigits: 1,
        }).format(value);
        return formatted;
    } catch {
        return toLocaleNumber(value, locale);
    }
}

/**
 * Create a Recharts-compatible tickFormatter that respects locale.
 */
export function makeTickFormatter(locale: string): (value: number) => string {
    return (value: number) => toLocaleNumber(value, locale);
}

/**
 * Create a Recharts-compatible compact tickFormatter for large numbers (revenue, etc.).
 */
export function makeCompactTickFormatter(locale: string): (value: number) => string {
    return (value: number) => toCompactNumber(value, locale);
}

export function formatPercent(value: number, locale: string, maximumFractionDigits = 1): string {
    const formatted = toLocaleNumber(Number(value.toFixed(maximumFractionDigits)), locale);
    return locale === 'fa' ? `${formatted} درصد` : `${formatted}%`;
}

export function formatSignedPercent(value: number, locale: string, maximumFractionDigits = 1): string {
    const sign = value > 0 ? '+' : value < 0 ? '-' : '';
    return `${sign}${formatPercent(Math.abs(value), locale, maximumFractionDigits)}`;
}

export function formatPercentChange(change: string | number | null | undefined, locale: string): string {
    if (change == null) return formatSignedPercent(0, locale);
    if (typeof change === 'number') return formatSignedPercent(change, locale);

    const trimmed = change.trim();
    const sign = trimmed.startsWith('-') ? -1 : 1;
    const numeric = Number.parseFloat(trimmed.replace(/[+%]/g, ''));
    if (!Number.isFinite(numeric)) return change;

    return formatSignedPercent(sign * numeric, locale);
}

type TranslationFn = (key: string, values?: Record<string, string | number>) => string;

/**
 * Format an average response time in minutes with localized units.
 * A zero value means there are no response-time samples, not an instant response.
 */
export function formatResponseTimeMinutes(
    minutes: number | null | undefined,
    t: TranslationFn,
    options: { unavailableKey?: string; round?: boolean } = {}
): string {
    const unavailableKey = options.unavailableKey ?? 'notAvailable';
    if (minutes == null || !Number.isFinite(minutes) || minutes <= 0) {
        return t(unavailableKey);
    }

    if (minutes < 60) {
        const count = options.round === false ? Number(minutes.toFixed(1)) : Math.round(minutes);
        return t('minutesShort', { count });
    }

    return t('hoursShort', { count: Number((minutes / 60).toFixed(1)) });
}
