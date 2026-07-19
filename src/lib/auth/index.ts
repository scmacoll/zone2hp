import { authConfig } from './config';
import { createMockAuthProvider } from './mock';
import { createSupabaseAuthProvider } from './supabase';
import type { AuthContext, AuthProvider } from './types';

/**
 * Selects the auth implementation for a request.
 *
 * Returns null when accounts are disabled, which is what an unconfigured
 * PRODUCTION build gets. Callers must treat null as "accounts are unavailable"
 * rather than "nobody is signed in": the mock would otherwise let anyone in.
 * See ACCOUNTS.md and config.ts.
 */
export function getAuthProvider(context: AuthContext): AuthProvider | null {
  switch (authConfig.mode) {
    case 'supabase':
      return createSupabaseAuthProvider(context);
    case 'mock':
      return createMockAuthProvider(context.cookies);
    case 'disabled':
      return null;
  }
}

export { authConfig } from './config';
export type { Account, AuthContext, AuthProvider, AuthResult, Credentials, SignUpInput } from './types';
