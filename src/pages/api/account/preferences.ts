import type { APIRoute } from 'astro';
import { getAuthProvider } from '../../../lib/auth/index';

export const prerender = false;

/**
 * Saves the member's email preferences.
 *
 * The provider applies the change to whoever the session cookie identifies, so a
 * forged account id in the body cannot edit somebody else's preferences.
 */
export const POST: APIRoute = async ({ request, cookies, redirect, locals }) => {
  const auth = getAuthProvider({ cookies, headers: request.headers });
  if (!auth || !locals.account) return redirect('/account/login');

  const form = await request.formData();
  const result = await auth.updatePreferences({ marketingOptIn: form.get('marketing') === 'on' });

  const status = result.ok ? 'saved' : 'error';
  return redirect(`/account?prefs=${status}`);
};
