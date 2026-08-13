import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, studioUrl } from './env';

/**
 * The shared read client for published content.
 *
 * `stega` embeds invisible metadata in returned strings that maps each one back
 * to the document and field it came from. That is what makes click-to-edit work
 * in the Studio's Presentation tool. It is enabled per-request by the fetch
 * helpers rather than globally, so normal page renders return clean strings.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  stega: {
    studioUrl,
    // Off by default; `sanityFetch` turns it on when draft mode is active.
    enabled: false,
  },
});
