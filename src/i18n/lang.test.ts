import { describe, expect, it } from 'vitest';
import { englishPath, hasTwin, langFromPath, localise, twinPath } from './lang';

// Vitest runs with import.meta.env.DEV, so drafts (and the Korean pages) are on.
describe('langFromPath', () => {
  it('reads Korean only from the /ko prefix', () => {
    expect(langFromPath('/ko/')).toBe('ko');
    expect(langFromPath('/ko')).toBe('ko');
    expect(langFromPath('/ko/faq/')).toBe('ko');
    expect(langFromPath('/')).toBe('en');
    expect(langFromPath('/korea/')).toBe('en');
  });
});

describe('englishPath', () => {
  it('drops the /ko prefix', () => {
    expect(englishPath('/ko/')).toBe('/');
    expect(englishPath('/ko')).toBe('/');
    expect(englishPath('/ko/careers/x/')).toBe('/careers/x/');
    expect(englishPath('/faq/')).toBe('/faq/');
  });
});

describe('hasTwin', () => {
  it('knows which pages are translated', () => {
    expect(hasTwin('/')).toBe(true);
    expect(hasTwin('/faq')).toBe(true);
    expect(hasTwin('/careers/sample-chiropractor/')).toBe(true);
    expect(hasTwin('/blog/')).toBe(true);
    expect(hasTwin('/blog/not-translated-yet')).toBe(false);
    expect(hasTwin('/privacy/')).toBe(true);
    expect(hasTwin('/privacy/data-security')).toBe(true);
    expect(hasTwin('/refer/')).toBe(false);
    expect(hasTwin('/careers-compare/')).toBe(false);
  });
});

describe('localise', () => {
  it('prefixes links that have a Korean twin, keeping the hash', () => {
    expect(localise('ko', '/')).toBe('/ko/');
    expect(localise('ko', '/#about')).toBe('/ko/#about');
    expect(localise('ko', '/faq')).toBe('/ko/faq');
    expect(localise('ko', '/careers/sample-chiropractor')).toBe('/ko/careers/sample-chiropractor');
  });
  it('leaves English, external and untranslated links alone', () => {
    expect(localise('en', '/faq')).toBe('/faq');
    expect(localise('ko', '/blog')).toBe('/ko/blog');
    expect(localise('ko', '/blog/not-translated-yet')).toBe('/blog/not-translated-yet');
    expect(localise('ko', '/privacy')).toBe('/ko/privacy');
    expect(localise('ko', '/refer')).toBe('/refer');
    expect(localise('ko', 'tel:0450222122')).toBe('tel:0450222122');
  });
});

describe('twinPath', () => {
  it('points each translated page at its twin', () => {
    expect(twinPath('/')).toBe('/ko/');
    expect(twinPath('/ko/')).toBe('/');
    expect(twinPath('/faq/')).toBe('/ko/faq/');
    expect(twinPath('/ko/careers/')).toBe('/careers/');
    expect(twinPath('/privacy/')).toBe('/ko/privacy/');
    expect(twinPath('/refer/')).toBeNull();
  });
});
