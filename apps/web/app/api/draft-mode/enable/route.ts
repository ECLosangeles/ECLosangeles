import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { client } from '@/lib/sanity/client';
import { readToken } from '@/lib/sanity/env';

/**
 * Entry point the Studio's Presentation tool calls to start a draft preview.
 *
 * The handler validates the signed URL Sanity sends before enabling draft mode,
 * so this cannot be used to read unpublished content by simply visiting it.
 */
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: readToken }),
});
