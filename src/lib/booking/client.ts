import type {
  AvailabilityQuery,
  AvailabilitySlot,
  BookingRequest,
  BookingRequestResult,
  PatientQuery,
  PatientRecord,
  Practitioner,
  Service,
} from './types';
import { getBookingProvider } from './index';

/**
 * THE SEAM.
 *
 * The booking island imports ONLY this module — never ./mock, ./index or
 * ./cliniko directly. Today each function calls the in-bundle mock provider. When
 * a real backend lands, swap each body to `fetch('/api/booking/...')` and nothing
 * in the island changes (it already awaits and renders loading/error states).
 * Because these are the only data calls the browser makes for booking, this file
 * is the entire static→SSR migration surface.
 */

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Dev-only state simulation. Append `?sim=empty | error | slow` to /book to force
 * the empty, error or slow states for review. No-op in production builds
 * (import.meta.env.DEV is false) and when there is no window (build time).
 */
function devSim(): string | null {
  if (!import.meta.env.DEV || typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('sim');
}

export async function fetchServices(): Promise<Service[]> {
  return getBookingProvider().listServices();
}

export async function fetchPractitioners(serviceId?: string): Promise<Practitioner[]> {
  return getBookingProvider().listPractitioners(serviceId);
}

export async function fetchAvailability(query: AvailabilityQuery): Promise<AvailabilitySlot[]> {
  const sim = devSim();
  if (sim === 'error') {
    await delay(400);
    throw new Error('Simulated availability error.');
  }
  if (sim === 'slow') await delay(2500);
  const slots = await getBookingProvider().listAvailability(query);
  return sim === 'empty' ? [] : slots;
}

export async function submitBookingRequest(request: BookingRequest): Promise<BookingRequestResult> {
  if (devSim() === 'error') {
    await delay(400);
    throw new Error('Simulated submission error.');
  }
  return getBookingProvider().createBooking(request);
}

/**
 * Find an existing patient by email or phone at the first step. Returns null when
 * there is no match (or the provider cannot search). Append `?sim=nomatch` in dev
 * to force a no-match for review.
 */
export async function findPatient(query: PatientQuery): Promise<PatientRecord | null> {
  if (devSim() === 'nomatch') {
    await delay(300);
    return null;
  }
  const provider = getBookingProvider();
  return provider.findPatient ? provider.findPatient(query) : null;
}

/** Resolve a matched patient's details by id, to pre-fill the locked Details step. */
export async function getPatient(id: string): Promise<PatientRecord | null> {
  const provider = getBookingProvider();
  return provider.getPatient ? provider.getPatient(id) : null;
}
