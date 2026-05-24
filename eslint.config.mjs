import js from '@eslint/js';
import tseslint from 'typescript-eslint';

/**
 * Shared flat config for the workspace packages (ui, content-schema, design-tokens).
 *
 * `apps/web` lints via `next lint` (its own .eslintrc.json) and `studio-eclosangeles`
 * ships its own Sanity config, so both are ignored here to avoid double-linting.
 */
export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/.next/**',
      '**/.next-dev/**',
      '**/node_modules/**',
      'apps/**',
      'studio-eclosangeles/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // TypeScript already resolves identifiers; no-undef only produces false
      // positives on DOM/Node globals inside .ts/.tsx sources.
      'no-undef': 'off',
    },
  },
);
