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
