import type { Credentials, SignUpInput } from './types';

/**
 * Shared validation for the account forms. Runs on the server (the authority)
 * and, for the same messages, in the browser as progressive enhancement.
 */

export type FieldErrors = Partial<Record<'name' | 'email' | 'password', string>>;

/** Deliberately loose: the confirmation email is the real proof an address works. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_PASSWORD_LENGTH = 8;
/** bcrypt-style hashing costs scale with input, so cap it rather than hash a novel. */
export const MAX_PASSWORD_LENGTH = 128;

function emailError(email: string): string | undefined {
  return EMAIL.test(email.trim()) ? undefined : 'Please enter a valid email address.';
}

/** Collects every problem, so the form can show them all at once. */
export function validateSignUp(input: SignUpInput): FieldErrors {
  const errors: FieldErrors = {};

  if (input.name.trim().length === 0) errors.name = 'Please enter your name.';

  const email = emailError(input.email);
  if (email) errors.email = email;

  // Not trimmed: leading and trailing spaces are valid password characters.
  if (input.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Use at least ${MIN_PASSWORD_LENGTH} characters.`;
  } else if (input.password.length > MAX_PASSWORD_LENGTH) {
    errors.password = `Use ${MAX_PASSWORD_LENGTH} characters or fewer.`;
  }

  return errors;
}

/**
 * Sign-in checks shape only. It does not apply the signup length rule: an older
 * account may predate it, and the server decides whether the password is right.
 */
export function validateCredentials(credentials: Credentials): FieldErrors {
  const errors: FieldErrors = {};

  const email = emailError(credentials.email);
  if (email) errors.email = email;

  if (credentials.password.length === 0) errors.password = 'Please enter your password.';

  return errors;
}
