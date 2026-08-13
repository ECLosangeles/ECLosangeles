import {
  EVENT_GALLERIES_QUERY,
  EVENT_GALLERY_QUERY,
  EVENT_GALLERY_SLUGS_QUERY,
} from '../sanity/queries';
import { fetchStatic } from '../sanity/fetchStatic';
import type {
  EVENT_GALLERIES_QUERY_RESULT,
  EVENT_GALLERY_QUERY_RESULT,
} from '../sanity/sanity.types';
import { sanityFetch } from '../sanity/live';

export interface GalleryImage {
  /** Sanity CDN URL */
  src: string;
  /** Describes the photo for screen readers — never leave this empty */
  alt: string;
  caption?: string;
  width: number;
  height: number;
  /** Tiny blurred placeholder shown while the full image loads */
  lqip?: string;
}

/** A gallery as shown in a list: no photos, just how many there are. */
export interface EventGallerySummary {
  slug: string;
  title: string;
  /** Human-readable date as the client gave it (not parsed) */
  date?: string;
  description?: string;
  imageCount: number;
}

export interface EventGallery extends Omit<EventGallerySummary, 'imageCount'> {
  images: ReadonlyArray<GalleryImage>;
}

/**
 * Photo galleries for past events, listed under Events → Gallery of Events.
 *
 * A gallery with no photos yet still gets a page showing a "photos coming soon"
 * note, so the nav never points at a dead end while the pictures are collected.
 */
export async function getEventGalleries(): Promise<ReadonlyArray<EventGallerySummary>> {
  const { data } = await sanityFetch({ query: EVENT_GALLERIES_QUERY });

  return ((data ?? []) as EVENT_GALLERIES_QUERY_RESULT)
    .filter((gallery) => gallery.slug && gallery.title)
    .map((gallery) => ({
      slug: gallery.slug!,
      title: gallery.title!,
      ...(gallery.date ? { date: gallery.date } : {}),
      ...(gallery.description ? { description: gallery.description } : {}),
      imageCount: gallery.imageCount ?? 0,
    }));
}

/** Build-time only — see `fetchStatic`. */
export async function getEventGallerySlugs(): Promise<ReadonlyArray<string>> {
  const slugs = await fetchStatic<Array<string | null>>(EVENT_GALLERY_SLUGS_QUERY);
  return slugs.filter((slug): slug is string => Boolean(slug));
}

export async function findGalleryBySlug(slug: string): Promise<EventGallery | undefined> {
  const { data } = await sanityFetch({ query: EVENT_GALLERY_QUERY, params: { slug } });
  const gallery = data as EVENT_GALLERY_QUERY_RESULT;

  if (!gallery?.slug || !gallery.title) return undefined;

  return {
    slug: gallery.slug,
    title: gallery.title,
    ...(gallery.date ? { date: gallery.date } : {}),
    ...(gallery.description ? { description: gallery.description } : {}),
    // A photo with no URL means a broken asset reference; skipping it beats
    // rendering an <Image> that will 404. Dimensions are required by next/image,
    // so anything missing them is skipped too.
    images: (gallery.images ?? [])
      .filter((image) => image.url && image.width && image.height)
      .map((image) => ({
        src: image.url!,
        alt: image.alt ?? '',
        ...(image.caption ? { caption: image.caption } : {}),
        width: image.width!,
        height: image.height!,
        ...(image.lqip ? { lqip: image.lqip } : {}),
      })),
  };
}
