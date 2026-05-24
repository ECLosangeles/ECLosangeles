/**
 * Prefixes an internal href with the active locale segment (e.g. `/about` → `/en/about`).
 *
 * Leaves alone anything that shouldn't be prefixed: absolute URLs, in-page
 * anchors, and hrefs that already carry the locale prefix. Falls back to
 * `fallback` when `href` is missing.
 */
export function withLocalePrefix(
  linkPrefix: string,
  href: string | undefined,
  fallback: string,
): string {
  const resolvedHref = href || fallback;

  if (resolvedHref.startsWith('http') || resolvedHref.startsWith('#')) {
    return resolvedHref;
  }

  if (resolvedHref.startsWith(linkPrefix)) {
    return resolvedHref;
  }

  return `${linkPrefix}${resolvedHref.startsWith('/') ? resolvedHref : `/${resolvedHref}`}`;
}
