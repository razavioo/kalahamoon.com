import { type BillingPlan } from './billing-entitlements';
import { getDefaultPublicBillingPlanKey } from './billing-plans';

export function buildPublicSignupHref(locale: string, plan?: BillingPlan): string {
  const selectedPlan = plan ?? getDefaultPublicBillingPlanKey();
  const params = new URLSearchParams({ plan: selectedPlan });
  const baseUrl = process.env.NEXT_PUBLIC_RUNTIME_APP_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://app.kalahamoon.com';

  return `${baseUrl}/${locale}/signup?${params.toString()}`;
}
