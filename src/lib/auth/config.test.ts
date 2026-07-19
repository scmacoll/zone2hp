import { describe, expect, it } from 'vitest';
import { resolveAuthMode } from './config';

/**
 * Which implementation runs is a safety decision, not a convenience one.
 *
 * The mock hands out a session to anyone who submits the form. That is useful
 * locally, and catastrophic in production. So an unconfigured production build
 * must disable accounts outright rather than quietly falling back to the mock.
 */
describe('resolveAuthMode', () => {
  const configured = { url: 'https://abc.supabase.co', anonKey: 'anon-key' };

  it('uses supabase when both credentials are present', () => {
    expect(resolveAuthMode({ ...configured, dev: false })).toBe('supabase');
    expect(resolveAuthMode({ ...configured, dev: true })).toBe('supabase');
  });

  it('DISABLES accounts in production when credentials are missing', () => {
    expect(resolveAuthMode({ url: '', anonKey: '', dev: false })).toBe('disabled');
    expect(resolveAuthMode({ url: configured.url, anonKey: '', dev: false })).toBe('disabled');
    expect(resolveAuthMode({ url: '', anonKey: configured.anonKey, dev: false })).toBe('disabled');
  });

  it('never falls back to the mock in production, whatever is half-configured', () => {
    const productionModes = [
      resolveAuthMode({ url: '', anonKey: '', dev: false }),
      resolveAuthMode({ url: '   ', anonKey: '   ', dev: false }),
      resolveAuthMode({ url: undefined, anonKey: undefined, dev: false }),
    ];
    expect(productionModes).not.toContain('mock');
  });

  it('falls back to the mock only in development', () => {
    expect(resolveAuthMode({ url: '', anonKey: '', dev: true })).toBe('mock');
  });

  it('treats whitespace-only values as missing', () => {
    expect(resolveAuthMode({ url: '  ', anonKey: '  ', dev: true })).toBe('mock');
    expect(resolveAuthMode({ url: '  ', anonKey: 'anon-key', dev: true })).toBe('mock');
  });

  it('treats an unreplaced placeholder as missing rather than trying to use it', () => {
    expect(resolveAuthMode({ url: 'your-project-url', anonKey: 'anon-key', dev: false })).toBe(
      'disabled',
    );
  });

  it('requires the url to look like a real https endpoint', () => {
    expect(resolveAuthMode({ url: 'notaurl', anonKey: 'anon-key', dev: false })).toBe('disabled');
    expect(resolveAuthMode({ url: 'http://abc.supabase.co', anonKey: 'k', dev: false })).toBe(
      'disabled',
    );
  });
});
