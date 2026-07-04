import type { Locale } from "./i18n";

const runtimeOrigin = (process.env.NEXT_PUBLIC_RUNTIME_APP_URL || "https://app.kalahamoon.com").replace(/\/$/, "");

export function publicHref(locale: Locale, path = ""): string {
  const normalizedPath = path ? `/${path.replace(/^\/+/, "")}` : "";
  return `/${locale}${normalizedPath}`;
}

export function runtimeHref(locale: Locale, path = ""): string {
  const normalizedPath = path ? `/${path.replace(/^\/+/, "")}` : "";
  return `${runtimeOrigin}/${locale}${normalizedPath}`;
}

export function runtimePath(path = ""): string {
  const normalizedPath = path ? `/${path.replace(/^\/+/, "")}` : "";
  return `${runtimeOrigin}${normalizedPath}`;
}

export function signupHref(locale: Locale, plan = "GROWTH"): string {
  return `${runtimeHref(locale, "signup")}?plan=${encodeURIComponent(plan)}`;
}
