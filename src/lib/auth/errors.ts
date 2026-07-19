/**
 * Turns a provider error into copy we are willing to show a visitor.
 *
 * Two rules drive the wording:
 *  - **No account enumeration.** A wrong password and an unknown address get the
 *    same sentence, so the form cannot be used to discover who has an account.
 *  - **No provider internals.** The raw message is never echoed to the page; it
 *    can carry endpoints and library names.
 */

export interface ProviderError {
  code?: string;
  message?: string;
}

export const SIGN_IN_FAILED_MESSAGE =
  'That email address and password do not match. Please check and try again.';

const GENERIC_MESSAGE = 'Something went wrong. Please try again.';

const MESSAGES: Record<string, string> = {
  // Both map to the same sentence on purpose. Do not split them.
  invalid_credentials: SIGN_IN_FAILED_MESSAGE,
  user_not_found: SIGN_IN_FAILED_MESSAGE,

  email_not_confirmed: 'Please confirm your email address first. Check your inbox for the link.',
  over_request_rate_limit: 'Too many attempts. Please wait a moment and try again.',
  over_email_send_rate_limit: 'Too many emails requested. Please wait a moment and try again.',
  weak_password: 'Please choose a longer password, at least 8 characters.',
  same_password: 'Please choose a password you have not used here before.',
  validation_failed: 'Please check the details you entered and try again.',

  // Signing up with an address that already has an account. Confirming that would
  // leak the same fact the sign-in form is careful to hide, so the caller sends
  // the "check your inbox" response either way and this stays neutral.
  user_already_exists: GENERIC_MESSAGE,
  email_exists: GENERIC_MESSAGE,
};

export function describeAuthError(error: ProviderError | null | undefined): string {
  const code = error?.code;
  if (!code) return GENERIC_MESSAGE;
  return MESSAGES[code] ?? GENERIC_MESSAGE;
}

/**
 * Messages the forms may show, addressed by a short opaque key.
 *
 * The failure path round-trips through a query parameter, so the page must never
 * render that parameter directly: `?error=Your%20account%20is%20locked,%20call%20
 * 02%205550%201234` would put an attacker's phone number inside an alert on the
 * real clinic domain, under a valid certificate. Keys in, fixed copy out.
 */
export type FormMessageKey =
  | 'signin_failed'
  | 'check_details'
  | 'email_invalid'
  | 'password_required'
  | 'name_required'
  | 'password_short'
  | 'link_invalid'
  | 'link_expired'
  | 'generic';

const FORM_MESSAGES: Record<FormMessageKey, string> = {
  signin_failed: SIGN_IN_FAILED_MESSAGE,
  check_details: 'Please check the details you entered and try again.',
  email_invalid: 'Please enter a valid email address.',
  password_required: 'Please enter your password.',
  name_required: 'Please enter your name.',
  password_short: 'Please choose a longer password, at least 8 characters.',
  link_invalid: 'That link is not valid.',
  link_expired: 'That link has expired or has already been used. Please sign in.',
  generic: GENERIC_MESSAGE,
};

/** Resolves a key from the URL. Anything unrecognised becomes the generic line. */
export function formMessage(key: string | null | undefined): string | null {
  if (!key) return null;
  return FORM_MESSAGES[key as FormMessageKey] ?? GENERIC_MESSAGE;
}

/** Maps a provider error onto a key safe to put in a URL. */
export function errorKey(error: ProviderError | null | undefined): FormMessageKey {
  switch (error?.code) {
    case 'invalid_credentials':
    case 'user_not_found':
      return 'signin_failed';
    case 'weak_password':
      return 'password_short';
    case 'validation_failed':
      return 'check_details';
    default:
      return 'generic';
  }
}
