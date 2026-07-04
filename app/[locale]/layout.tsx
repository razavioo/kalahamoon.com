import type { Metadata } from "next";
import { getDirection, isLocale, locales, translate } from "../../lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) {
    return {};
  }

  return {
    title: translate(rawLocale, "common.appSlogan"),
    description: translate(rawLocale, "common.appSloganDescription"),
    openGraph: {
      title: translate(rawLocale, "common.appSlogan"),
      description: translate(rawLocale, "common.appSloganDescription"),
      type: "website",
      siteName: translate(rawLocale, "common.appName"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) {
    return null;
  }

  const direction = getDirection(rawLocale);

  return (
    <html lang={rawLocale} dir={direction} className="dark" suppressHydrationWarning>
      <body className={`${rawLocale === "fa" ? "font-vazirmatn" : "font-sans"} bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
