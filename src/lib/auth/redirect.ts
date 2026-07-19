/**
 * Where to send someone after signing in or out.
 *
 * The value arrives from a `next` query parameter, so it is attacker-controlled.
 * Anything that is not an unambiguous same-site path is discarded rather than
 * repaired: a redirect is not worth being clever about.
 */

const DEFAULT_DESTINATION = '/account';
const MAX_LENGTH = 512;

export function safeRedirect(
  next: string | null | undefined,
  fallback: string = DEFAULT_DESTINATION,
): string {
  if (!next || next.length > MAX_LENGTH) return fallback;

  // Control characters (CR and LF enable header splitting), space, and DEL.
  // Written as an explicit codepoint range on purpose: a class like [ -\s]
  // reads as "space through whitespace" but parses as a LITERAL HYPHEN under
  // Annex B, which silently rejects every path containing a dash, including
  // real routes on this site such as /privacy/data-security.
  if (/[\u0000-\u0020\u007f]/.test(next)) return fallback;

  // Percent-encoding can hide a second slash, so judge the decoded form too.
  // A malformed escape means we cannot reason about it, so it is rejected.
  let decoded: string;
  try {
    decoded = decodeURIComponent(next);
  } catch {
    return fallback;
  }

  for (const value of [next, decoded]) {
    // Must be rooted, and must not be protocol-relative ("//host" is off-site).
    if (!value.startsWith('/') || value.startsWith('//')) return fallback;
    // Browsers normalise backslashes to forward slashes in some positions.
    if (value.includes('\\')) return fallback;
    // Belt and braces: no scheme may appear anywhere.
    if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return fallback;
  }

  return next;
}
