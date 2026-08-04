import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // English-only for now. The Amharic copy and `messages/am.json` are kept in the
  // repo so 'am' can be added back here without re-translating anything.
  locales: ['en'],
  defaultLocale: 'en',
  // Always include the locale in the URL ("/en/about" not "/about").
  // Makes URLs unambiguous and lets static components use plain `<a href="/en/...">`.
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];
