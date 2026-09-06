import { Fraunces, Inter } from 'next/font/google';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import { Footer, type HeaderNavItem } from '@eclosangeles/ui';
import { Suspense } from 'react';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteMotifs } from '@/components/SiteMotifs';
import { VisitCounter } from '@/components/VisitCounter';
import { VisualEditingBridge } from '@/components/VisualEditingBridge';
import { getEventGalleries, getPrograms } from '@/lib/content';
import { FOOTER_COPY, NAV_COPY } from '@/lib/site-copy';
import { SanityLive } from '@/lib/sanity/live';
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

/**
 * The nav is partly CMS-driven: adding a program or an event gallery in the
 * Studio puts it in the menu without a code change.
 */
async function buildNav(): Promise<ReadonlyArray<HeaderNavItem>> {
  const [programs, galleries] = await Promise.all([getPrograms(), getEventGalleries()]);

  return [
    {
      key: 'about',
      label: NAV_COPY.about,
      href: '/about',
      children: [
        { label: NAV_COPY.board, href: '/about/board' },
        { label: NAV_COPY.annualReports, href: '/about/annual-reports' },
        { label: NAV_COPY.bylaws, href: '/about/bylaws' },
        { label: NAV_COPY.financials, href: '/about/financials' },
      ],
    },
    {
      key: 'programs',
      label: NAV_COPY.programs,
      href: '/programs',
      children: programs.map((program) => ({
        label: program.title,
        href: `/programs/${program.slug}`,
      })),
    },
    {
      key: 'events',
      label: NAV_COPY.mediaGallery,
      href: '/events',
      children: [
        {
          label: NAV_COPY.events,
          href: '/events/gallery',
          // Each past-event gallery gets its own entry in the side flyout.
          children: galleries.map((gallery) => ({
            label: gallery.title,
            href: `/events/gallery/${gallery.slug}`,
          })),
        },
        { label: NAV_COPY.videos, href: '/events/videos' },
      ],
    },
    { key: 'donate', label: NAV_COPY.donate, href: '/donate' },
    { key: 'membership', label: NAV_COPY.membership, href: '/membership' },
    { key: 'volunteer', label: NAV_COPY.volunteer, href: '/volunteer' },
  ];
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = await buildNav();

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${amharicFont.variable}`}>
      <body>
        <SiteHeader nav={nav} homeHref="/" />
        {/* The motif layer is positioned against this wrapper, so it spans the
            whole page rather than the viewport and scrolls with the content. */}
        <div className="pageShell">
          <SiteMotifs />
          {children}
        </div>
        <Footer
          welcomeText={`እንኳን ደና መጣችሁ · ${FOOTER_COPY.welcome}`}
          rightsTagline={FOOTER_COPY.rights}
          meta={<VisitCounter />}
        />
        {/* Keeps content read through `sanityFetch` up to date, and streams
            edits into the Presentation tool's preview as they are typed. */}
        <SanityLive />
        <Suspense fallback={null}>
          <VisualEditingBridge />
        </Suspense>
      </body>
    </html>
  );
}
