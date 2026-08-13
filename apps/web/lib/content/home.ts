import type { Program, Value } from '@eclosangeles/content-schema';
import { getPrograms } from './programs';
import { HOME_PAGE_QUERY } from '../sanity/queries';
import type { HOME_PAGE_QUERY_RESULT } from '../sanity/sanity.types';
import { sanityFetch } from '../sanity/live';

/**
 * The home page content, read from Sanity.
 *
 * Every string here reaches the page carrying invisible stega metadata, which
 * is what lets the Studio's Presentation tool map rendered text back to the
 * field that produced it. Do not trim, slice, or re-case these values before
 * rendering — that corrupts the metadata and the click-to-edit overlay stops
 * finding the field.
 */
export interface HomePageContent {
  hero: {
    tagline: string;
    title: string;
    titleEmphasis: string;
    lead: string;
    welcomeChip: string;
    imageSrc: string;
    imageAlt: string;
    ctas: ReadonlyArray<{ label: string; href: string }>;
  };
  /** Mission and vision, rotated through by the home page slider */
  statements: ReadonlyArray<{
    eyebrow: string;
    body: string;
    tagline: string;
  }>;
  programs: {
    eyebrow: string;
    title: string;
    items: ReadonlyArray<Program>;
  };
  values: {
    eyebrow: string;
    title: string;
    items: ReadonlyArray<Value>;
  };
  events: {
    eyebrow: string;
    title: string;
    description: string;
    allEventsLabel: string;
    href: string;
    flyers: ReadonlyArray<{ imageSrc: string; imageAlt?: string; href?: string }>;
  };
  knowYourRights: {
    videos: ReadonlyArray<{ title: string; url: string }>;
  };
  vision: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    href: string;
    items: ReadonlyArray<string>;
  };
  membership: {
    eyebrow: string;
    title: string;
    description: string;
    href: string;
  };
}

/** Every CMS field is nullable, and the components want strings. */
const str = (value: string | null | undefined): string => value ?? '';

type CmsHomePage = NonNullable<HOME_PAGE_QUERY_RESULT>;

/**
 * Builds the mission/vision slider.
 *
 * Reads `visionStatement`, not `vision` — the latter is the roadmap strip
 * further down the page and holds completely different copy. Conflating the two
 * silently drops this slide.
 *
 * A statement with no body is skipped: an empty slide is worse than one fewer.
 */
function toStatements(page: CmsHomePage): HomePageContent['statements'] {
  return [
    {
      eyebrow: str(page.mission?.eyebrow),
      body: str(page.mission?.statement),
      tagline: str(page.mission?.tagline),
    },
    {
      eyebrow: str(page.visionStatement?.eyebrow),
      body: str(page.visionStatement?.statement),
      tagline: str(page.visionStatement?.tagline),
    },
  ].filter((statement) => statement.body !== '');
}

function toValues(page: CmsHomePage): ReadonlyArray<Value> {
  const items = page.values?.items ?? [];

  return items
    .filter((item) => item.name)
    .map((item, index) => ({
      // `order` drives the 01..08 numbering; fall back to document order.
      order: item.order ?? index + 1,
      name: str(item.name),
      description: str(item.description),
    }));
}

function toFlyers(page: CmsHomePage): HomePageContent['events']['flyers'] {
  const flyers = page.events?.flyers ?? [];

  return flyers
    .filter((flyer) => flyer.image?.url)
    .map((flyer) => ({
      imageSrc: flyer.image!.url!,
      imageAlt: str(flyer.image?.alt),
      ...(flyer.href ? { href: flyer.href } : {}),
    }));
}

function toHomePageContent(page: CmsHomePage, programs: ReadonlyArray<Program>): HomePageContent {
  return {
    hero: {
      tagline: str(page.hero?.tagline),
      title: str(page.hero?.title),
      titleEmphasis: str(page.hero?.titleEmphasis),
      lead: str(page.hero?.lead),
      welcomeChip: str(page.hero?.welcomeChip),
      imageSrc: str(page.hero?.image?.url),
      imageAlt: str(page.hero?.image?.alt),
      ctas: (page.hero?.ctas ?? [])
        .filter((cta) => cta.label && cta.href)
        .map((cta) => ({ label: cta.label!, href: cta.href! })),
    },
    statements: toStatements(page),
    programs: {
      eyebrow: str(page.programs?.eyebrow),
      title: str(page.programs?.title),
      items: programs,
    },
    values: {
      eyebrow: str(page.values?.eyebrow),
      title: str(page.values?.title),
      items: toValues(page),
    },
    events: {
      eyebrow: str(page.events?.eyebrow),
      title: str(page.events?.title),
      description: str(page.events?.description),
      allEventsLabel: str(page.events?.allEventsLabel),
      href: str(page.events?.href),
      flyers: toFlyers(page),
    },
    knowYourRights: {
      videos: (page.knowYourRights?.videos ?? [])
        .filter((video) => video.title && video.url)
        .map((video) => ({ title: video.title!, url: video.url! })),
    },
    vision: {
      eyebrow: str(page.vision?.eyebrow),
      title: str(page.vision?.title),
      description: str(page.vision?.description),
      ctaLabel: str(page.vision?.ctaLabel),
      href: str(page.vision?.href),
      items: page.vision?.items ?? [],
    },
    membership: {
      eyebrow: str(page.membership?.eyebrow),
      title: str(page.membership?.title),
      description: str(page.membership?.description),
      href: str(page.membership?.href),
    },
  };
}

/**
 * Loads the home page. Throws if the document is missing, rather than rendering
 * a silently empty page — a blank home page in production is worse than a loud
 * build failure. Run `npm run migrate:homepage` in the Studio if this fires.
 */
export async function getHomePageContent(): Promise<HomePageContent> {
  const [{ data }, programs] = await Promise.all([
    sanityFetch({ query: HOME_PAGE_QUERY }),
    getPrograms(),
  ]);

  if (!data) {
    throw new Error(
      'No "homePage" document found in Sanity. Run `npm run migrate:homepage` in studio-eclosangeles.',
    );
  }

  return toHomePageContent(data, programs);
}

/** The programs section heading plus its cards, for the /programs index. */
export async function getProgramsContent(): Promise<HomePageContent['programs']> {
  const [{ data }, programs] = await Promise.all([
    sanityFetch({ query: HOME_PAGE_QUERY }),
    getPrograms(),
  ]);

  return {
    eyebrow: str(data?.programs?.eyebrow),
    title: str(data?.programs?.title),
    items: programs,
  };
}
