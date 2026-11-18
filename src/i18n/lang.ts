// Languages. English pages live at the root; Korean twins live under /ko/.
// Only the routes listed in TRANSLATED have a Korean twin, so links switch to
// /ko/... only where a Korean page exists and otherwise stay on the English one.
import { showDrafts } from '../lib/drafts';

export type Lang = 'en' | 'ko';

/** Set to true once Dr Kim signs the Korean translation off. Until then the
    Korean pages, the language switch and the hreflang links exist only where
    drafts are shown (staging, preview, dev), and are noindex there. */
export const koreanPublished = false;

export const koreanLive = koreanPublished || showDrafts;

/** English paths (trailing slash) that have a Korean twin. */
const TRANSLATED = ['/', '/faq/', '/careers/', '/blog/'];

/** Clinic Notes posts translated so far (slugs). Add each as it is done; the
    route at src/pages/ko/[...page].astro builds a page for each one. */
export const KOREAN_POSTS: string[] = ['achilles-tendinopathy', 'concentric-eccentric-isometric', 'shoulder-pain-stiff-or-unstable', 'understand-your-pain', 'de-quervains-tenosynovitis', 'low-back-pain-and-hips', 'dry-needling', 'zone-2-training'];

const withSlash = (path: string) => (path.endsWith('/') ? path : `${path}/`);

export function langFromPath(pathname: string): Lang {
  return pathname === '/ko' || pathname.startsWith('/ko/') ? 'ko' : 'en';
}

export function langFromUrl(url: URL): Lang {
  return langFromPath(url.pathname);
}

/** The English path for any path, Korean or not ("/ko/faq/" -> "/faq/"). */
export function englishPath(pathname: string): string {
  return langFromPath(pathname) === 'ko' ? pathname.slice(3) || '/' : pathname;
}

/** True when the English page at this path has a Korean twin. Careers role
    pages count when their careers index does. */
export function hasTwin(pathname: string): boolean {
  if (!koreanLive) return false;
  const path = withSlash(englishPath(pathname).split('#')[0].split('?')[0]);
  if (TRANSLATED.includes(path) || path.startsWith('/careers/')) return true;
  const post = path.match(/^\/blog\/([^/]+)\/$/);
  return post !== null && KOREAN_POSTS.includes(post[1]);
}

/**
 * The link to an English path in the given language. Korean only when a twin
 * exists; a hash or query is kept ("/#about" -> "/ko/#about").
 */
export function localise(lang: Lang, href: string): string {
  if (lang === 'en' || !href.startsWith('/') || !hasTwin(href)) return href;
  return `/ko${href}`;
}

/** The same page in the other language, or null when there is none. */
export function twinPath(pathname: string): string | null {
  if (!hasTwin(pathname)) return null;
  return langFromPath(pathname) === 'ko' ? englishPath(pathname) : `/ko${pathname}`;
}
