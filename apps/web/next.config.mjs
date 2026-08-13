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
  images: {
    // Editor-uploaded imagery is served from Sanity's asset CDN. Brand assets
    // (logos, icons, motifs) stay in `public/` — they are design, not content.
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
};

export default function nextConfig(phase) {
  return {
    ...sharedConfig,
    // Keep `next dev` and `next build/start` caches separate so one cannot corrupt
    // the other's server chunks while switching commands on Windows.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
  };
}
