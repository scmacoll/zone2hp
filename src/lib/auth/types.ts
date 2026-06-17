/**
 * Account types — NON-CLINICAL only.
 *
 * These accounts are for newsletter, early access and member content. There are
 * deliberately NO health or clinical fields here, and there must never be — that
 * would pull this surface into health-privacy scope. See BOOKING.md.
 */

export interface Account {
  id: string;
  name: string;
  email: string;
  /** Explicit, opt-in marketing consent. Unticked by default in the UI. */
  marketingOptIn: boolean;
}

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  marketingOptIn: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}

/** Auth provider as a plain object of functions (not a class). */
export interface AuthProvider {
  signUp: (input: SignUpInput) => Promise<Account>;
  signIn: (credentials: Credentials) => Promise<Account>;
  signOut: () => Promise<void>;
  getCurrentAccount: () => Account | null;
}
