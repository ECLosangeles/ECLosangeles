import type { QueryParams } from 'next-sanity';
import { client } from './client';

/**
 * Reads published content from outside a request scope.
 *
 * `sanityFetch` cannot be used in `generateStaticParams`: it consults
 * `draftMode()`, and Next throws when that is called with no request in flight.
 * This goes straight to the client instead — no drafts, no stega, which is
 * correct for build-time work like enumerating routes.
 *
 * Use `sanityFetch` everywhere else, so pages stay live-updating and editable.
 */
export async function fetchStatic<T>(query: string, params: QueryParams = {}): Promise<T> {
  return client.fetch<T>(query, params, {
    perspective: 'published',
    stega: false,
  });
}
