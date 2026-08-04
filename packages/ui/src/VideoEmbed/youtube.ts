/**
 * Normalise any YouTube watch URL into an embeddable one.
 *
 * Handles the shapes people actually paste: `watch?v=`, `youtu.be/…`,
 * `/embed/…` and `/shorts/…`. Share links often carry extra query params
 * (`si`, `feature`, `t`); those are read off the parsed URL rather than
 * assumed away, so parameter order doesn't matter.
 *
 * Returns null for anything that isn't a recognisable YouTube URL, so callers
 * can drop unembeddable entries instead of rendering a broken frame.
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^www\./, '');

    if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      const videoId = parsedUrl.searchParams.get('v');

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      const [, route, id] = parsedUrl.pathname.split('/');

      if ((route === 'embed' || route === 'shorts') && id) {
        return `https://www.youtube.com/embed/${id}`;
      }
    }

    if (hostname === 'youtu.be') {
      const id = parsedUrl.pathname.split('/').filter(Boolean)[0];

      if (id) {
        return `https://www.youtube.com/embed/${id}`;
      }
    }
  } catch {
    return null;
  }

  return null;
}
