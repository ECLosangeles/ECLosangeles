import createImageUrlBuilder, { type SanityImageSource } from '@sanity/image-url';
import { dataset, projectId } from './env';

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Builds a CDN URL for a Sanity image reference.
 *
 * Sanity serves derivatives on demand, so ask for the size you actually render
 * rather than shipping the original — editors upload straight off a phone or
 * camera and those files are large.
 *
 * @example urlFor(gallery.image).width(800).height(600).fit('crop').url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto('format');
}
