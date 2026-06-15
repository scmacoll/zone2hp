/**
 * Private-health-funding model for the funding step — a PROTOTYPE of the HALTH
 * "view your funding" experience (rebate + estimated gap) in our own UI.
 *
 * ⚠️ PROVISIONAL numbers. Prices and the rebate model are stand-ins so the client
 * can see the flow; the real values come from HALTH's API (api.halth.com) once
 * access is confirmed — estimateFunding() is the seam that call replaces. Pure +
 * tested in funding.test.ts.
 */

export interface HealthFund {
  id: string;
  name: string;
}

export const HEALTH_FUNDS: readonly HealthFund[] = [
  { id: 'bupa', name: 'Bupa' },
  { id: 'medibank', name: 'Medibank' },
  { id: 'hcf', name: 'HCF' },
  { id: 'nib', name: 'nib' },
  { id: 'ahm', name: 'ahm' },
  { id: 'frank', name: 'Frank' },
  { id: 'australian-unity', name: 'Australian Unity' },
  { id: 'gmhba', name: 'GMHBA' },
  { id: 'hbf', name: 'HBF' },
  { id: 'other', name: 'Other fund' },
];

export const fundName = (id: string): string => HEALTH_FUNDS.find((f) => f.id === id)?.name ?? '';

/** PROVISIONAL appointment prices by length (minutes), in cents. */
const PRICES: Record<number, number> = { 30: 9000, 45: 13000, 60: 18000 };

export function priceForDuration(durationMinutes: number): number {
  return PRICES[durationMinutes] ?? PRICES[30]!;
}

export interface FundingEstimate {
  priceCents: number;
  rebateCents: number;
  gapCents: number;
}

/**
 * PROVISIONAL rebate model: a flat share of the price, capped — a stand-in for a
 * real per-fund, per-item-number rebate. No fund (paying privately) → full gap.
 */
export function estimateFunding(input: { fundId: string | null; priceCents: number }): FundingEstimate {
  const { fundId, priceCents } = input;
  if (!fundId) return { priceCents, rebateCents: 0, gapCents: priceCents };
  const rebateCents = Math.min(Math.round(priceCents * 0.55), 8000); // provisional cap $80
  return { priceCents, rebateCents, gapCents: priceCents - rebateCents };
}

export function formatAud(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

/**
 * The private-cover detail fields. HALTH's "view your funding" uses the fund plus
 * a member number, with an optional card issue number and reference number.
 */
export interface FundingFields {
  fundId: string | null;
  memberNumber: string;
  cardIssueNumber: string;
  referenceNumber: string;
}

/** True once the user has typed any member-card detail (picking a fund alone does not count). */
export function fundingEngaged(f: FundingFields): boolean {
  return [f.memberNumber, f.cardIssueNumber, f.referenceNumber].some((v) => v.trim() !== '');
}

/** Enough to produce an estimate: a fund and a member number (card/reference are optional). */
export function fundingComplete(f: FundingFields): boolean {
  return !!f.fundId && f.memberNumber.trim() !== '';
}

/**
 * Continue is allowed when cover is left empty (skipped) OR completed enough to
 * estimate. It is blocked only in between — some card detail entered but not a
 * full, estimable set. Complete-or-empty, never a half-filled estimate.
 */
export function canContinueFunding(f: FundingFields): boolean {
  return !fundingEngaged(f) || fundingComplete(f);
}
