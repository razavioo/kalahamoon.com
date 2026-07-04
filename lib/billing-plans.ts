/**
 * Static-safe billing plans module for the public site.
 * Inlines plan pricing directly — no payment/pricing.ts import needed.
 */
import { type BillingPlan, BILLING_PLANS } from './billing-entitlements';
import { getBillingEntitlementNoteForPlan } from './billing-entitlements';
import { formatMoney } from './money';

export const ORGANIZATION_TRIAL_DAYS = 14;

type BillingTranslationValue = string | number;
export type BillingTranslator = (
  key: string,
  values?: Record<string, BillingTranslationValue>
) => string;

interface PublicBillingPlanMetadata {
  key: BillingPlan;
  monthlyPriceUsd: number;
  highlighted?: boolean;
}

export interface PublicBillingPlan extends PublicBillingPlanMetadata {
  title: string;
  description: string;
  bestFor: string;
  features: string[];
}

const PUBLIC_BILLING_PLAN_METADATA: Record<BillingPlan, PublicBillingPlanMetadata> = {
  STARTER: {
    key: 'STARTER',
    monthlyPriceUsd: 29,
  },
  GROWTH: {
    key: 'GROWTH',
    monthlyPriceUsd: 79,
    highlighted: true,
  },
  PRO: {
    key: 'PRO',
    monthlyPriceUsd: 199,
  },
};

const DEFAULT_PUBLIC_BILLING_PLAN =
  (Object.values(PUBLIC_BILLING_PLAN_METADATA).find((plan) => plan.highlighted)?.key ?? BILLING_PLANS[0]);

function getPlanTranslationKey(plan: BillingPlan): 'starter' | 'growth' | 'pro' {
  if (plan === 'STARTER') return 'starter';
  if (plan === 'GROWTH') return 'growth';
  return 'pro';
}

function getPlanMetadata(plan: string | null | undefined): PublicBillingPlanMetadata | null {
  if (!plan) {
    return null;
  }

  const normalizedPlan = plan.toUpperCase();
  if (!Object.prototype.hasOwnProperty.call(PUBLIC_BILLING_PLAN_METADATA, normalizedPlan)) {
    return null;
  }

  return PUBLIC_BILLING_PLAN_METADATA[normalizedPlan as BillingPlan];
}

export function isPublicBillingPlan(plan: string | null | undefined): plan is BillingPlan {
  return getPlanMetadata(plan) !== null;
}

export function getDefaultPublicBillingPlanKey(): BillingPlan {
  return DEFAULT_PUBLIC_BILLING_PLAN;
}

function getLocalizedPlanFeatures(
  plan: BillingPlan,
  t: BillingTranslator
): string[] {
  const planKey = getPlanTranslationKey(plan);

  return [
    t(`plans.${planKey}.features.feature1`),
    t(`plans.${planKey}.features.feature2`),
    t(`plans.${planKey}.features.feature3`),
    t(`plans.${planKey}.features.feature4`),
  ];
}

export function getBillingEntitlementNote(t: BillingTranslator): string {
  return t('note');
}

export function getPlanAwareBillingEntitlementNote(
  plan: string | null | undefined,
  t: BillingTranslator
): string {
  if (!plan) {
    return getBillingEntitlementNote(t);
  }

  return getBillingEntitlementNoteForPlan(plan, t);
}

export function getLocalizedPublicBillingPlans(t: BillingTranslator): PublicBillingPlan[] {
  return BILLING_PLANS.map((planKey) => {
    const metadata = PUBLIC_BILLING_PLAN_METADATA[planKey];
    const translationKey = getPlanTranslationKey(planKey);

    return {
      ...metadata,
      title: t(`plans.${translationKey}.title`),
      description: t(`plans.${translationKey}.description`),
      bestFor: t(`plans.${translationKey}.bestFor`),
      features: getLocalizedPlanFeatures(planKey, t),
    };
  });
}

export function getLocalizedPublicBillingPlan(
  plan: string | null | undefined,
  t: BillingTranslator
): PublicBillingPlan | null {
  const metadata = getPlanMetadata(plan);
  if (!metadata) {
    return null;
  }

  const translationKey = getPlanTranslationKey(metadata.key);

  return {
    ...metadata,
    title: t(`plans.${translationKey}.title`),
    description: t(`plans.${translationKey}.description`),
    bestFor: t(`plans.${translationKey}.bestFor`),
    features: getLocalizedPlanFeatures(metadata.key, t),
  };
}

export function getLocalizedBillingPlanTitle(
  plan: string | null | undefined,
  t: BillingTranslator
): string {
  return getLocalizedPublicBillingPlan(plan, t)?.title ?? t('freeTrial');
}

export function getLocalizedBillingStatusLabel(
  status: string | null | undefined,
  t: BillingTranslator
): string {
  if (!status || status === 'INACTIVE') {
    return t('status.notSubscribed');
  }

  const normalizedStatus = status.toUpperCase();
  if (normalizedStatus === 'ACTIVE') return t('status.active');
  if (normalizedStatus === 'TRIALING') return t('status.trialing');
  if (normalizedStatus === 'PAST_DUE') return t('status.pastDue');
  if (normalizedStatus === 'CANCELED' || normalizedStatus === 'CANCELLED') return t('status.canceled');

  return status;
}

export function formatBillingPlanPrice(monthlyPriceUsd: number): string {
  return formatMoney(monthlyPriceUsd, 'USD', { maximumFractionDigits: 0 });
}

/* Inlined plan pricing — avoids importing payment/pricing.ts which reads env vars */
const PLAN_TOMAN_MONTHLY: Record<BillingPlan, number> = {
  STARTER: 690_000,
  GROWTH: 2_490_000,
  PRO: 5_990_000,
};

export function formatPublicBillingPlanPrice(plan: BillingPlan, locale: string): string {
  if (locale === 'fa') {
    return formatMoney(PLAN_TOMAN_MONTHLY[plan] * 10, 'IRR', {
      locale: 'fa-IR',
      defaultDisplayUnit: 'TOMAN',
      maximumFractionDigits: 0,
    });
  }

  const metadata = PUBLIC_BILLING_PLAN_METADATA[plan];
  return formatBillingPlanPrice(metadata.monthlyPriceUsd);
}

export function formatDiscountedPublicBillingPlanPrice(
  plan: BillingPlan,
  locale: string,
  discountPercentage: number
): string {
  const normalizedDiscount = Math.min(Math.max(discountPercentage, 0), 100);
  const discountMultiplier = 1 - normalizedDiscount / 100;

  if (locale === 'fa') {
    return formatMoney(PLAN_TOMAN_MONTHLY[plan] * discountMultiplier * 10, 'IRR', {
      locale: 'fa-IR',
      defaultDisplayUnit: 'TOMAN',
      maximumFractionDigits: 0,
    });
  }

  const metadata = PUBLIC_BILLING_PLAN_METADATA[plan];
  return formatBillingPlanPrice(metadata.monthlyPriceUsd * discountMultiplier);
}
