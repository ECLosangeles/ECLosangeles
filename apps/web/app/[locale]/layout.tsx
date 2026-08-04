import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Fraunces, Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Footer, type HeaderNavItem } from '@eclosangeles/ui';
import { SiteHeader } from '@/components/SiteHeader';
import { PROGRAMS } from '@/lib/content';
import { routing, type Locale } from '@/i18n/routing';
import '../globals.css';

function isSupportedLocale(value: string): value is Locale {
  return (routing.locales as ReadonlyArray<string>).includes(value);
}

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const amharicFont = localFont({
  src: '../fonts/NokiaPureHeadline.ttf',
  weight: '400',
  variable: '--font-amharic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ECLA — Ethiopian Community Los Angeles',
    template: '%s · ECLA',
  },
  description:
    'A trusted neighbor for Ethiopian families across Greater Los Angeles. ECLA is a 501(c)(3) civic nonprofit serving the social, economic, educational, health, immigration, and cultural needs of our community.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  setRequestLocale(locale);

  const tNav = await getTranslations({ locale, namespace: 'Nav' });
  const tFooter = await getTranslations({ locale, namespace: 'Footer' });
  const messages = await getMessages();

  const nav: ReadonlyArray<HeaderNavItem> = [
    {
      key: 'about',
      label: tNav('about'),
      href: `/${locale}/about`,
      children: [
        { label: tNav('annualReports'), href: `/${locale}/about/annual-reports` },
        { label: tNav('bylaws'), href: `/${locale}/about/bylaws` },
        { label: tNav('financials'), href: `/${locale}/about/financials` },
      ],
    },
    {
      key: 'programs',
      label: tNav('programs'),
      href: `/${locale}/programs`,
      // Driven off the program list itself, so adding or retiring a program
      // updates the nav without a second edit here.
      children: PROGRAMS.map((program) => ({
        label: program.title,
        href: `/${locale}/programs/${program.slug}`,
      })),
    },
    { key: 'events', label: tNav('events'), href: `/${locale}/events` },
    { key: 'stories', label: tNav('stories'), href: `/${locale}/stories` },
    { key: 'membership', label: tNav('membership'), href: `/${locale}/membership` },
  ];

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${inter.variable} ${amharicFont.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <SiteHeader nav={nav} homeHref={`/${locale}`} />
          {children}
          <Footer
            linkPrefix={`/${locale}`}
            welcomeText={`እንኳን ደና መጣችሁ · ${tFooter('welcome')}`}
            rightsTagline={tFooter('rights')}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
