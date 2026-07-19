import type { APIRoute } from 'astro';
import { getAuthProvider } from '../../../lib/auth/index';
import { validateSignUp } from '../../../lib/auth/validate';


export const prerender = false;

/**
 * Creates an account. A plain form POST, so it works without JavaScript; the
 * client-side script is progressive enhancement over this, not a replacement.
 *
 * The response is deliberately the same whether or not the address already has
 * an account. Saying "that email is taken" would turn this form into a way to
 * discover who is registered.
 */
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const auth = getAuthProvider({ cookies, headers: request.headers });
  if (!auth) return redirect('/');

  const form = await request.formData();
  const input = {
    name: String(form.get('name') ?? ''),
    email: String(form.get('email') ?? ''),
    password: String(form.get('password') ?? ''),
    marketingOptIn: form.get('marketing') === 'on',
  };

  const errors = validateSignUp(input);
  if (Object.keys(errors).length > 0) {
    const key = errors.name ? 'name_required' : errors.email ? 'email_invalid' : 'password_short';
    return redirect(`/account/signup?error=${key}`);
  }

  const result = await auth.signUp(input);
  if (!result.ok) return redirect('/account/signup?error=generic');

  // ALWAYS land here, whether or not a session came back. If Supabase's
  // "Confirm email" setting is ever off, a new address would get a session and
  // land on /account, while an existing address would bounce back to the form:
  // two different destinations is a clean oracle for who already has an account.
  // One destination removes that, and costs a signed-in user one click.
  return redirect('/account/check-email');
};
