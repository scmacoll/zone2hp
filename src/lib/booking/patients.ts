import type { PatientQuery } from './types';

/**
 * Pure patient-matching helpers (no I/O), used to flag a follow-up booked by
 * someone with no matching record. Normalised so typos in case/spacing/phone
 * formatting do not cause false misses. Tested in patients.test.ts.
 */

export const normalizeEmail = (s: string): string => s.trim().toLowerCase();

export const normalizeName = (s: string): string => s.trim().toLowerCase().replace(/\s+/g, ' ');

/** Strip non-digits; treat a leading +61 the same as a leading 0. */
export function normalizePhone(s: string): string {
  const digits = s.replace(/\D/g, '');
  return digits.startsWith('61') ? '0' + digits.slice(2) : digits;
}

/** True if the query matches the record on any one of name / email / phone. */
export function matchesPatient(query: PatientQuery, record: PatientQuery): boolean {
  if (query.email && record.email && normalizeEmail(query.email) === normalizeEmail(record.email)) return true;
  if (query.phone && record.phone && normalizePhone(query.phone) === normalizePhone(record.phone)) return true;
  if (query.name && record.name && normalizeName(query.name) === normalizeName(record.name)) return true;
  return false;
}

/** The first record the query matches, or null. Records may carry extra fields (e.g. an id). */
export function findMatchingPatient<T extends PatientQuery>(query: PatientQuery, records: readonly T[]): T | null {
  return records.find((record) => matchesPatient(query, record)) ?? null;
}

/**
 * Turn the booking step's single "email or phone" entry into the right query
 * field: anything containing "@" is treated as an email, otherwise a phone.
 */
export function emailOrPhone(value: string): PatientQuery {
  const v = value.trim();
  if (!v) return {};
  return v.includes('@') ? { email: v } : { phone: v };
}

/** A plausibly valid email address (same shape the details form accepts). */
export const isEmail = (s: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

/** A valid Australian mobile number: 04xxxxxxxx (a leading +61 4 is normalised to 0). */
export const isAuMobile = (s: string): boolean => /^04\d{8}$/.test(normalizePhone(s));

/**
 * Validate the combined "email or mobile" field: a value with "@" must be a valid
 * email, otherwise it must be a valid AU mobile number.
 */
export function isEmailOrMobile(value: string): boolean {
  const v = value.trim();
  if (!v) return false;
  return v.includes('@') ? isEmail(v) : isAuMobile(v);
}
