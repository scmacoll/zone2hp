import type { BookingProvider } from './types';
import { mockBookingProvider } from './mock';

/**
 * Select the active booking provider (build/server context).
 *
 * Only the mock is wired in this static, no-backend phase. ./cliniko.ts is a
 * reserved stub and is deliberately NOT imported here, which keeps it (and later,
 * its secrets) out of the client bundle.
 *
 * When a real backend lands, ./client.ts switches to `fetch('/api/booking/...')`,
 * the server endpoints import the real provider, and provider selection moves
 * server-side. Client code must never import this module directly — it only ever
 * talks to ./client.ts.
 */
export function getBookingProvider(): BookingProvider {
  return mockBookingProvider;
}
