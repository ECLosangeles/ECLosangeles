export interface GalleryImage {
  /** Path under /public, e.g. "/gallery/marathon/01.jpg" */
  src: string;
  /** Describes the photo for screen readers — never leave this empty */
  alt: string;
  caption?: string;
}

export interface EventGallery {
  slug: string;
  title: string;
  /** Human-readable date as the client gave it (not parsed) */
  date?: string;
  description?: string;
  images: ReadonlyArray<GalleryImage>;
}

/**
 * Photo galleries for past events, listed under Events → Gallery of Events.
 *
 * Each gallery's `images` list is filled in as the photos arrive; a gallery with
 * no photos yet still gets its page and shows a "photos coming soon" note, so
 * the nav never points at a dead end.
 */
export const EVENT_GALLERIES: ReadonlyArray<EventGallery> = [
  {
    slug: 'book-signing-june-2022',
    title: 'Book Signing June 2022',
    date: 'June 2022',
    images: [],
  },
  {
    slug: 'election-picnic-may-2022',
    title: 'Election Picnic May 14, 2022',
    date: 'May 14, 2022',
    images: [],
  },
  {
    slug: 'book-signing-2022',
    title: 'Book Signing 2022',
    date: '2022',
    images: [],
  },
  {
    slug: 'marathon',
    title: 'Marathon',
    images: [],
  },
];

export function findGalleryBySlug(slug: string): EventGallery | undefined {
  return EVENT_GALLERIES.find((gallery) => gallery.slug === slug);
}
