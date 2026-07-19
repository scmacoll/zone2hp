import { createServerClient, parseCookieHeader, type CookieOptions } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { authConfig } from './config';
import { describeAuthError } from './errors';
import { toAccount } from './account';
import type {
  Account,
  AuthContext,
  AuthProvider,
  AuthResult,
  Credentials,
  SignUpInput,
} from './types';

/**
 * The real auth provider: Supabase (Sydney), with the session in httpOnly
 * cookies. Nothing is kept in localStorage or sessionStorage, per project hard
 * rule 5, so the token is not reachable from page scripts.
 */

const COOKIE_DEFAULTS = {
  path: '/',
  httpOnly: true,
  sameSite: 'lax',
  secure: !import.meta.env.DEV,
} as const;

/**
 * Merges the provider's cookie options with ours, OURS WINNING.
 *
 * Order matters and is a security property, not a style choice: @supabase/ssr
 * builds options from its own defaults where `httpOnly` is false. Spreading
 * those last strips httpOnly from the access and refresh tokens and leaves them
 * readable from `document.cookie`. Exported so a test can hold the line.
 */
export function sessionCookieOptions(
  providerOptions: Record<string, unknown> = {},
): Record<string, unknown> {
  return { ...providerOptions, ...COOKIE_DEFAULTS };
}

export function createSupabaseClient({ cookies, headers }: AuthContext): SupabaseClient {
  return createServerClient(authConfig.url, authConfig.anonKey, {
    cookies: {
      // getAll/setAll, NOT the get/set/remove trio. Those were deprecated in
      // @supabase/ssr 0.4.0 and are not merely old: a session larger than 3180
      // bytes is split across `.0`, `.1`, `.2` chunks, and the single-key API
      // cannot see which chunks exist. Shrinking from three chunks to two leaves
      // a stale `.2` behind, which the library then reads as corrupt state. The
      // symptom is intermittent, unexplained sign-outs.
      getAll() {
        return parseCookieHeader(headers.get('cookie') ?? '').map((cookie) => ({
          name: cookie.name,
          value: cookie.value ?? '',
        }));
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          cookies.set(name, value, sessionCookieOptions(options as CookieOptions));
        }
      },
    },
  });
}

export function createSupabaseAuthProvider(context: AuthContext): AuthProvider {
  const supabase = createSupabaseClient(context);

  return {
    async signUp(input: SignUpInput): Promise<AuthResult> {
      const { data, error } = await supabase.auth.signUp({
        email: input.email.trim(),
        password: input.password,
        options: {
          // Only these two. Nothing clinical belongs in user metadata, which is
          // user-editable and must never carry anything security-sensitive.
          data: { name: input.name.trim(), marketing_opt_in: input.marketingOptIn },
        },
      });

      if (error) return { ok: false, message: describeAuthError(error) };

      // Supabase returns a user with no session when confirmation is required.
      // It also returns a look-alike response for an address that already has an
      // account, which is deliberate: it stops the form confirming who is
      // registered. We pass that through rather than trying to detect it.
      return {
        ok: true,
        account: toAccount(data.user),
        needsEmailConfirmation: data.session === null,
      };
    },

    async signIn(credentials: Credentials): Promise<AuthResult> {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email.trim(),
        password: credentials.password,
      });

      if (error) return { ok: false, message: describeAuthError(error) };

      return { ok: true, account: toAccount(data.user), needsEmailConfirmation: false };
    },

    async signOut(): Promise<void> {
      await supabase.auth.signOut();
    },

    async getAccount(): Promise<Account | null> {
      // getUser() revalidates against the auth server. getSession() only decodes
      // the cookie, which a client could have tampered with, so it must not be
      // used to decide whether someone is signed in.
      const { data, error } = await supabase.auth.getUser();
      if (error) return null;
      return toAccount(data.user);
    },

    async updatePreferences({ marketingOptIn }): Promise<AuthResult> {
      // Supabase applies this to the signed-in user from the session cookie, so
      // one account cannot edit another's preferences by forging a form field.
      const { data, error } = await supabase.auth.updateUser({
        data: { marketing_opt_in: marketingOptIn },
      });

      if (error) return { ok: false, message: describeAuthError(error) };
      return { ok: true, account: toAccount(data.user), needsEmailConfirmation: false };
    },
  };
}
