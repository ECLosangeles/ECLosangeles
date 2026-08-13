import { STORIES_QUERY } from '../sanity/queries';
import type { STORIES_QUERY_RESULT } from '../sanity/sanity.types';
import { sanityFetch } from '../sanity/live';

/**
 * A story as shown in the listing.
 *
 * The full body is not fetched here: there is no story detail route yet, so
 * nothing renders it. When that route is added, give it its own query rather
 * than loading every body to build a list of teasers.
 */
export interface StorySummary {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date string */
  publishedAt: string;
  authorName?: string;
}

export async function getStories(): Promise<ReadonlyArray<StorySummary>> {
  const { data } = await sanityFetch({ query: STORIES_QUERY });

  return ((data ?? []) as STORIES_QUERY_RESULT)
    .filter((story) => story.slug && story.title && story.publishedAt)
    .map((story) => ({
      slug: story.slug!,
      title: story.title!,
      excerpt: story.excerpt ?? '',
      publishedAt: story.publishedAt!,
      ...(story.authorName ? { authorName: story.authorName } : {}),
    }));
}
