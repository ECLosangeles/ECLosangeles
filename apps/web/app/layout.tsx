import { Fraunces, Inter } from 'next/font/google';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import { Footer, type HeaderNavItem } from '@eclosangeles/ui';
import { SiteHeader } from '@/components/SiteHeader';
import { EVENT_GALLERIES, PROGRAMS } from '@/lib/content';
import { FOOTER_COPY, NAV_COPY } from '@/lib/site-copy';
import './globals.css';

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

/**
 * Used for the Amharic glyphs that appear as brand furniture (the footer
 * greeting, the bilingual logo). Kept even though the site is English-only.
 */
const amharicFont = localFont({
  src: './fonts/NokiaPureHeadline.ttf',
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

const nav: ReadonlyArray<HeaderNavItem> = [
  {
    key: 'about',
    label: NAV_COPY.about,
    href: '/about',
    children: [
      { label: NAV_COPY.annualReports, href: '/about/annual-reports' },
      { label: NAV_COPY.bylaws, href: '/about/bylaws' },
      { label: NAV_COPY.financials, href: '/about/financials' },
    ],
  },
  {
    key: 'programs',
    label: NAV_COPY.programs,
    href: '/programs',
    // Driven off the program list itself, so adding or retiring a program
    // updates the nav without a second edit here.
    children: PROGRAMS.map((program) => ({
      label: program.title,
      href: `/programs/${program.slug}`,
    })),
  },
  {
    key: 'events',
    label: NAV_COPY.events,
    href: '/events',
    children: [
      {
        label: NAV_COPY.galleryOfEvents,
        href: '/events/gallery',
        // Each past-event gallery gets its own entry in the side flyout.
        children: EVENT_GALLERIES.map((gallery) => ({
          label: gallery.title,
          href: `/events/gallery/${gallery.slug}`,
        })),
      },
    ],
  },
  { key: 'stories', label: NAV_COPY.stories, href: '/stories' },
  { key: 'membership', label: NAV_COPY.membership, href: '/membership' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${amharicFont.variable}`}>
      <body>
        <SiteHeader nav={nav} homeHref="/" />
        {children}
        <Footer
          welcomeText={`እንኳን ደና መጣችሁ · ${FOOTER_COPY.welcome}`}
          rightsTagline={FOOTER_COPY.rights}
        />
      </body>
    </html>
  );
}
