import type { BookingProvider } from './types';

/**
 * Cliniko provider — STUB, reserved seam. Not implemented and deliberately NOT
 * imported anywhere yet, so nothing from this file reaches the client bundle.
 *
 * When it is implemented it is SERVER-ONLY: it needs a server runtime to hold the
 * secret CLINIKO_API_KEY (HTTP Basic auth, broad access to patient data) and the
 * practice's region shard. It must only ever be imported by server endpoints,
 * never by client code — the browser only ever talks to ./client.ts.
 *
 * Endpoint mapping for the future implementation:
 *   listServices      → GET  /appointment_types
 *   listPractitioners → GET  /practitioners        (filter by appointment type)
 *   listAvailability  → GET  /available_times       (business, appt type, practitioner, from/to)
 *   createBooking     → find or POST /patients, then POST /bookings
 *
 * Base URL is shard-specific, e.g. https://api.au4.cliniko.com/v1
 * Auth header: `Authorization: Basic base64(CLINIKO_API_KEY + ":")`
 * Reference: https://github.com/redguava/cliniko-api
 */

const notConfigured = (): never => {
  throw new Error('Cliniko provider not configured (server-only, not yet implemented).');
};

export const clinikoBookingProvider: BookingProvider = {
  mode: 'api',
  listServices: notConfigured,
  listPractitioners: notConfigured,
  listAvailability: notConfigured,
  createBooking: notConfigured,
};
