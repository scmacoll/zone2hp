import type { APIRoute } from 'astro';
import { getAuthProvider } from '../../../lib/auth/index';
import { validateCredentials } from '../../../lib/auth/validate';
import { safeRedirect } from '../../../lib/auth/redirect';
import { errorKey } from '../../../lib/auth/errors';

export const prerender = false;

/** Signs in. Plain form POST so it works without JavaScript. */
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const auth = getAuthProvider({ cookies, headers: request.headers });
  if (!auth) return redirect('/');

  const form = await request.formData();
  const credentials = {
    email: String(form.get('email') ?? ''),
    password: String(form.get('password') ?? ''),
  };

  // `next` comes from the form body, not the URL, so it survives the POST.
  const next = safeRedirect(String(form.get('next') ?? ''));
  const backToForm = (key: string) =>
    redirect(`/account/login?error=${key}&next=${encodeURIComponent(next)}`);

  const errors = validateCredentials(credentials);
  if (Object.keys(errors).length > 0) {
    return backToForm(errors.email ? 'email_invalid' : 'password_required');
  }

  const result = await auth.signIn(credentials);
  // Every sign-in failure is the same key, so the response cannot be used to
  // work out whether an address is registered.
  if (!result.ok) return backToForm('signin_failed');

  return redirect(next);
};
