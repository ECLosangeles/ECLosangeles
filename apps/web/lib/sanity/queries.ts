import { defineQuery } from 'next-sanity';

/**
 * The home page document.
 *
 * Loaded by its fixed id rather than `*[_type == "homePage"][0]`. The dataset
 * still holds retired documents of the same type (see `studio-eclosangeles/legacy/`),
 * and an unanchored query could serve one of those at random.
 *
 * Images resolve to a URL and dimensions here so pages don't each rebuild the
 * same asset plumbing; `asset->` follows the reference to the asset document.
 */
export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0]{
    hero{
      tagline,
      title,
      titleEmphasis,
      lead,
      welcomeChip,
      ctas[]{label, href},
      image{
        alt,
        "url": asset->url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height
      }
    },
    mission{eyebrow, statement, tagline},
    visionStatement{eyebrow, statement, tagline},
    // Only the section heading. The program cards themselves still come from
    // the repo — the detail pages need fields the CMS has no home for yet.
    programs{eyebrow, title},
    values{
      eyebrow,
      title,
      // Value images exist in the schema but the UI does not render them,
      // so they are deliberately not fetched.
      items[]{order, name, description}
    },
    events{
      eyebrow,
      title,
      description,
      allEventsLabel,
      href,
      flyers[]{
        href,
        image{
          alt,
          "url": asset->url,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height
        }
      }
    },
    knowYourRights{
      eyebrow,
      title,
      description,
      videos[]{title, url}
    },
    // The roadmap strip lower down the page — NOT the formal vision statement,
    // which lives in \`visionStatement\` above.
    vision{eyebrow, title, description, ctaLabel, href, items},
    membership{eyebrow, title, description, href}
  }
`);

/** Programs, in display order. Used by the nav, the home grid and /programs. */
export const PROGRAMS_QUERY = defineQuery(`
  *[_type == "program" && defined(slug.current)] | order(order asc){
    "slug": slug.current,
    title,
    order,
    tone,
    summary,
    body,
    helpsWith,
    whatToBring,
    walkInClinic{schedule, address},
    videos[]{title, url}
  }
`);

/** A single program's detail page. */
export const PROGRAM_QUERY = defineQuery(`
  *[_type == "program" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    tone,
    summary,
    body,
    helpsWith,
    whatToBring,
    walkInClinic{schedule, address},
    videos[]{title, url}
  }
`);

/**
 * Galleries for the index page and the Events nav flyout.
 *
 * Only the photo count is fetched, not the photos — these lists show a count,
 * and a gallery can hold a lot of images.
 */
export const EVENT_GALLERIES_QUERY = defineQuery(`
  *[_type == "eventGallery" && defined(slug.current)] | order(publishedAt desc){
    "slug": slug.current,
    title,
    date,
    description,
    "imageCount": count(images)
  }
`);

export const EVENT_GALLERY_QUERY = defineQuery(`
  *[_type == "eventGallery" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    date,
    description,
    images[]{
      alt,
      caption,
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "lqip": asset->metadata.lqip
    }
  }
`);

/**
 * Slugs only, for `generateStaticParams`. Enumerating routes does not need the
 * whole document, and this runs at build time for every route.
 */
export const PROGRAM_SLUGS_QUERY = defineQuery(`
  *[_type == "program" && defined(slug.current)].slug.current
`);

export const EVENT_GALLERY_SLUGS_QUERY = defineQuery(`
  *[_type == "eventGallery" && defined(slug.current)].slug.current
`);

export const STORIES_QUERY = defineQuery(`
  *[_type == "story" && defined(slug.current)] | order(publishedAt desc){
    "slug": slug.current,
    title,
    excerpt,
    publishedAt,
    authorName
  }
`);
