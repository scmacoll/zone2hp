import type { AuthProvider } from './types';
import { mockAuthProvider } from './mock';

/**
 * Select the active auth provider. Mock only in this static, no-backend phase.
 * Real auth (a server with httpOnly session cookies) replaces the mock here. See
 * BOOKING.md.
 */
export function getAuthProvider(): AuthProvider {
  return mockAuthProvider;
}
