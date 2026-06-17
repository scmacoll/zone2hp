import { describe, it, expect } from 'vitest';
import type { PatientQuery } from './types';
import {
  normalizeEmail,
  normalizeName,
  normalizePhone,
  matchesPatient,
  findMatchingPatient,
  emailOrPhone,
  isEmail,
  isAuMobile,
  isEmailOrMobile,
} from './patients';

describe('normalizeEmail', () => {
  it('trims and lowercases', () => {
    expect(normalizeEmail('  Alex@Example.com ')).toBe('alex@example.com');
  });
});

describe('normalizeName', () => {
  it('trims, lowercases and collapses internal spaces', () => {
    expect(normalizeName('  Alex   Taylor ')).toBe('alex taylor');
  });
});

describe('normalizePhone', () => {
  it('strips spaces and punctuation', () => {
    expect(normalizePhone('0412 345 678')).toBe('0412345678');
  });
  it('treats +61 the same as a leading 0', () => {
    expect(normalizePhone('+61 412 345 678')).toBe('0412345678');
  });
});

describe('matchesPatient', () => {
  const record: PatientQuery = { name: 'Alex Taylor', email: 'alex@example.com', phone: '0412 345 678' };

  it('matches on email regardless of case and spacing', () => {
    expect(matchesPatient({ email: ' ALEX@example.com ' }, record)).toBe(true);
  });
  it('matches on phone across +61 / 0 formats', () => {
    expect(matchesPatient({ phone: '+61412345678' }, record)).toBe(true);
  });
  it('matches on name alone', () => {
    expect(matchesPatient({ name: 'alex taylor' }, record)).toBe(true);
  });
  it('does not match when nothing lines up', () => {
    expect(matchesPatient({ email: 'someone@else.com', phone: '0400000000' }, record)).toBe(false);
  });
  it('ignores empty query fields', () => {
    expect(matchesPatient({ email: '', name: '' }, record)).toBe(false);
  });
});

describe('findMatchingPatient', () => {
  const records = [
    { id: 'p1', email: 'a@x.com' },
    { id: 'p2', phone: '0400 000 000' },
  ];
  it('returns the matched record (with its id) when any record matches', () => {
    expect(findMatchingPatient({ phone: '0400000000' }, records)?.id).toBe('p2');
  });
  it('returns null if none match', () => {
    expect(findMatchingPatient({ email: 'no-one@here.com' }, records)).toBeNull();
  });
});

describe('emailOrPhone', () => {
  it('routes an "@" value to email and anything else to phone', () => {
    expect(emailOrPhone('  Alex@Example.com ')).toEqual({ email: 'Alex@Example.com' });
    expect(emailOrPhone('0412 345 678')).toEqual({ phone: '0412 345 678' });
  });
  it('returns an empty query for blank input', () => {
    expect(emailOrPhone('   ')).toEqual({});
  });
});

describe('isEmailOrMobile', () => {
  it('accepts a valid email', () => {
    expect(isEmail('janedoe@gmail.com')).toBe(true);
    expect(isEmailOrMobile('janedoe@gmail.com')).toBe(true);
  });
  it('rejects a malformed email', () => {
    expect(isEmailOrMobile('jane@')).toBe(false);
    expect(isEmailOrMobile('jane.doe.com')).toBe(false);
  });
  it('accepts a valid AU mobile in common formats', () => {
    expect(isAuMobile('0412 345 678')).toBe(true);
    expect(isEmailOrMobile('0412345678')).toBe(true);
    expect(isEmailOrMobile('+61 412 345 678')).toBe(true);
  });
  it('rejects a landline or too-short number', () => {
    expect(isAuMobile('02 1234 5678')).toBe(false);
    expect(isEmailOrMobile('1234')).toBe(false);
  });
  it('rejects blank input', () => {
    expect(isEmailOrMobile('   ')).toBe(false);
  });
});
