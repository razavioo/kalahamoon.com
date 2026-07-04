import { type BillingPlan } from './billing-entitlements';
import { getDefaultPublicBillingPlanKey } from './billing-plans';

export function buildPublicSignupHref(locale: string, plan?: BillingPlan): string {
  const selectedPlan = plan ?? getDefaultPublicBillingPlanKey();
  const params = new URLSearchParams({ plan: selectedPlan });
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';

  return `${baseUrl}/${locale}/signup?${params.toString()}`;
}
