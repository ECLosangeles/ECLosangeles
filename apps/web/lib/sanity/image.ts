import { createImageUrlBuilder } from '@sanity/image-url';
import type { ImageUrlBuilder, SanityImageSource } from '@sanity/image-url';
import { sanityClient } from './client';

const builder = createImageUrlBuilder(sanityClient);

/**
 * Build a URL for a Sanity image source. Respects the hotspot/crop set by editors
 * in the Studio, so call `.width()/.height()` to request a properly-cropped, sized
 * asset instead of serving the full-resolution original.
 *
 * @example urlFor(image).width(1200).height(800).fit('crop').url()
 */
export function urlFor(source: SanityImageSource): ImageUrlBuilder {
  return builder.image(source);
}

/**
 * Convenience for the common case: a single resolved URL at a target width,
 * auto-format (WebP/AVIF where supported). Returns `undefined` for empty sources
 * so callers can fall back to a placeholder.
 */
export function imageUrl(
  source: SanityImageSource | null | undefined,
  width = 1200,
): string | undefined {
  if (!source) return undefined;
  return urlFor(source).width(width).auto('format').url();
}
