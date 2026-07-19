import { describe, expect, it } from 'vitest';
import { sessionCookieOptions } from './supabase';

/**
 * Regression guard for a bug that shipped silently.
 *
 * @supabase/ssr passes cookie options built from its own defaults, where
 * `httpOnly` is FALSE. The adapter originally spread those last, which stripped
 * httpOnly off the access and refresh tokens and left them readable from
 * `document.cookie`. Nothing failed, no test broke, and the code comment still
 * claimed the cookies were httpOnly.
 */
describe('sessionCookieOptions', () => {
  it('forces httpOnly on, even when the provider says otherwise', () => {
    expect(sessionCookieOptions({ httpOnly: false }).httpOnly).toBe(true);
  });

  it('forces the path to the site root', () => {
    expect(sessionCookieOptions({ path: '/some/scope' }).path).toBe('/');
  });

  it('keeps sameSite lax rather than letting it be widened to none', () => {
    expect(sessionCookieOptions({ sameSite: 'none' }).sameSite).toBe('lax');
  });

  it('does not let the provider clear the secure flag', () => {
    // secure tracks the build: true in production, false over http in dev.
    const provided = sessionCookieOptions({ secure: false });
    expect(provided.secure).toBe(!import.meta.env.DEV);
  });

  it('passes through options we do not own, such as expiry', () => {
    const options = sessionCookieOptions({ maxAge: 3600, domain: 'zone2hp.com' });
    expect(options.maxAge).toBe(3600);
    expect(options.domain).toBe('zone2hp.com');
  });

  it('works with no provider options at all', () => {
    expect(sessionCookieOptions()).toMatchObject({ httpOnly: true, path: '/', sameSite: 'lax' });
  });

  it('never returns a cookie a page script could read', () => {
    // The whole point: whatever comes in, httpOnly comes out true.
    const hostile = [{ httpOnly: false }, { httpOnly: undefined }, {}, { httpOnly: 'no' }];
    for (const options of hostile) {
      expect(sessionCookieOptions(options as Record<string, unknown>).httpOnly).toBe(true);
    }
  });
});
