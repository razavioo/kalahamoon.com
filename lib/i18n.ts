import en from "../locales/en.json";
import fa from "../locales/fa.json";

export const locales = ["en", "fa"] as const;
export type Locale = (typeof locales)[number];

type MessageValue = string | number | boolean | null | MessageTree | MessageValue[];
type MessageTree = {
  [key: string]: MessageValue;
};

const messages: Record<Locale, MessageTree> = {
  en: en as MessageTree,
  fa: fa as MessageTree,
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "fa" ? "rtl" : "ltr";
}

export function getMessages(locale: Locale): MessageTree {
  return messages[locale];
}

export function translate(
  locale: Locale,
  key: string,
  values?: Record<string, string | number>
): string {
  const value = key.split(".").reduce<MessageValue | undefined>((current, segment) => {
    if (!current || typeof current !== "object" || Array.isArray(current)) {
      return undefined;
    }
    return current[segment];
  }, getMessages(locale));

  if (typeof value !== "string") {
    return key;
  }

  if (!values) {
    return value;
  }

  return value.replace(/\{(\w+)\}/g, (_, token: string) => String(values[token] ?? ""));
}

export function listSectionKeys(
  locale: Locale,
  key: string
): string[] {
  const value = key.split(".").reduce<MessageValue | undefined>((current, segment) => {
    if (!current || typeof current !== "object" || Array.isArray(current)) {
      return undefined;
    }
    return current[segment];
  }, getMessages(locale));

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return [];
  }

  return Object.keys(value);
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(value);
}
