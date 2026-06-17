import type { Account, AuthProvider, Credentials, SignUpInput } from './types';

/**
 * In-memory mock auth — a plain object of functions over a module variable.
 *
 * IMPORTANT: this does NOT persist. Every Astro route is a full document load, so
 * this module is re-created on each navigation and a "signed in" state cannot
 * survive moving between pages. That is intentional for this pass: the account
 * screens are a designed, client-validated DEMO, not a real session. Real auth
 * needs a server and httpOnly session cookies (see BOOKING.md). No browser
 * storage is used here (project hard rule 5).
 */

let current: Account | null = null;
const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const mockAuthProvider: AuthProvider = {
  async signUp(input: SignUpInput) {
    await sleep(400);
    current = {
      id: `acct_${input.email.toLowerCase()}`,
      name: input.name,
      email: input.email,
      marketingOptIn: input.marketingOptIn,
    };
    return current;
  },

  async signIn(credentials: Credentials) {
    await sleep(400);
    current = {
      id: `acct_${credentials.email.toLowerCase()}`,
      name: credentials.email.split('@')[0] || 'Member',
      email: credentials.email,
      marketingOptIn: false,
    };
    return current;
  },

  async signOut() {
    await sleep(150);
    current = null;
  },

  getCurrentAccount() {
    return current;
  },
};
