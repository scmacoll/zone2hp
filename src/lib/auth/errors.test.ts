import { describe, expect, it } from 'vitest';
import { SIGN_IN_FAILED_MESSAGE, describeAuthError } from './errors';

/**
 * These messages are user-facing, so two rules apply beyond wording:
 *  - they must not reveal whether an email is registered (account enumeration);
 *  - they must not leak provider internals to the page.
 */
describe('describeAuthError', () => {
  it('gives one identical message for wrong password and unknown email', () => {
    const wrongPassword = describeAuthError({ code: 'invalid_credentials' });
    const noSuchUser = describeAuthError({ code: 'user_not_found' });
    expect(wrongPassword).toBe(noSuchUser);
    expect(wrongPassword).toBe(SIGN_IN_FAILED_MESSAGE);
  });

  it('does not say whether the account exists', () => {
    const message = describeAuthError({ code: 'user_not_found' }).toLowerCase();
    expect(message).not.toContain('not found');
    expect(message).not.toContain('no account');
    expect(message).not.toContain('does not exist');
    expect(message).not.toContain('unregistered');
  });

  it('tells an existing user to confirm their email, which is not a secret they lack', () => {
    expect(describeAuthError({ code: 'email_not_confirmed' })).toMatch(/confirm/i);
  });

  it('explains rate limiting so the person knows to wait rather than retrying', () => {
    expect(describeAuthError({ code: 'over_request_rate_limit' })).toMatch(/too many|wait|moment/i);
  });

  it('reports a weak password plainly, since the person chose it themselves', () => {
    expect(describeAuthError({ code: 'weak_password' })).toMatch(/password/i);
  });

  it('avoids confirming registration when a signup hits an existing address', () => {
    // Supabase returns this when a duplicate signup is attempted. Echoing it
    // would confirm the address is registered to whoever typed it.
    const message = describeAuthError({ code: 'user_already_exists' }).toLowerCase();
    expect(message).not.toContain('already registered');
    expect(message).not.toContain('already exists');
  });

  it('falls back to a generic message for an unrecognised code', () => {
    expect(describeAuthError({ code: 'some_future_code' })).toBeTruthy();
    expect(describeAuthError({ code: 'some_future_code' })).not.toContain('some_future_code');
  });

  it('never echoes the provider message back to the page', () => {
    const message = describeAuthError({
      code: 'invalid_credentials',
      message: 'AuthApiError: invalid login credentials at /token?grant_type=password',
    });
    expect(message).not.toMatch(/AuthApiError|grant_type|http|\//);
  });

  it('handles a missing code without throwing', () => {
    expect(describeAuthError({})).toBeTruthy();
    expect(describeAuthError(undefined)).toBeTruthy();
  });

  it('contains no em dash, per the project copy rule', () => {
    const codes = [
      'invalid_credentials',
      'user_not_found',
      'email_not_confirmed',
      'over_request_rate_limit',
      'weak_password',
      'user_already_exists',
      'unknown',
    ];
    for (const code of codes) {
      expect(describeAuthError({ code })).not.toContain('—');
    }
  });
});
