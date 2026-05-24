import { describe, expect, it } from 'vitest';
import { withLocalePrefix } from './withLocalePrefix';

describe('withLocalePrefix', () => {
  it('prefixes a root-relative internal href', () => {
    expect(withLocalePrefix('/en', '/about', '/fallback')).toBe('/en/about');
  });

  it('adds a leading slash to a bare relative href', () => {
    expect(withLocalePrefix('/en', 'about', '/fallback')).toBe('/en/about');
  });

  it('uses the fallback when href is undefined', () => {
    expect(withLocalePrefix('/am', undefined, '/membership')).toBe('/am/membership');
  });

  it('uses the fallback when href is an empty string', () => {
    expect(withLocalePrefix('/am', '', '/membership')).toBe('/am/membership');
  });

  it('leaves absolute http(s) URLs untouched', () => {
    expect(withLocalePrefix('/en', 'https://example.org/x', '/fb')).toBe('https://example.org/x');
  });

  it('leaves in-page anchors untouched', () => {
    expect(withLocalePrefix('/en', '#section', '/fb')).toBe('#section');
  });

  it('does not double-prefix an href that already has the locale', () => {
    expect(withLocalePrefix('/en', '/en/events', '/fb')).toBe('/en/events');
  });

  it('applies the fallback through the prefixing rules too', () => {
    // fallback is bare → still gets the locale prefix
    expect(withLocalePrefix('/en', undefined, 'contact')).toBe('/en/contact');
  });
});
