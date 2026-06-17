import type {
  AvailabilityQuery,
  AvailabilitySlot,
  BookingProvider,
  BookingRequest,
  PatientQuery,
  PatientRecord,
  Practitioner,
  Service,
} from './types';
import { normalizeEmail, normalizeName } from './patients';

/**
 * Mock booking provider — a plain object of pure-ish async functions (no class).
 * Realistic, COMPLIANCE-clean data with simulated latency so the UI exercises its
 * loading states. Holds NO secrets, so it is safe in the client bundle.
 *
 * The services and the practitioner below mirror the client's real data so the
 * review build reads true. When the real provider (e.g. Cliniko) is connected,
 * this data comes from the API instead and this file is no longer used.
 */

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Real appointment types. 45 min each except the follow-up (30 min). */
const SERVICES: Service[] = [
  {
    id: 'chiro-followup',
    name: 'CHIRO Follow-Up Appointment',
    durationMinutes: 30,
    description:
      'Follow-up appointment involving subjective history taking, assessment, treatment and exercise review/prescription.',
  },
  {
    id: 'chiro-initial',
    name: 'CHIRO Initial Appointment',
    durationMinutes: 45,
    description:
      'Initial appointment involving subjective history taking, assessment, treatment and exercise prescription.',
  },
  {
    id: 'chiro-initial-return',
    name: 'CHIRO Initial Return Appointment',
    durationMinutes: 45,
    description:
      'Initial appointment for those who have been with us before, but are experiencing a new injury or issue. Involves subjective history taking, assessment, treatment and exercise prescription.',
  },
  {
    id: 'epc-chiro-initial',
    name: 'EPC - CHIRO Initial Appointment',
    durationMinutes: 45,
    description:
      'Initial appointment for chiropractic care under the Enhanced Primary Care (EPC) Program, referred by a doctor.',
  },
];

/**
 * One practitioner for now. The "Dr" honorific is always rendered with the title
 * (COMPLIANCE.md rule 6). Bio is factual, no outcome claims. The photo path is a
 * placeholder; drop the real image at that path and it appears (the card falls
 * back to initials until then).
 */
const PRACTITIONERS: Practitioner[] = [
  {
    id: 'mintae-kim',
    honorific: 'Dr',
    name: 'Mintae Kim',
    title: 'Chiropractor',
    qualifications: 'B. Chiro. Sci., M. Chiro.',
    bio: 'Mintae holds a Bachelor and Master of Chiropractic from Macquarie University, with nearly a decade of experience. He works in sports chiropractic and rehabilitation with a movement-based approach, using techniques including dry needling, soft tissue release and neuro-functional rehab. He is an avid multi-sport athlete.',
    photo: '/images/practitioners/mintae-kim.png',
  },
];

/**
 * Mock existing-patient records. The real provider replaces this with a patient
 * search. For the review build there is a single demo credential: the EXACT name
 * and email must both match (Jane Doe / janedoe@gmail.com) to proceed as an
 * existing patient; anything else shows the no-match panel.
 */
const EXISTING_PATIENTS: PatientRecord[] = [
  { id: 'pat-jane', firstName: 'Jane', lastName: 'Doe', email: 'janedoe@gmail.com' },
];

function startOfTomorrow(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * Slots across clinic hours, with a stable per-practitioner pattern so the same
 * session shows the same times. Mon-Fri 9am-6pm, Saturday 9am-12pm, Sunday
 * closed, across a 4-week window. The pattern only decides which slots are open;
 * the UI never derives scarcity messaging from it (COMPLIANCE.md rule 4).
 */
function generateSlots(practitionerId: string): AvailabilitySlot[] {
  const slots: AvailabilitySlot[] = [];
  const seed = practitionerId.charCodeAt(1) || 1;
  const first = startOfTomorrow();
  let openDay = -1;
  for (let dayOffset = 0; dayOffset < 28; dayOffset++) {
    const date = new Date(first);
    date.setDate(first.getDate() + dayOffset);
    const weekday = date.getDay();
    if (weekday === 0) continue; // Sunday closed
    openDay++;
    // Leave the 2nd open day fully booked (no slots) — a deterministic example of
    // a "fully booked" day, always within the first visible week of the date strip.
    if (openDay === 1) continue;
    const lastHour = weekday === 6 ? 11 : 18; // Saturday mornings only (9am-12pm)
    for (let hour = 9; hour <= lastHour; hour++) {
      if ((hour + dayOffset + seed) % 3 === 0) continue; // some slots already taken
      const slot = new Date(date);
      slot.setHours(hour, 0, 0, 0);
      slots.push({ startIso: slot.toISOString(), practitionerId });
    }
  }
  return slots;
}

function makeReference(): string {
  const n = Math.floor(Math.random() * 9000) + 1000;
  return `Z2-${n}`;
}

export const mockBookingProvider: BookingProvider = {
  mode: 'api',

  async listServices() {
    await sleep(350);
    return SERVICES;
  },

  async listPractitioners() {
    await sleep(250);
    return PRACTITIONERS;
  },

  async listAvailability(query: AvailabilityQuery) {
    await sleep(450);
    const ids = query.practitionerId ? [query.practitionerId] : PRACTITIONERS.map((p) => p.id);
    return ids.flatMap(generateSlots).sort((a, b) => a.startIso.localeCompare(b.startIso));
  },

  async createBooking(request: BookingRequest) {
    await sleep(500);
    if (!request.contact.email) {
      throw new Error('A contact email is required.');
    }
    return { reference: makeReference(), status: 'pending' };
  },

  async findPatient(query: PatientQuery) {
    await sleep(300);
    // Demo build: only the exact credential proceeds — the name AND the email
    // must both match. A real provider would do a proper patient search here.
    return (
      EXISTING_PATIENTS.find(
        (p) =>
          !!query.name &&
          normalizeName(query.name) === normalizeName(`${p.firstName} ${p.lastName}`) &&
          !!query.email &&
          !!p.email &&
          normalizeEmail(query.email) === normalizeEmail(p.email),
      ) ?? null
    );
  },

  async getPatient(id: string) {
    await sleep(200);
    return EXISTING_PATIENTS.find((p) => p.id === id) ?? null;
  },
};
