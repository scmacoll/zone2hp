import { describe, it, expect } from 'vitest';
import {
  HEALTH_FUNDS,
  fundName,
  priceForDuration,
  estimateFunding,
  formatAud,
  fundingComplete,
  canContinueFunding,
  type FundingFields,
} from './funding';

// ⚠️ PROVISIONAL — these encode the prototype's stand-in prices/rebate, replaced
// by HALTH's real figures later. They exist so the funding maths has a spec.

describe('health funds', () => {
  it('includes the major AU funds with names', () => {
    expect(HEALTH_FUNDS.length).toBeGreaterThan(5);
    expect(fundName('bupa')).toBe('Bupa');
    expect(fundName('unknown')).toBe('');
  });
});

describe('priceForDuration (provisional)', () => {
  it('prices each known length', () => {
    expect(priceForDuration(30)).toBe(9000);
    expect(priceForDuration(45)).toBe(13000);
    expect(priceForDuration(60)).toBe(18000);
  });
  it('falls back to the 30-min price for an unknown length', () => {
    expect(priceForDuration(15)).toBe(9000);
  });
});

describe('estimateFunding (provisional)', () => {
  it('with no fund, the gap is the full price', () => {
    expect(estimateFunding({ fundId: null, priceCents: 13000 })).toEqual({
      priceCents: 13000,
      rebateCents: 0,
      gapCents: 13000,
    });
  });
  it('with a fund, returns a rebate and a smaller gap', () => {
    const e = estimateFunding({ fundId: 'bupa', priceCents: 9000 });
    expect(e.rebateCents).toBe(4950);
    expect(e.gapCents).toBe(4050);
    expect(e.rebateCents + e.gapCents).toBe(e.priceCents);
  });
  it('caps the rebate', () => {
    expect(estimateFunding({ fundId: 'bupa', priceCents: 18000 }).rebateCents).toBe(8000);
  });
});

describe('formatAud', () => {
  it('formats cents as dollars', () => {
    expect(formatAud(4050)).toBe('$40.50');
    expect(formatAud(8000)).toBe('$80.00');
  });
});

describe('funding gate (complete-or-empty)', () => {
  const empty: FundingFields = { fundId: null, memberNumber: '', cardIssueNumber: '', referenceNumber: '' };

  it('allows continue when nothing is entered', () => {
    expect(canContinueFunding(empty)).toBe(true);
  });
  it('allows continue when only a fund is picked (no card details)', () => {
    expect(canContinueFunding({ ...empty, fundId: 'bupa' })).toBe(true);
  });
  it('blocks continue when card details are partially entered', () => {
    expect(canContinueFunding({ ...empty, memberNumber: '12345' })).toBe(false);
    expect(canContinueFunding({ ...empty, referenceNumber: '9' })).toBe(false);
    expect(canContinueFunding({ ...empty, fundId: 'bupa', cardIssueNumber: '1' })).toBe(false);
  });
  it('allows continue once a fund and member number are present', () => {
    expect(canContinueFunding({ ...empty, fundId: 'bupa', memberNumber: '12345' })).toBe(true);
  });
  it('treats whitespace-only fields as empty', () => {
    expect(canContinueFunding({ ...empty, memberNumber: '   ' })).toBe(true);
  });
  it('an estimate needs a fund and a member number', () => {
    expect(fundingComplete({ ...empty, fundId: 'bupa' })).toBe(false);
    expect(fundingComplete({ ...empty, memberNumber: '1' })).toBe(false);
    expect(fundingComplete({ ...empty, fundId: 'bupa', memberNumber: '1' })).toBe(true);
  });
});
