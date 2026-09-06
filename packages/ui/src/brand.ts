/**
 * Brand artwork paths, shared by components on both sides of the client
 * boundary. A plain module with no 'use client' — a constant exported from a
 * client component file becomes a client reference and cannot be read by a
 * server component such as the Footer.
 *
 * Paths are served from `apps/web/public`.
 */

/**
 * The one ECLA logotype, used by the header and the footer. Its orange reads on
 * both the wheat header and the Eerie Black footer, so there is no separate
 * negative treatment to keep in step.
 */
export const LOGO_SRC = '/brand/logo/logo-main.png';

/**
 * The three cultural motifs scattered across the site as a background theme.
 * See `PageMotifs`.
 */
export const MOTIF_SRCS = [
  '/brand/motifs/lion.png',
  '/brand/motifs/sun.png',
  '/brand/motifs/jebena.png',
] as const;
