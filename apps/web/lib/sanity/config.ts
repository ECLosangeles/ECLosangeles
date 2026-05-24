/**
 * Resolved, validated Sanity connection settings.
 *
 * The project ID and dataset are *public* values (they ship to the browser and
 * are visible in the Studio config), so we keep working defaults to avoid a hard
 * crash if env vars are missing. But in production we warn loudly when they are
 * unset — silently talking to the wrong project is the failure mode we want to
 * catch. Anything secret (write tokens) must come from env only, never a default.
 */

const FALLBACK_PROJECT_ID = 'b59x306d';
const FALLBACK_DATASET = 'production';
// Pin the API version so query behaviour doesn't drift when Sanity ships changes.
const FALLBACK_API_VERSION = '2026-05-13';

function readEnv(name: string, fallback: string): string {
  const value = process.env[name];
  if (value && value.trim().length > 0) {
    return value.trim();
  }

  if (process.env.NODE_ENV === 'production') {
    // greppable prefix so this is easy to alert on in production logs
    console.warn(
      `[sanity] ${name} is not set — falling back to "${fallback}". ` +
        `Set it in the deployment environment to remove this warning.`,
    );
  }

  return fallback;
}

export const sanityConfig = {
  projectId: readEnv('NEXT_PUBLIC_SANITY_PROJECT_ID', FALLBACK_PROJECT_ID),
  dataset: readEnv('NEXT_PUBLIC_SANITY_DATASET', FALLBACK_DATASET),
  apiVersion: readEnv('NEXT_PUBLIC_SANITY_API_VERSION', FALLBACK_API_VERSION),
  // Use the CDN in production for cached, faster reads; bypass it in dev so
  // editors see published changes immediately.
  useCdn: process.env.NODE_ENV === 'production',
} as const;

export type SanityConfig = typeof sanityConfig;
