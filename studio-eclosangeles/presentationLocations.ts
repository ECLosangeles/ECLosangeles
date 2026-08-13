import {defineLocations} from 'sanity/presentation'
import type {PresentationPluginOptions} from 'sanity/presentation'

/**
 * Tells the Presentation tool which website pages each document appears on.
 *
 * Without this, opening a document gives the editor no way to jump to the page
 * it affects — they have to guess the URL. With it, the Studio shows a
 * "Used on" list they can click straight through to.
 */
export const locations: NonNullable<PresentationPluginOptions['resolve']>['locations'] = {
  homePage: defineLocations({
    locations: [{title: 'Home', href: '/'}],
  }),

  program: defineLocations({
    select: {title: 'title', slug: 'slug.current'},
    resolve: (doc) => ({
      locations: [
        {title: doc?.title || 'Program', href: `/programs/${doc?.slug}`},
        {title: 'All programs', href: '/programs'},
        {title: 'Home', href: '/'},
      ],
    }),
  }),

  eventGallery: defineLocations({
    select: {title: 'title', slug: 'slug.current'},
    resolve: (doc) => ({
      locations: [
        {title: doc?.title || 'Gallery', href: `/events/gallery/${doc?.slug}`},
        {title: 'Gallery of Events', href: '/events/gallery'},
      ],
    }),
  }),

  story: defineLocations({
    select: {title: 'title'},
    // No story detail route exists yet — the listing is the only place a story
    // appears. Add its own location here when that route lands.
    resolve: () => ({
      locations: [{title: 'Our stories', href: '/stories'}],
    }),
  }),
}
