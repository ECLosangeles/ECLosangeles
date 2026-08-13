import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    // `apps/web` currently has no tests of its own: its only one covered
    // `withLocalePrefix`, which went away with the locale routing. Without this,
    // vitest exits 1 on an empty suite and fails the workspace `pnpm test`.
    // Remove once the Sanity query layer lands and brings tests with it.
    passWithNoTests: true,
  },
});
