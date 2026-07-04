/**
 * Minimal billing entitlements extract for the static public site.
 * Only the plan constants and type — no API/DB dependencies.
 */
export const BILLING_PLANS = ['STARTER', 'GROWTH', 'PRO'] as const;
export type BillingPlan = (typeof BILLING_PLANS)[number];

/**
 * Stub for getBillingEntitlementNoteForPlan — not used on the public site
 * but imported transitively by billing-plans.ts.
 */
export function getBillingEntitlementNoteForPlan(
  _plan: string,
  t: (key: string, values?: Record<string, string | number>) => string
): string {
  return t('note');
}
