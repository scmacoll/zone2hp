import type { APIRoute } from 'astro';
import { getAuthProvider } from '../../../lib/auth/index';

export const prerender = false;

/**
 * Signs out. POST only: a GET would let any page sign a visitor out with an
 * <img> tag, and browsers may prefetch it.
 */
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const auth = getAuthProvider({ cookies, headers: request.headers });
  if (auth) await auth.signOut();
  return redirect('/');
};
