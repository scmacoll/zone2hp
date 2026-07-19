import type { Account } from './types';

/**
 * Maps a provider user onto our Account shape.
 *
 * This is the choke point for the data boundary in ACCOUNTS.md: fields are
 * copied across one by one, so anything else sitting in the provider's metadata
 * cannot reach the page by accident.
 */

interface ProviderUser {
  id: string;
  email?: string | null;
  user_metadata?: Record<string, unknown> | null;
}

export function toAccount(user: ProviderUser | null | undefined): Account | null {
  if (!user) return null;

  const metadata = user.user_metadata ?? {};
  const email = user.email ?? '';
  const name = typeof metadata.name === 'string' && metadata.name.trim() ? metadata.name : null;

  return {
    id: user.id,
    // Falling back to the local part keeps the greeting sane for an account
    // created without a name, e.g. by a future OAuth provider.
    name: name ?? email.split('@')[0] ?? '',
    email,
    // Consent is only consent when it is explicitly true.
    marketingOptIn: metadata.marketing_opt_in === true,
  };
}
