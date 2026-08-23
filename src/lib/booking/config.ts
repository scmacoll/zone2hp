/**
 * Booking configuration, read from build-time env (import.meta.env).
 *
 * Only PUBLIC_* vars are readable here. They are inlined into the static build and
 * are NOT secret. The real provider's API key is a SERVER-ONLY secret (no PUBLIC_
 * prefix); it is never read in this file or anywhere else on the client. See
 * .env.example. Because the site is statically generated, these values are frozen
 * at build time — changing one means a rebuild and redeploy.
 */

export type BookingMode = 'mock' | 'embedded' | 'api';

const env = import.meta.env;

function readMode(): BookingMode {
  const value = env.PUBLIC_BOOKING_MODE;
  return value === 'embedded' || value === 'api' || value === 'mock' ? value : 'mock';
}

export const bookingConfig = {
  /** How /book renders: 'mock' | 'api' drive the custom UI; 'embedded' renders the hosted page. */
  mode: readMode(),
  /** Which provider getBookingProvider() selects once a backend exists. */
  provider: env.PUBLIC_BOOKING_PROVIDER ?? 'mock',
  /** Hosted booking page URL, used by BookingEmbed in 'embedded' mode. */
  embedUrl: (env.PUBLIC_BOOKING_EMBED_URL as string | undefined) ?? null,
  /** Whether the BOOKING surface is publicly reachable: the Book now buttons and
      /book/*. Off unless PUBLIC_BOOKING_LINKS_VISIBLE=true. */
  linksVisible: env.PUBLIC_BOOKING_LINKS_VISIBLE === 'true',

  /** Whether the ACCOUNTS surface is reachable: the Log in button, /account/*
      and /api/account/*. Deliberately SEPARATE from booking, so the Splose
      booking embed can be demonstrated while accounts stay switched off. Off
      unless PUBLIC_ACCOUNTS_ENABLED=true. */
  accountsEnabled: env.PUBLIC_ACCOUNTS_ENABLED === 'true',
  /** Show the private-health-funding (HALTH-style) step. On by default; set
      PUBLIC_BOOKING_FUNDING=false to remove it from the funnel. */
  fundingEnabled: env.PUBLIC_BOOKING_FUNDING !== 'false',

  /** Cliniko appointment type IDs for filtered embeds. Comma-separated. */
  clinikoNewPatientTypes: (env.PUBLIC_CLINIKO_NEW_PATIENT_TYPES as string | undefined) ?? null,
  clinikoExistingPatientTypes: (env.PUBLIC_CLINIKO_EXISTING_PATIENT_TYPES as string | undefined) ?? null,
} as const;
