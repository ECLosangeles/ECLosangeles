import { defineLive } from 'next-sanity/live';
import { client } from './client';
import { readToken } from './env';

/**
 * `sanityFetch` is the only way pages should read from Sanity, and `<SanityLive />`
 * (mounted once in the root layout) is what makes those reads update.
 *
 * Together they give two things:
 *  - Published pages revalidate when content changes, without a redeploy.
 *  - Inside the Presentation tool, edits stream into the preview as the editor
 *    types, with stega turned on so the overlays know which field is which.
 *
 * Without `SANITY_API_READ_TOKEN` this still serves published content correctly;
 * only draft preview goes away. That keeps `pnpm build` working for anyone who
 * has cloned the repo without a token.
 */
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: readToken,
  browserToken: readToken,
});
