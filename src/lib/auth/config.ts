/**
 * Account configuration, read at RUNTIME.
 *
 * These are server-only secrets with no PUBLIC_ prefix, so they are never
 * inlined into a browser bundle. `process.env` is read first because that is
 * where the values live at request time on Vercel; `import.meta.env` covers the
 * local dev server, which loads .env through Vite.
 *
 * See ACCOUNTS.md for what may and may not be stored behind these credentials.
 */

export type AuthMode = 'supabase' | 'mock' | 'disabled';

interface ModeInputs {
  url: string | undefined;
  anonKey: string | undefined;
  dev: boolean;
}

/** Values left in from .env.example, which must never be treated as configured. */
const PLACEHOLDERS = new Set(['your-project-url', 'your-anon-key', 'changeme']);

function present(value: string | undefined): boolean {
  const trimmed = value?.trim() ?? '';
  return trimmed.length > 0 && !PLACEHOLDERS.has(trimmed);
}

/**
 * Decides which implementation serves a request.
 *
 * The mock grants a session to anyone who submits the form, so it is confined to
 * development. A production build with missing credentials disables accounts
 * rather than falling back, because a silent fallback would be an open door.
 */
export function resolveAuthMode({ url, anonKey, dev }: ModeInputs): AuthMode {
  const trimmedUrl = url?.trim() ?? '';
  const usable = present(url) && present(anonKey) && trimmedUrl.startsWith('https://');

  if (usable) return 'supabase';
  return dev ? 'mock' : 'disabled';
}

function readEnv(key: string): string | undefined {
  const fromProcess = typeof process !== 'undefined' ? process.env?.[key] : undefined;
  return fromProcess ?? (import.meta.env[key] as string | undefined);
}

export const authConfig = {
  get url(): string {
    return readEnv('SUPABASE_URL')?.trim() ?? '';
  },
  get anonKey(): string {
    return readEnv('SUPABASE_ANON_KEY')?.trim() ?? '';
  },
  get mode(): AuthMode {
    return resolveAuthMode({
      url: readEnv('SUPABASE_URL'),
      anonKey: readEnv('SUPABASE_ANON_KEY'),
      dev: import.meta.env.DEV === true,
    });
  },
  /** True when a real, persistent session is available. */
  get isLive(): boolean {
    return this.mode === 'supabase';
  },
} as const;
