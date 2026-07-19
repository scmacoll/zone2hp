import type { APIRoute } from 'astro';
import type { EmailOtpType } from '@supabase/supabase-js';
import { createSupabaseClient } from '../../../lib/auth/supabase';
import { authConfig } from '../../../lib/auth/config';
import { safeRedirect } from '../../../lib/auth/redirect';

export const prerender = false;

/**
 * Lands the confirmation link from the signup email and exchanges the one-time
 * token for a session. Configure this as the redirect URL in the Supabase
 * dashboard: https://zone2hp.com/api/account/confirm
 */
/** Only the flows we actually send. Anything else is not ours to verify. */
const ALLOWED_TYPES = new Set<EmailOtpType>(['signup', 'email_change', 'recovery']);

export const GET: APIRoute = async ({ request, url, cookies, redirect, locals }) => {
  if (!authConfig.isLive || !locals.accountsEnabled) return redirect('/');

  const tokenHash = url.searchParams.get('token_hash');
  const type = url.searchParams.get('type') as EmailOtpType | null;

  if (!tokenHash || !type || !ALLOWED_TYPES.has(type)) {
    return redirect('/account/login?error=link_invalid');
  }

  const supabase = createSupabaseClient({ cookies, headers: request.headers });
  const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });

  if (error) {
    return redirect('/account/login?error=link_expired');
  }

  return redirect(safeRedirect(url.searchParams.get('next')));
};
