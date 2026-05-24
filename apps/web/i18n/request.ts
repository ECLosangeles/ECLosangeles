import { getRequestConfig } from 'next-intl/server';
import { routing, type Locale } from './routing';

function isSupportedLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (routing.locales as ReadonlyArray<string>).includes(value);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = isSupportedLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
