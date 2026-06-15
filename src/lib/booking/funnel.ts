/**
 * Booking funnel model — pure, data-driven, no I/O. The UI (routed steps) reads
 * this to know the booking types and the step order, so changing the funnel is a
 * data edit here, not branching code spread through components. Tested in
 * funnel.test.ts.
 */

/** The booking types the clinic offers. Rehab-only is chosen on the Visit step, so
    there is no standalone "rehab consultation" type. */
export type BookingType = 'standard' | 'epc' | 'tpc' | 'ndis';

/** Where the appointment is funded from — drives the later funding/quote section. */
export type Funding = 'private' | 'medicare' | 'ndis' | 'compensable';

export interface BookingTypeInfo {
  id: BookingType;
  label: string;
  /** One-line factual description (COMPLIANCE.md: no outcome claims). */
  blurb: string;
  funding: Funding;
}

export const BOOKING_TYPES: readonly BookingTypeInfo[] = [
  {
    id: 'standard',
    label: 'Standard consultation',
    blurb: 'Treatment and/or rehabilitation with your chiropractor.',
    funding: 'private',
  },
  {
    id: 'epc',
    label: 'EPC (Medicare care plan)',
    blurb: 'Care under a Medicare Chronic Disease Management (EPC) plan, referred by a GP.',
    funding: 'medicare',
  },
  {
    id: 'tpc',
    // TPC = Third Party Compensation / compensable (workers comp, CTP motor accident).
    // Determined from context; confirm the exact wording with the client.
    label: 'Third party / compensable',
    blurb: 'Care funded by a third party such as workers compensation or a motor accident insurer.',
    funding: 'compensable',
  },
  {
    id: 'ndis',
    label: 'NDIS',
    blurb: 'Care funded under an NDIS plan.',
    funding: 'ndis',
  },
];

export const bookingTypeInfo = (id: BookingType): BookingTypeInfo | undefined =>
  BOOKING_TYPES.find((t) => t.id === id);

export type CustomerKind = 'new' | 'existing';

/**
 * Ordered funnel steps.
 *  - customer: new or existing patient (skipped when signed in)
 *  - type:     standard / EPC / TPC / NDIS
 *  - scope:    "Visit" — areas + treatment/rehab -> appointment length (duration.ts),
 *              with the optional private-health-cover section folded in as an
 *              accordion (shown when bookingConfig.fundingEnabled)
 *  - time:     date + slot
 *  - details:  contact details
 *  - confirm:  request received
 * Future: a `payment` step (HALTH card on file) after `details` when that lands.
 */
export type FunnelStep = 'customer' | 'type' | 'scope' | 'time' | 'details' | 'confirm';

export const FUNNEL_ORDER: readonly FunnelStep[] = ['customer', 'type', 'scope', 'time', 'details', 'confirm'];

export interface FunnelOptions {
  /** Signed-in customers are known to be existing, so the customer step is skipped. */
  signedIn?: boolean;
}

/** The active step order for the given options. */
export function funnelOrder(opts: FunnelOptions = {}): FunnelStep[] {
  return FUNNEL_ORDER.filter((s) => !(s === 'customer' && opts.signedIn));
}

export const firstStep = (opts: FunnelOptions = {}): FunnelStep => funnelOrder(opts)[0]!;

export function nextStep(current: FunnelStep, opts: FunnelOptions = {}): FunnelStep | null {
  const order = funnelOrder(opts);
  const i = order.indexOf(current);
  return i >= 0 && i < order.length - 1 ? order[i + 1]! : null;
}

export function prevStep(current: FunnelStep, opts: FunnelOptions = {}): FunnelStep | null {
  const order = funnelOrder(opts);
  const i = order.indexOf(current);
  return i > 0 ? order[i - 1]! : null;
}
