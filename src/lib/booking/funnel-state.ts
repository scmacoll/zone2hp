import type { BookingType, CustomerKind, FunnelStep } from './funnel';
import { FUNNEL_ORDER } from './funnel';

/**
 * Funnel state carried between routed steps via the URL query string. Only
 * NON-SENSITIVE values live here — never name/email/phone/notes (those are entered
 * on the details step and submitted there, not put in a URL). Pure + tested in
 * funnel-state.test.ts.
 */
export interface BookingParams {
  customer?: CustomerKind;
  /** Opaque existing-patient id from the step-1 match. Non-PII (resolved to details
      by the provider), so it is safe in the URL like `ref`. */
  pid?: string;
  type?: BookingType;
  /** Appointment length token (decided on the scope step): "45" or "60+" (minimum). */
  dur?: string;
  /** Chosen health fund id (decided in the funding section of the scope step). */
  fund?: string;
  /** Chosen slot, ISO 8601. */
  slot?: string;
  /** Booking reference, set on the confirmation step. */
  ref?: string;
}

const STEP_PATHS: Record<FunnelStep, string> = {
  customer: '/book',
  type: '/book/type',
  scope: '/book/scope',
  time: '/book/time',
  details: '/book/details',
  confirm: '/book/confirm',
};

/** Which step decides each param (used to drop downstream params when jumping back). */
const PARAM_STEP: Record<keyof BookingParams, FunnelStep> = {
  customer: 'customer',
  pid: 'customer',
  type: 'type',
  dur: 'scope',
  fund: 'scope',
  slot: 'time',
  ref: 'details',
};

const CUSTOMER_KINDS: readonly CustomerKind[] = ['new', 'existing'];

export const stepPath = (step: FunnelStep): string => STEP_PATHS[step];

/** Read + validate the funnel params from a URL query string. Unknown values are dropped. */
export function parseBookingParams(search: URLSearchParams): BookingParams {
  const params: BookingParams = {};
  const customer = search.get('customer');
  if (customer && (CUSTOMER_KINDS as readonly string[]).includes(customer)) {
    params.customer = customer as CustomerKind;
  }
  const pid = search.get('pid');
  if (pid) params.pid = pid;
  const type = search.get('type');
  if (type) params.type = type as BookingType;
  const dur = search.get('dur');
  if (dur) params.dur = dur;
  const fund = search.get('fund');
  if (fund) params.fund = fund;
  const slot = search.get('slot');
  if (slot) params.slot = slot;
  const ref = search.get('ref');
  if (ref) params.ref = ref;
  return params;
}

/**
 * Build the URL for a step, carrying only the params decided BEFORE it. Linking
 * back to an earlier step therefore drops the choices made at/after it (so the
 * user re-decides) — which is exactly what a summary "Change" link should do.
 */
export function buildStepUrl(step: FunnelStep, params: BookingParams): string {
  const targetIndex = FUNNEL_ORDER.indexOf(step);
  const query = new URLSearchParams();
  (Object.keys(PARAM_STEP) as (keyof BookingParams)[]).forEach((key) => {
    const value = params[key];
    if (value == null || value === '') return;
    if (FUNNEL_ORDER.indexOf(PARAM_STEP[key]) < targetIndex) query.set(key, value);
  });
  const qs = query.toString();
  return qs ? `${stepPath(step)}?${qs}` : stepPath(step);
}
