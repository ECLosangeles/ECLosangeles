import { createClient, type ClientConfig } from '@sanity/client';
import { sanityConfig } from './config';

const clientConfig: ClientConfig = {
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: sanityConfig.useCdn,
  // We only ever read published content from the public site. Drafts/preview
  // are a separate concern handled by the Studio.
  perspective: 'published',
};

/** Shared, configured Sanity read client. Reuse this — don't create per-request clients. */
export const sanityClient = createClient(clientConfig);

/**
 * Logs a content-fetch failure without throwing. We intentionally fall back to
 * mock/default data when Sanity is unreachable, so these warnings are the *only*
 * signal that live content stopped loading — keep them visible in server logs.
 */
function logSanityFailure(reason: string, detail?: unknown) {
  // A short, greppable prefix so these are easy to find/alert on in production logs.
  console.warn(`[sanity] content fetch failed — falling back to defaults: ${reason}`, detail ?? '');
}

/**
 * Run a GROQ query and return its result, or `null` if the request fails for any
 * reason. Callers treat `null` as "use defaults" so a CMS outage degrades the site
 * to mock content instead of crashing it.
 *
 * `revalidate` (seconds) feeds Next.js's fetch cache via the client's tag/cache
 * integration; 60s is a sensible default for editorial content.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: { revalidate?: number; tags?: string[] } = {},
): Promise<T | null> {
  const { revalidate = 60, tags } = options;

  try {
    const result = await sanityClient.fetch<T>(query, params, {
      next: { revalidate, ...(tags ? { tags } : {}) },
    });

    return result ?? null;
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'unknown error';
    logSanityFailure(reason, error);
    return null;
  }
}
