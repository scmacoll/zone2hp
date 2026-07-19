/**
 * Account types — NON-CLINICAL only.
 *
 * These accounts are for updates, early access and member content. There are
 * deliberately NO health or clinical fields here, and there must never be. Splose
 * is the system of record for anything clinical, and putting that behind our
 * login would make us a custodian of health information. See ACCOUNTS.md.
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

/**
 * Result of an auth attempt. A failure carries copy that is already safe to
 * show (see errors.ts): it never reveals whether an address is registered.
 */
export type AuthResult =
  | {
      ok: true;
      account: Account | null;
      /** True when the account exists but the address still needs confirming. */
      needsEmailConfirmation: boolean;
    }
  | { ok: false; message: string };

/**
 * Request-scoped auth, as a plain object of functions (not a class). Created per
 * request because the session lives in that request's cookies, not in module
 * state.
 */
export interface AuthProvider {
  signUp: (input: SignUpInput) => Promise<AuthResult>;
  signIn: (credentials: Credentials) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  getAccount: () => Promise<Account | null>;
  /** Updates the stored preferences of the signed-in account. */
  updatePreferences: (preferences: Preferences) => Promise<AuthResult>;
}

/** Everything a member can change about their own account. Non-clinical only. */
export interface Preferences {
  marketingOptIn: boolean;
}

/** The slice of Astro's cookie API the providers need. */
export interface CookieStore {
  get: (key: string) => { value: string } | undefined;
  set: (key: string, value: string, options: Record<string, unknown>) => void;
  delete: (key: string, options?: Record<string, unknown>) => void;
}

/**
 * What a provider needs from the request. Headers are required as well as
 * cookies because @supabase/ssr's getAll() reads the raw Cookie header, which is
 * the only way to see every chunk of a split session token.
 */
export interface AuthContext {
  cookies: CookieStore;
  headers: Headers;
}
