import { describe, it, expect } from 'vitest';
import { BOOKING_TYPES, bookingTypeInfo, funnelOrder, firstStep, nextStep, prevStep } from './funnel';

describe('booking types', () => {
  it('are the client-defined types in order (no standalone rehab type)', () => {
    expect(BOOKING_TYPES.map((t) => t.id)).toEqual(['standard', 'epc', 'tpc', 'ndis']);
  });
  it('map each type to its funding pathway', () => {
    expect(bookingTypeInfo('standard')?.funding).toBe('private');
    expect(bookingTypeInfo('epc')?.funding).toBe('medicare');
    expect(bookingTypeInfo('tpc')?.funding).toBe('compensable');
    expect(bookingTypeInfo('ndis')?.funding).toBe('ndis');
  });
  it('returns undefined for an unknown type', () => {
    // @ts-expect-error unknown id
    expect(bookingTypeInfo('mystery')).toBeUndefined();
  });
});

describe('funnel navigation (guest)', () => {
  it('starts at the customer step', () => {
    expect(firstStep()).toBe('customer');
  });
  it('advances through the order (funding folded into the visit step)', () => {
    expect(nextStep('customer')).toBe('type');
    expect(nextStep('type')).toBe('scope');
    expect(nextStep('scope')).toBe('time');
    expect(nextStep('time')).toBe('details');
    expect(nextStep('details')).toBe('confirm');
  });
  it('returns null past the last step', () => {
    expect(nextStep('confirm')).toBeNull();
  });
  it('steps back', () => {
    expect(prevStep('type')).toBe('customer');
    expect(prevStep('time')).toBe('scope');
    expect(prevStep('customer')).toBeNull();
  });
});

describe('funnel navigation (signed in)', () => {
  it('skips the customer step', () => {
    expect(funnelOrder({ signedIn: true })).not.toContain('customer');
    expect(firstStep({ signedIn: true })).toBe('type');
  });
  it('has no step before type', () => {
    expect(prevStep('type', { signedIn: true })).toBeNull();
  });
});
