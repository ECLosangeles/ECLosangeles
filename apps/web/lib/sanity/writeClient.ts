import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from './env';

/**
 * Editor token, used only by `/api/visits` to bump the visit counter.
 *
 * Absent everywhere else, including every page render — the site reads
 * published content with no token at all. If it is unset the counter simply
 * doesn't render; nothing else on the site depends on write access.
 */
export const writeToken = process.env.SANITY_API_WRITE_TOKEN || undefined;

/**
 * A write-capable client, or `undefined` when no token is configured.
 *
 * `useCdn: false` because the CDN serves cached reads and this client is used
 * for the read-then-write of a counter that must not go backwards.
 */
export const writeClient = writeToken
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: 'published',
      token: writeToken,
    })
  : undefined;
