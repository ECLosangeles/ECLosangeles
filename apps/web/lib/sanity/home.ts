import { defineQuery } from 'groq';
import type { Program, ProgramTone, TimelineEntry, Value } from '@eclosangeles/content-schema';
import type { Locale } from '@/i18n/routing';
import { sanityFetch } from './client';
import { imageUrl } from './image';
import type { HomePageQueryResult } from './sanity.types';

/**
 * Clean, component-ready shape for the home page. This is a *curated view* over
 * the raw CMS data — images resolved to URLs, nulls collapsed to `undefined` — so
 * the UI components get the friendly types they expect. The raw query result is
 * typed by Sanity TypeGen ({@link HomePageQueryResult}); the adapter below is the
 * single place where a schema change shows up as a compile error.
 */
export interface HomePageContent {
  hero?: {
    tagline?: string;
    title?: string;
    titleEmphasis?: string;
    lead?: string;
    welcomeChip?: string;
    imageSrc?: string;
    imageAlt?: string;
    ctas?: ReadonlyArray<{ label: string; href: string }>;
    notes?: ReadonlyArray<{ label: string; body: string }>;
  };
  mission?: {
    eyebrow?: string;
    statement?: string;
    tagline?: string;
  };
  programs?: {
    eyebrow?: string;
    title?: string;
    items?: ReadonlyArray<Program>;
  };
  values?: {
    eyebrow?: string;
    title?: string;
    items?: ReadonlyArray<Value>;
  };
  originStory?: {
    eyebrow?: string;
    title?: string;
    paragraphs?: ReadonlyArray<string>;
    readMoreLabel?: string;
    href?: string;
    timeline?: ReadonlyArray<TimelineEntry>;
  };
  events?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    allEventsLabel?: string;
    href?: string;
    flyers?: ReadonlyArray<{
      imageSrc: string;
      imageAlt?: string;
      href?: string;
    }>;
  };
  knowYourRights?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    videos?: ReadonlyArray<{
      title: string;
      url: string;
    }>;
  };
  vision?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    ctaLabel?: string;
    href?: string;
    items?: ReadonlyArray<string>;
  };
  membership?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    href?: string;
  };
}

/** The raw query result, guaranteed non-null (a missing document is handled earlier). */
type RawHomePage = NonNullable<HomePageQueryResult>;

// Width hints (px) — chosen per usage so we don't ship full-res originals.
const HERO_WIDTH = 1400;
const PROGRAM_ICON_WIDTH = 320;
const VALUE_WIDTH = 800;
const FLYER_WIDTH = 1000;

/** Collapse `null` to `undefined` so optional fields read cleanly downstream. */
function clean<T>(value: T | null | undefined): T | undefined {
  return value ?? undefined;
}

/** Drop array entries whose required string fields are null/empty. */
function presentText(value: string | null | undefined): value is string {
  return typeof value === 'string' && value.length > 0;
}

function isProgramTone(value: string | null | undefined): value is ProgramTone {
  return (
    value === 'green-500' ||
    value === 'green-600' ||
    value === 'green-700' ||
    value === 'saffron-400' ||
    value === 'saffron-500' ||
    value === 'red-500' ||
    value === 'earth-700'
  );
}

function resolveProgram(
  program: NonNullable<NonNullable<RawHomePage['programs']>['items']>[number],
): Program {
  return {
    slug: program.slug?.current as string,
    title: program.title as string,
    glyph: program.glyph ?? '',
    iconSrc: imageUrl(program.icon, PROGRAM_ICON_WIDTH),
    iconAlt: clean(program.icon?.alt),
    tone: isProgramTone(program.tone) ? program.tone : 'green-500',
    summary: program.summary as string,
  };
}

function hasVideos(content: HomePageContent | null): boolean {
  return (content?.knowYourRights?.videos?.length ?? 0) > 0;
}

function hasEventFlyers(content: HomePageContent | null): boolean {
  return (content?.events?.flyers?.length ?? 0) > 0;
}

function withFallbackSharedMedia(
  content: HomePageContent,
  fallback: HomePageContent | null,
): HomePageContent {
  return {
    ...content,
    events:
      hasEventFlyers(content) || !hasEventFlyers(fallback)
        ? content.events
        : {
            ...content.events,
            flyers: fallback?.events?.flyers,
          },
    knowYourRights:
      hasVideos(content) || !hasVideos(fallback)
        ? content.knowYourRights
        : {
            ...content.knowYourRights,
            videos: fallback?.knowYourRights?.videos,
          },
  };
}

// Wrapped in `defineQuery` so Sanity TypeGen can generate `HomePageQueryResult`
// from the schema (run `pnpm typegen` in the Studio after schema/query changes).
const homePageQuery = defineQuery(`*[_type == "homePage" && language == $locale][0]{
  hero{
    tagline,
    title,
    titleEmphasis,
    lead,
    welcomeChip,
    image,
    ctas[]{label, href},
    notes[]{label, body}
  },
  mission{eyebrow, statement, tagline},
  programs{
    eyebrow,
    title,
    items[]{
      slug,
      title,
      glyph,
      icon,
      tone,
      summary
    }
  },
  values{
    eyebrow,
    title,
    items[]{order, name, description, image}
  },
  originStory{
    eyebrow,
    title,
    paragraphs,
    readMoreLabel,
    href,
    timeline[]{date, body}
  },
  events{
    eyebrow,
    title,
    description,
    allEventsLabel,
    href,
    flyers[]{image, href}
  },
  knowYourRights{
    eyebrow,
    title,
    description,
    videos[]{title, url}
  },
  vision{eyebrow, title, description, ctaLabel, href, items},
  membership{eyebrow, title, description, href}
}`);

/** Adapt the raw (all-nullable) query result into the clean component-ready shape. */
function resolveHomePage(raw: RawHomePage): HomePageContent {
  return {
    hero: raw.hero
      ? {
          tagline: clean(raw.hero.tagline),
          title: clean(raw.hero.title),
          titleEmphasis: clean(raw.hero.titleEmphasis),
          lead: clean(raw.hero.lead),
          welcomeChip: clean(raw.hero.welcomeChip),
          imageSrc: imageUrl(raw.hero.image, HERO_WIDTH),
          imageAlt: clean(raw.hero.image?.alt),
          ctas: raw.hero.ctas
            ?.filter((c) => presentText(c.label) && presentText(c.href))
            .map((c) => ({ label: c.label as string, href: c.href as string })),
          notes: raw.hero.notes
            ?.filter((n) => presentText(n.label) && presentText(n.body))
            .map((n) => ({ label: n.label as string, body: n.body as string })),
        }
      : undefined,
    mission: raw.mission
      ? {
          eyebrow: clean(raw.mission.eyebrow),
          statement: clean(raw.mission.statement),
          tagline: clean(raw.mission.tagline),
        }
      : undefined,
    programs: raw.programs
      ? {
          eyebrow: clean(raw.programs.eyebrow),
          title: clean(raw.programs.title),
          items: raw.programs.items
            ?.filter(
              (program) =>
                presentText(program.slug?.current) &&
                presentText(program.title) &&
                presentText(program.summary),
            )
            .map(resolveProgram),
        }
      : undefined,
    values: raw.values
      ? {
          eyebrow: clean(raw.values.eyebrow),
          title: clean(raw.values.title),
          items: raw.values.items
            ?.filter((item) => presentText(item.name))
            .map((item, index) => ({
              order: item.order ?? index + 1,
              name: item.name as string,
              description: item.description ?? '',
              imageSrc: imageUrl(item.image, VALUE_WIDTH),
              imageAlt: clean(item.image?.alt),
            })),
        }
      : undefined,
    originStory: raw.originStory
      ? {
          eyebrow: clean(raw.originStory.eyebrow),
          title: clean(raw.originStory.title),
          paragraphs: raw.originStory.paragraphs?.filter(presentText),
          readMoreLabel: clean(raw.originStory.readMoreLabel),
          href: clean(raw.originStory.href),
          timeline: raw.originStory.timeline
            ?.filter((entry) => presentText(entry.date) || presentText(entry.body))
            .map((entry) => ({ date: entry.date ?? '', body: entry.body ?? '' })),
        }
      : undefined,
    events: raw.events
      ? {
          eyebrow: clean(raw.events.eyebrow),
          title: clean(raw.events.title),
          description: clean(raw.events.description),
          allEventsLabel: clean(raw.events.allEventsLabel),
          href: clean(raw.events.href),
          flyers: raw.events.flyers
            ?.map((flyer) => ({
              imageSrc: imageUrl(flyer.image, FLYER_WIDTH),
              imageAlt: clean(flyer.image?.alt),
              href: clean(flyer.href),
            }))
            // A flyer with no resolvable image can't render — drop it.
            .filter(
              (
                flyer,
              ): flyer is {
                imageSrc: string;
                imageAlt: string | undefined;
                href: string | undefined;
              } => presentText(flyer.imageSrc),
            ),
        }
      : undefined,
    knowYourRights: raw.knowYourRights
      ? {
          eyebrow: clean(raw.knowYourRights.eyebrow),
          title: clean(raw.knowYourRights.title),
          description: clean(raw.knowYourRights.description),
          videos: raw.knowYourRights.videos
            ?.filter((v) => presentText(v.title) && presentText(v.url))
            .map((v) => ({ title: v.title as string, url: v.url as string })),
        }
      : undefined,
    vision: raw.vision
      ? {
          eyebrow: clean(raw.vision.eyebrow),
          title: clean(raw.vision.title),
          description: clean(raw.vision.description),
          ctaLabel: clean(raw.vision.ctaLabel),
          href: clean(raw.vision.href),
          items: raw.vision.items?.filter(presentText),
        }
      : undefined,
    membership: raw.membership
      ? {
          eyebrow: clean(raw.membership.eyebrow),
          title: clean(raw.membership.title),
          description: clean(raw.membership.description),
          href: clean(raw.membership.href),
        }
      : undefined,
  };
}

export async function getHomePageContent(locale: Locale): Promise<HomePageContent | null> {
  const raw = await sanityFetch<RawHomePage>(homePageQuery, { locale }, { tags: ['homePage'] });
  const content = raw ? resolveHomePage(raw) : null;

  if (!content || locale === 'en' || (hasVideos(content) && hasEventFlyers(content))) {
    return content;
  }

  const fallbackRaw = await sanityFetch<RawHomePage>(
    homePageQuery,
    { locale: 'en' },
    { tags: ['homePage'] },
  );

  return withFallbackSharedMedia(content, fallbackRaw ? resolveHomePage(fallbackRaw) : null);
}

export async function getProgramsContent(locale: Locale): Promise<{
  eyebrow?: string;
  title?: string;
  items: ReadonlyArray<Program>;
} | null> {
  const content = await getHomePageContent(locale);
  const programs = content?.programs;

  if (!programs?.items?.length) {
    return null;
  }

  return {
    eyebrow: programs.eyebrow,
    title: programs.title,
    items: programs.items,
  };
}

export async function getProgramBySlug(locale: Locale, slug: string): Promise<Program | null> {
  const programs = await getProgramsContent(locale);
  return programs?.items.find((program) => program.slug === slug) ?? null;
}
