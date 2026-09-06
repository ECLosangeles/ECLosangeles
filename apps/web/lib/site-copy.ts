/**
 * Site chrome copy — navigation and footer labels.
 *
 * These strings used to live in `messages/en.json` and were read through
 * `next-intl`. The site is English-only now, so they are plain constants: one
 * less indirection, and no translation runtime for a single locale.
 *
 * This is deliberately *not* CMS-managed. Nav and footer labels change close to
 * never, and routing them through Sanity would mean a network read on every
 * page render for content that is effectively part of the layout.
 */

export const NAV_COPY = {
  about: 'About',
  board: 'Our board',
  annualReports: 'Annual reports',
  bylaws: 'Bylaws',
  financials: 'Financials',
  programs: 'What we do',
  mediaGallery: 'Media Gallery',
  events: 'Events',
  videos: 'Videos',
  donate: 'Donate',
  membership: 'Become a member',
  volunteer: 'Become a volunteer',
} as const;

export const FOOTER_COPY = {
  /**
   * Paired with the Amharic greeting in the layout. The Amharic here is brand
   * identity for an Ethiopian community organisation — it is not a translation
   * and does not come back when/if a second locale is added.
   */
  welcome: 'Welcome',
  rights: '501(c)(3) nonprofit · Founded 2019',
} as const;
