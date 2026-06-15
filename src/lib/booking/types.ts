/**
 * Booking domain types — provider-agnostic.
 *
 * These describe what ANY practice-management system (Cliniko, Nookal, Halaxy, …)
 * can realistically return, so the UI codes against this shape and never against a
 * single provider. Keep it pessimistic: only fields a real provider response can
 * actually supply. There are deliberately NO clinical or health fields here — this
 * surface handles scheduling and contact details only (see BOOKING.md).
 */

import type { BookingType, CustomerKind } from './funnel';

/** A bookable appointment type, e.g. "Initial consultation". */
export interface Service {
  id: string;
  name: string;
  durationMinutes: number;
  /** Optional plain, factual description. No outcome claims (COMPLIANCE.md). */
  description?: string;
}

/** A practitioner the patient can book with. */
export interface Practitioner {
  id: string;
  name: string;
  /**
   * Professional title, e.g. "Chiropractor" or "Exercise Physiologist". Required
   * so the UI can always render the profession.
   */
  title: string;
  /**
   * Optional honorific, e.g. "Dr". The UI always renders it together with the
   * title ("Dr Mintae Kim, Chiropractor") so "Dr" is never shown without the
   * profession beside it (COMPLIANCE.md rule 6).
   */
  honorific?: string;
  /** Optional post-nominal qualifications, e.g. "B. Chiro. Sci., M. Chiro.". */
  qualifications?: string;
  /** Optional short, factual bio (no outcome claims). */
  bio?: string;
  /** Optional profile photo URL (e.g. /images/practitioners/mintae-kim.jpg). */
  photo?: string;
}

/** A single available appointment start. */
export interface AvailabilitySlot {
  /** ISO 8601 start time. */
  startIso: string;
  practitionerId: string;
}

/** Query for availability. Omit practitionerId for "no preference". */
export interface AvailabilityQuery {
  serviceId?: string;
  practitionerId?: string;
}

/** The contact details captured on the booking form. Non-clinical only. */
export interface BookingContact {
  name: string;
  email: string;
  phone?: string;
  /** Explicit, opt-in marketing consent. Unticked by default in the UI. */
  marketingOptIn: boolean;
}

/** A request to book a slot. */
export interface BookingRequest {
  /** Funnel booking type (standard / rehab / EPC / TPC / NDIS). */
  bookingType?: BookingType;
  /** Whether the patient said they are new or existing. */
  customerKind?: CustomerKind;
  /** Resolved PMS appointment type, set later when booking type + scope map to one. */
  serviceId?: string;
  practitionerId?: string;
  slotStartIso: string;
  contact: BookingContact;
  /** Optional free-text note. For logistics/access needs, not clinical history.
      Maps to the PMS appointment note when integrated. */
  notes?: string;
}

/**
 * The result of submitting a request. It is a REQUEST, not a confirmed booking:
 * the clinic confirms. Status stays 'pending' so the UI never implies a
 * guaranteed slot.
 */
export interface BookingRequestResult {
  reference: string;
  status: 'pending';
}

/**
 * A booking provider is a plain object of functions (not a class). Each real
 * provider, or the mock, supplies one of these.
 *
 *  - mode 'embedded' → the provider hosts the booking flow; we render its page
 *                      (getEmbedUrl) and do not call the list/create methods.
 *  - mode 'api'      → we drive our own UI; we call the list*/createBooking methods.
 */
export interface BookingProvider {
  mode: 'embedded' | 'api';
  /** For embedded mode: the URL of the provider's hosted booking page. */
  getEmbedUrl?: () => string | null;
  listServices: () => Promise<Service[]>;
  listPractitioners: (serviceId?: string) => Promise<Practitioner[]>;
  listAvailability: (query: AvailabilityQuery) => Promise<AvailabilitySlot[]>;
  createBooking: (request: BookingRequest) => Promise<BookingRequestResult>;
  /** Optional: find an existing patient at the first step by email or phone, so
      their details can be pre-filled later. Returns null when there is no match. */
  findPatient?: (query: PatientQuery) => Promise<PatientRecord | null>;
  /** Optional: resolve a matched patient's details by id (for the locked Details
      pre-fill). A real backend MUST authorise this; the mock just returns the row. */
  getPatient?: (id: string) => Promise<PatientRecord | null>;
}

/** Lookup for an existing patient. Any single field matching is enough. */
export interface PatientQuery {
  name?: string;
  email?: string;
  phone?: string;
}

/** A matched existing patient. The id is an opaque, non-PII reference. */
export interface PatientRecord {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
}
