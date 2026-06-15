/**
 * Appointment-length estimator (minutes). Pure, so it is trivial to test and to
 * change. Tested in duration.test.ts, which is the spec.
 *
 * Base table for an EXISTING patient, by number of areas x what they want:
 *   areas | treatment+rehab | treatment only | rehab only
 *     1   |       30        |      30        |     30
 *     2   |       45        |      30        |     45
 *     3   |       60        |      60        |     60
 *
 * "Extended" applies to NEW patients (always) and to EXISTING patients who tick
 * "more than 3 months since last visit":
 *   - any base under 60 -> +15 minutes
 *   - a base of 60 stays 60 but becomes an open-ended MINIMUM ("minimum 60 minutes")
 * A new patient is exactly an existing patient in the extended case, so the
 * ">3 months" control is not shown to new patients.
 */

export interface DurationInput {
  /** Number of distinct areas / injury sites (1, 2 or 3). */
  areas: number;
  /** What the visit should include. */
  wants: { treatment: boolean; rehab: boolean };
  /** First-ever visit. New patients are always treated as "extended". */
  isNewPatient: boolean;
  /** Existing patient ticked "more than 3 months since last visit". Ignored for new patients. */
  lapsed?: boolean;
}

export interface DurationEstimate {
  /** Minutes. For a minimum this is the floor (e.g. 60 for "minimum 60 minutes"). */
  minutes: number;
  /** True when the length is an open-ended minimum rather than a fixed booking. */
  isMinimum: boolean;
}

/** Base minutes for an existing, non-lapsed patient. */
function baseMinutes(areas: number, wants: { treatment: boolean; rehab: boolean }): number {
  if (areas <= 1) return 30;
  if (areas >= 3) return 60;
  // 2 areas: treatment-only is 30; everything else (both, rehab-only) is 45.
  return wants.treatment && !wants.rehab ? 30 : 45;
}

export function estimateDuration(input: DurationInput): DurationEstimate {
  const base = baseMinutes(input.areas, input.wants);
  const extended = input.isNewPatient || input.lapsed === true;
  if (!extended) return { minutes: base, isMinimum: false };
  if (base >= 60) return { minutes: 60, isMinimum: true };
  return { minutes: base + 15, isMinimum: false };
}

/** URL token for a chosen length: "45", or "60+" for an open-ended minimum. */
export function durationToken(estimate: DurationEstimate): string {
  return estimate.isMinimum ? `${estimate.minutes}+` : String(estimate.minutes);
}

/** Parse a `dur` token ("45" / "60+") back to an estimate. Missing/blank -> null. */
export function parseDurationToken(token: string | undefined): DurationEstimate | null {
  if (!token) return null;
  const minutes = parseInt(token, 10);
  if (!Number.isFinite(minutes)) return null;
  return { minutes, isMinimum: token.endsWith('+') };
}

/** Human label, e.g. "45 minutes" or "minimum 60 minutes". */
export function formatDuration(estimate: DurationEstimate): string {
  return estimate.isMinimum ? `minimum ${estimate.minutes} minutes` : `${estimate.minutes} minutes`;
}
