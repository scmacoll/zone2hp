import type { Account, AuthProvider, AuthResult, CookieStore, Credentials, SignUpInput } from './types';

/**
 * Development-only stand-in for Supabase.
 *
 * It accepts ANY credentials and issues a session cookie, which makes the whole
 * flow (sign up, session, protected page, sign out) exercisable locally before
 * real credentials exist. That also makes it an open door, so `resolveAuthMode`
 * refuses to select it outside development: an unconfigured production build
 * disables accounts instead. See config.ts.
 *
 * The cookie is unsigned on purpose. Signing it would imply a trust level this
 * has no business implying.
 */

const COOKIE = 'z2-mock-account';

const COOKIE_OPTIONS = {
  path: '/',
  httpOnly: true,
  sameSite: 'lax',
  secure: false, // dev only, served over http
  maxAge: 60 * 60 * 8,
} as const;

function encode(account: Account): string {
  return Buffer.from(JSON.stringify(account), 'utf8').toString('base64url');
}

function decode(raw: string | undefined): Account | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(Buffer.from(raw, 'base64url').toString('utf8')) as Account;
    return typeof parsed?.email === 'string' ? parsed : null;
  } catch {
    return null;
  }
}

export function createMockAuthProvider(cookies: CookieStore): AuthProvider {
  function remember(account: Account): void {
    cookies.set(COOKIE, encode(account), COOKIE_OPTIONS);
  }

  return {
    async signUp(input: SignUpInput): Promise<AuthResult> {
      const account: Account = {
        id: `mock_${input.email.trim().toLowerCase()}`,
        name: input.name.trim(),
        email: input.email.trim(),
        marketingOptIn: input.marketingOptIn,
      };
      remember(account);
      // No confirmation step locally: there is no mail server to receive it.
      return { ok: true, account, needsEmailConfirmation: false };
    },

    async signIn(credentials: Credentials): Promise<AuthResult> {
      const email = credentials.email.trim();
      const account: Account = {
        id: `mock_${email.toLowerCase()}`,
        name: email.split('@')[0] || 'Member',
        email,
        marketingOptIn: false,
      };
      remember(account);
      return { ok: true, account, needsEmailConfirmation: false };
    },

    async signOut(): Promise<void> {
      cookies.delete(COOKIE, { path: '/' });
    },

    async getAccount(): Promise<Account | null> {
      return decode(cookies.get(COOKIE)?.value);
    },

    async updatePreferences({ marketingOptIn }): Promise<AuthResult> {
      const account = decode(cookies.get(COOKIE)?.value);
      if (!account) return { ok: false, message: 'Please sign in again.' };

      const updated = { ...account, marketingOptIn };
      remember(updated);
      return { ok: true, account: updated, needsEmailConfirmation: false };
    },
  };
}
