import { notFound } from "next/navigation";
import { LegalPage } from "../../../components/LegalPage";
import { isLocale } from "../../../lib/i18n";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return <LegalPage locale={locale} namespace="privacy" />;
}
