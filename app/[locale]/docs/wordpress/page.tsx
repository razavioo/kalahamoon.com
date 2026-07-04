import { notFound } from "next/navigation";
import { PublicChrome } from "../../../../components/PublicChrome";
import { type Locale, isLocale } from "../../../../lib/i18n";
import { runtimeHref } from "../../../../lib/links";

const wordpressCopy: Record<Locale, {
  eyebrow: string;
  title: string;
  description: string;
  steps: string[];
  authNote: string;
  cta: string;
}> = {
  en: {
    eyebrow: "WordPress / WooCommerce",
    title: "WooCommerce plugin setup for Kalahamoon",
    description:
      "Use this static reference page for the public installation overview. Plugin downloads, API keys, and sync logs stay inside the authenticated Kalahamoon app.",
    steps: [
      "Install the WordPress plugin package from the live app.",
      "Create an API key in Kalahamoon settings.",
      "Paste the key into WordPress and run a product sync.",
      "Review captured products and orders from the Kalahamoon dashboard.",
    ],
    authNote:
      "Login is required for plugin files, organization credentials, and destination configuration.",
    cta: "Open plugin settings",
  },
  fa: {
    eyebrow: "وردپرس / ووکامرس",
    title: "راه‌اندازی افزونه ووکامرس کالاهامون",
    description:
      "این صفحه استاتیک، نمای عمومی نصب افزونه را توضیح می‌دهد. دانلود فایل افزونه، کلیدهای API و گزارش‌های همگام‌سازی داخل اپلیکیشن احراز هویت‌شده کالاهامون باقی می‌مانند.",
    steps: [
      "بسته افزونه وردپرس را از اپلیکیشن اصلی نصب کنید.",
      "در تنظیمات کالاهامون یک کلید API بسازید.",
      "کلید را در وردپرس وارد کنید و همگام‌سازی محصول را اجرا کنید.",
      "محصولات و سفارش‌های دریافت‌شده را در داشبورد کالاهامون بررسی کنید.",
    ],
    authNote:
      "برای دریافت فایل افزونه، اعتبارنامه‌های سازمان و تنظیم مقصدها باید وارد حساب شوید.",
    cta: "باز کردن تنظیمات افزونه",
  },
};

export default async function WordPressDocsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const copy = wordpressCopy[locale];

  return (
    <PublicChrome locale={locale} compact>
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-accent-400">{copy.eyebrow}</p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-tight text-white md:text-6xl">
          {copy.title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/62">
          {copy.description}
        </p>
        <div className="mt-10 grid gap-px border border-white/10 bg-white/10">
          {copy.steps.map((item, index) => (
            <article key={item} className="grid gap-5 bg-[#151413] p-6 sm:grid-cols-[3rem_1fr]">
              <span className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.03] font-mono text-xs font-bold text-accent-300">
                {new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", { minimumIntegerDigits: 2, useGrouping: false }).format(index + 1)}
              </span>
              <p className="text-sm leading-7 text-white/62">{item}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 border border-accent-500/25 bg-accent-500/[0.045] p-6">
          <p className="text-sm leading-7 text-white/62">
            {copy.authNote}
          </p>
          <a href={runtimeHref(locale, "settings/wordpress-plugin")} className="mt-5 inline-flex bg-accent-500 px-5 py-3 font-mono text-xs font-bold uppercase text-white hover:bg-accent-600">
            {copy.cta}
          </a>
        </div>
      </section>
    </PublicChrome>
  );
}
