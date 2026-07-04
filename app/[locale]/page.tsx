import { notFound } from "next/navigation";
import { isLocale } from "../../lib/i18n";
import LandingPage from "@/components/LandingPage";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return <LandingPage locale={locale} />;
}
