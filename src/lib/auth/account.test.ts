import { describe, expect, it } from 'vitest';
import { toAccount } from './account';

/**
 * Maps a Supabase user onto our Account shape. The important property is
 * negative: nothing clinical, and nothing we did not ask for, comes across. See
 * the data boundary in ACCOUNTS.md.
 */
describe('toAccount', () => {
  const user = {
    id: 'e3b0c442-0000-4000-8000-000000000001',
    email: 'jane@example.com',
    user_metadata: { name: 'Jane Doe', marketing_opt_in: true },
  };

  it('maps id, email, name and the marketing opt-in', () => {
    expect(toAccount(user)).toEqual({
      id: 'e3b0c442-0000-4000-8000-000000000001',
      name: 'Jane Doe',
      email: 'jane@example.com',
      marketingOptIn: true,
    });
  });

  it('treats a missing opt-in as not opted in, never as consent', () => {
    expect(toAccount({ ...user, user_metadata: { name: 'Jane Doe' } }).marketingOptIn).toBe(false);
  });

  it('treats a non-boolean opt-in as not opted in', () => {
    const metadata = { name: 'Jane', marketing_opt_in: 'yes' };
    expect(toAccount({ ...user, user_metadata: metadata }).marketingOptIn).toBe(false);
  });

  it('falls back to the email local part when no name was stored', () => {
    expect(toAccount({ ...user, user_metadata: {} }).name).toBe('jane');
  });

  it('survives absent metadata entirely', () => {
    expect(toAccount({ id: 'x', email: 'a@b.com' }).name).toBe('a');
  });

  it('returns null for a null user, so callers handle signed-out uniformly', () => {
    expect(toAccount(null)).toBeNull();
    expect(toAccount(undefined)).toBeNull();
  });

  it('drops any extra metadata rather than passing it through', () => {
    const account = toAccount({
      ...user,
      user_metadata: {
        name: 'Jane Doe',
        marketing_opt_in: false,
        // Nothing like this should ever be set, but if it were, it must not leak.
        medicare_number: '1234567890',
        notes: 'clinical note',
      },
    });
    expect(Object.keys(account ?? {}).sort()).toEqual(['email', 'id', 'marketingOptIn', 'name']);
    expect(JSON.stringify(account)).not.toContain('1234567890');
  });

  it('uses an empty email rather than throwing when one is absent', () => {
    expect(toAccount({ id: 'x' }).email).toBe('');
  });
});
