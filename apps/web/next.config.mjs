import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

/** @type {import('next').NextConfig} */
const sharedConfig = {
  reactStrictMode: true,
  // Allow importing from workspace packages without a build step.
  transpilePackages: [
    '@eclosangeles/design-tokens',
    '@eclosangeles/ui',
    '@eclosangeles/content-schema',
  ],
  // Imagery is served from `public/` while content lives in the repo. Phase 1 of
  // the Sanity re-integration adds `cdn.sanity.io` here.
};

export default function nextConfig(phase) {
  return {
    ...sharedConfig,
    // Keep `next dev` and `next build/start` caches separate so one cannot corrupt
    // the other's server chunks while switching commands on Windows.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
  };
}
