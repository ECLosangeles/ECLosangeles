/**
 * Sanity connection settings.
 *
 * Project id and dataset are not secrets — they appear in every request the
 * browser makes — so they carry defaults matching the ECLA project and the site
 * builds without any .env file. Only the read token is genuinely secret, and it
 * is only needed for draft previews.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'b59x306d';

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

/**
 * Pinned deliberately: Sanity's API is versioned by date, and bumping this can
 * change query behaviour. Keep it in step with the Studio's own apiVersion.
 */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-05-13';

/**
 * Where the Studio lives. Stega-encoded content embeds this so clicking text on
 * the page can open the right document in the right Studio.
 */
export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? 'https://eclosangeles.sanity.studio';

/**
 * Viewer token, used only to read unpublished drafts for the Presentation tool.
 * Absent in a normal production render — published content needs no token.
 */
export const readToken = process.env.SANITY_API_READ_TOKEN || undefined;
