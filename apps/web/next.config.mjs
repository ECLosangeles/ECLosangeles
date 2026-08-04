import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const sharedConfig = {
  reactStrictMode: true,
  // Allow importing from workspace packages without a build step.
  transpilePackages: [
    '@eclosangeles/design-tokens',
    '@eclosangeles/ui',
    '@eclosangeles/content-schema',
  ],
  // All imagery is served from `public/` now that content lives in the repo —
  // no remote patterns needed.
};

export default function nextConfig(phase) {
  return withNextIntl({
    ...sharedConfig,
    // Keep `next dev` and `next build/start` caches separate so one cannot corrupt
    // the other's server chunks while switching commands on Windows.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
  });
}
