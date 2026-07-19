import { defineMiddleware } from 'astro:middleware';
import { getAuthProvider } from './lib/auth/index';
import { safeRedirect } from './lib/auth/redirect';
import { bookingConfig } from './lib/booking/config';

/**
 * Resolves the signed-in account once per request and guards the member area.
 *
 * Everything here runs only for on-demand routes. The marketing pages are
 * prerendered, so they never reach this and stay pure static output.
 */

/** Everything under the account surface, UI and API alike. */
const ACCOUNT_SURFACE = ['/account', '/api/account'];

/**
 * Account pages a signed-out visitor is allowed to see. `check-email` belongs
 * here because signing up deliberately leaves you WITHOUT a session: treating it
 * as protected bounced every new signup to the login page and the "check your
 * inbox" instruction was never shown to anyone who needed it.
 */
const PUBLIC_ACCOUNT_PAGES = ['/account/login', '/account/signup', '/account/check-email'];

/** Of those, the ones a signed-in visitor has no reason to see. */
const SIGNED_OUT_ONLY = ['/account/login', '/account/signup'];

function matches(pathname: string, prefixes: string[]): boolean {
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/** A cached auth response would carry a live Set-Cookie to the next visitor. */
function noStore(response: Response): Response {
  response.headers.set('Cache-Control', 'private, no-store, max-age=0');
  return response;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Prerendered pages have no meaningful cookie access and need no session.
  if (context.isPrerendered) return next();

  const auth = getAuthProvider({ cookies: context.cookies, headers: context.request.headers });
  const account = auth ? await auth.getAccount() : null;

  context.locals.account = account;
  context.locals.accountsEnabled = auth !== null && bookingConfig.accountsEnabled;

  // With accounts gated off (production today) or unconfigured, the whole
  // surface closes. This deliberately covers /api/account as well as the pages:
  // gating only the UI would leave the endpoints live, so a plain POST could
  // still create real accounts while the site showed no way to do so.
  if (!context.locals.accountsEnabled && matches(pathname, ACCOUNT_SURFACE)) {
    return noStore(context.redirect('/'));
  }

  if (!account && matches(pathname, ['/account']) && !matches(pathname, PUBLIC_ACCOUNT_PAGES)) {
    // Remember where they were headed, so signing in resumes it. safeRedirect
    // sanitises this again on the way back out.
    const next_ = encodeURIComponent(safeRedirect(pathname + context.url.search));
    return noStore(context.redirect(`/account/login?next=${next_}`));
  }

  if (account && matches(pathname, SIGNED_OUT_ONLY)) {
    return noStore(context.redirect(safeRedirect(context.url.searchParams.get('next'))));
  }

  return noStore(await next());
});
