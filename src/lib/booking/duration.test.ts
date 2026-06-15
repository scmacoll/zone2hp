import { describe, it, expect } from 'vitest';
import {
  estimateDuration,
  durationToken,
  parseDurationToken,
  formatDuration,
  type DurationInput,
} from './duration';

// The client's sizing rules (2026-06-15). These tests ARE the spec — changing a
// rule is a deliberate, reviewed edit here and in duration.ts.

const BOTH = { treatment: true, rehab: true };
const TREAT = { treatment: true, rehab: false };
const REHAB = { treatment: false, rehab: true };

const existing = (areas: number, wants: DurationInput['wants'], lapsed = false): DurationInput => ({
  areas,
  wants,
  isNewPatient: false,
  lapsed,
});
const newPatient = (areas: number, wants: DurationInput['wants']): DurationInput => ({
  areas,
  wants,
  isNewPatient: true,
});

describe('estimateDuration — existing patient base table', () => {
  it('1 area → 30 for any want', () => {
    expect(estimateDuration(existing(1, BOTH)).minutes).toBe(30);
    expect(estimateDuration(existing(1, TREAT)).minutes).toBe(30);
    expect(estimateDuration(existing(1, REHAB)).minutes).toBe(30);
  });
  it('2 areas → 45 both, 30 treatment-only, 45 rehab-only', () => {
    expect(estimateDuration(existing(2, BOTH)).minutes).toBe(45);
    expect(estimateDuration(existing(2, TREAT)).minutes).toBe(30);
    expect(estimateDuration(existing(2, REHAB)).minutes).toBe(45);
  });
  it('3 areas → 60 for any want', () => {
    expect(estimateDuration(existing(3, BOTH)).minutes).toBe(60);
    expect(estimateDuration(existing(3, TREAT)).minutes).toBe(60);
    expect(estimateDuration(existing(3, REHAB)).minutes).toBe(60);
  });
  it('base lengths are fixed, never a minimum', () => {
    expect(estimateDuration(existing(3, BOTH)).isMinimum).toBe(false);
    expect(estimateDuration(existing(1, BOTH)).isMinimum).toBe(false);
  });
});

describe('estimateDuration — lapsed existing patient (>3 months) is extended', () => {
  it('adds 15 minutes to any base under 60', () => {
    expect(estimateDuration(existing(1, BOTH, true))).toEqual({ minutes: 45, isMinimum: false });
    expect(estimateDuration(existing(2, TREAT, true)).minutes).toBe(45); // 30 -> 45
    expect(estimateDuration(existing(2, BOTH, true)).minutes).toBe(60); // 45 -> 60 (fixed)
  });
  it('turns a 60-minute base into an open-ended minimum 60', () => {
    expect(estimateDuration(existing(3, BOTH, true))).toEqual({ minutes: 60, isMinimum: true });
  });
});

describe('estimateDuration — new patient equals a lapsed existing patient', () => {
  it('mirrors the extended table for every areas/wants combination', () => {
    expect(estimateDuration(newPatient(1, BOTH))).toEqual(estimateDuration(existing(1, BOTH, true)));
    expect(estimateDuration(newPatient(2, TREAT))).toEqual(estimateDuration(existing(2, TREAT, true)));
    expect(estimateDuration(newPatient(2, BOTH))).toEqual(estimateDuration(existing(2, BOTH, true)));
    expect(estimateDuration(newPatient(3, REHAB))).toEqual(estimateDuration(existing(3, REHAB, true)));
  });
  it('a one-area new patient is the 45-minute initial', () => {
    expect(estimateDuration(newPatient(1, BOTH))).toEqual({ minutes: 45, isMinimum: false });
  });
  it('a three-area new patient is a minimum 60', () => {
    expect(estimateDuration(newPatient(3, BOTH))).toEqual({ minutes: 60, isMinimum: true });
  });
});

describe('duration tokens and formatting', () => {
  it('round-trips a fixed length through the URL token', () => {
    const e = { minutes: 45, isMinimum: false };
    expect(durationToken(e)).toBe('45');
    expect(parseDurationToken('45')).toEqual(e);
  });
  it('round-trips a minimum through the URL token', () => {
    const e = { minutes: 60, isMinimum: true };
    expect(durationToken(e)).toBe('60+');
    expect(parseDurationToken('60+')).toEqual(e);
  });
  it('parses a missing token as null', () => {
    expect(parseDurationToken(undefined)).toBeNull();
    expect(parseDurationToken('')).toBeNull();
  });
  it('formats fixed and minimum lengths for display', () => {
    expect(formatDuration({ minutes: 45, isMinimum: false })).toBe('45 minutes');
    expect(formatDuration({ minutes: 60, isMinimum: true })).toBe('minimum 60 minutes');
  });
});
