import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'am'],
  defaultLocale: 'en',
  // Always include the locale in the URL ("/en/about" not "/about").
  // Makes URLs unambiguous and lets static components use plain `<a href="/en/...">`.
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];
