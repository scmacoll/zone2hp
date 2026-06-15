import { describe, it, expect } from 'vitest';
import { parseBookingParams, buildStepUrl, stepPath } from './funnel-state';

describe('parseBookingParams', () => {
  it('reads known params', () => {
    const p = parseBookingParams(new URLSearchParams('customer=new&type=standard&slot=2026-06-16T09:00:00Z'));
    expect(p).toEqual({ customer: 'new', type: 'standard', slot: '2026-06-16T09:00:00Z' });
  });
  it('drops an invalid customer value', () => {
    expect(parseBookingParams(new URLSearchParams('customer=maybe')).customer).toBeUndefined();
  });
  it('reads an opaque existing-patient id', () => {
    expect(parseBookingParams(new URLSearchParams('pid=pat-alex')).pid).toBe('pat-alex');
  });
  it('reads scope duration and funding fund', () => {
    const p = parseBookingParams(new URLSearchParams('dur=45&fund=bupa'));
    expect(p.dur).toBe('45');
    expect(p.fund).toBe('bupa');
  });
  it('returns an empty object for no params', () => {
    expect(parseBookingParams(new URLSearchParams(''))).toEqual({});
  });
});

describe('stepPath', () => {
  it('maps steps to /book paths', () => {
    expect(stepPath('customer')).toBe('/book');
    expect(stepPath('type')).toBe('/book/type');
    expect(stepPath('confirm')).toBe('/book/confirm');
  });
});

describe('buildStepUrl', () => {
  const full = { customer: 'new', type: 'standard', slot: '2026-06-16T09:00:00Z', ref: 'Z2-1234' } as const;

  it('carries upstream params forward', () => {
    expect(buildStepUrl('time', full)).toBe('/book/time?customer=new&type=standard');
  });
  it('includes everything decided before confirm', () => {
    expect(buildStepUrl('confirm', full)).toBe(
      '/book/confirm?customer=new&type=standard&slot=2026-06-16T09%3A00%3A00Z&ref=Z2-1234',
    );
  });
  it('drops at/after-step params when jumping back (Change link)', () => {
    // Going back to "type" drops the type/slot/ref chosen later — re-pick.
    expect(buildStepUrl('type', full)).toBe('/book/type?customer=new');
  });
  it('the first step carries no params', () => {
    expect(buildStepUrl('customer', full)).toBe('/book');
  });
  it('carries the existing-patient pid forward, and drops it when returning to the first step', () => {
    const p = { customer: 'existing', pid: 'pat-alex', type: 'standard' } as const;
    expect(buildStepUrl('time', p)).toBe('/book/time?customer=existing&pid=pat-alex&type=standard');
    expect(buildStepUrl('customer', p)).toBe('/book');
  });
  it('carries scope duration and funding fund forward into time', () => {
    const p = { customer: 'new', type: 'standard', dur: '45', fund: 'frank' } as const;
    expect(buildStepUrl('time', p)).toBe('/book/time?customer=new&type=standard&dur=45&fund=frank');
  });
  it('jumping back to scope drops dur, fund (both decided on the scope step)', () => {
    const p = { customer: 'existing', type: 'epc', dur: '30', fund: 'bupa' } as const;
    expect(buildStepUrl('scope', p)).toBe('/book/scope?customer=existing&type=epc');
  });
});
