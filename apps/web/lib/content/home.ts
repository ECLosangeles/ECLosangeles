import type { Program, Value } from '@eclosangeles/content-schema';
import { PROGRAMS, findProgramBySlug } from './programs';
import { MISSION_STATEMENT, VISION_STATEMENT } from './statements';
import { VALUES } from './values';
import { VISION_ITEMS } from './vision';

/**
 * The home page content, held in the repo.
 *
 * This replaces the former Sanity-backed data layer: the copy below was ported
 * verbatim out of the `homePage-en` document before the CMS was detached, so
 * nothing that was live has been lost. Editing the site now means editing this
 * file — there is no external content source to keep in sync.
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

export const HOME_PAGE: HomePageContent = {
  hero: {
    tagline: 'Serving Greater LA since 2019',
    title: 'A trusted neighbor for Ethiopian families across',
    titleEmphasis: 'Greater Los Angeles',
    lead: "An inclusive, nonpolitical, nonreligious civic organization — supporting our community's social, economic, educational, health, and cultural needs.",
    welcomeChip: 'Welcome',
    imageSrc: '/brand/hero.png',
    imageAlt: 'Ethiopian Community Los Angeles members gathered together',
    ctas: [
      { label: 'Donate', href: '/donate' },
      { label: 'Become a member', href: '/membership' },
      { label: 'Volunteer', href: '/about' },
      { label: 'Get services →', href: '/programs' },
    ],
  },
  statements: [
    {
      eyebrow: 'Our mission',
      body: MISSION_STATEMENT,
      tagline: 'Inclusive · Nonpolitical · Nonreligious',
    },
    {
      eyebrow: 'Our vision',
      body: VISION_STATEMENT,
      tagline: 'Integrated · United · Equally addressed',
    },
  ],
  programs: {
    eyebrow: 'What we do',
    title: 'Programs that meet you where you are.',
    items: PROGRAMS,
  },
  values: {
    eyebrow: 'What we stand for',
    title: 'Eight values, lived — not laminated.',
    items: VALUES,
  },
  events: {
    eyebrow: 'Community events',
    title: "What's happening at ECLA",
    description:
      'Coffee mornings, book signings, festivals, conferences, galas — community life happens in person.',
    allEventsLabel: 'All events →',
    href: '/events',
    flyers: [
      { imageSrc: '/brand/flyers/flyer-1.png' },
      { imageSrc: '/brand/flyers/flyer-2.png' },
      { imageSrc: '/brand/flyers/flyer-3.png' },
      { imageSrc: '/brand/flyers/flyer-4.png' },
      { imageSrc: '/brand/flyers/flyer-5.png' },
    ],
  },
  knowYourRights: {
    videos: [
      {
        title: 'Know Your Rights (Tigrinya) | መሰላትካ ፍለጥ',
        url: 'https://www.youtube.com/watch?v=sjbXyPY6cuo',
      },
      {
        title: 'Know Your Rights (Afaan Oromo) | Mirga Kee Beeki',
        url: 'https://www.youtube.com/watch?v=7Cf1gUC6udo',
      },
      {
        title: 'Know Your Rights (Amharic) | መብትህን እወቅ',
        url: 'https://www.youtube.com/watch?v=56lxEiqtjMU',
      },
    ],
  },
  vision: {
    eyebrow: 'Our vision',
    title: 'Integration, unity and equality.',
    description: VISION_STATEMENT,
    ctaLabel: 'Get involved →',
    href: '/membership',
    items: VISION_ITEMS,
  },
  membership: {
    eyebrow: 'Membership',
    title: 'Join us. The community runs on its members.',
    description:
      'Members vote on board elections, get a say in priorities, and help fund every program ECLA runs.',
    href: '/membership',
  },
};

export function getHomePageContent(): HomePageContent {
  return HOME_PAGE;
}

export function getProgramsContent(): HomePageContent['programs'] {
  return HOME_PAGE.programs;
}

export function getProgramBySlug(slug: string): Program | undefined {
  return findProgramBySlug(slug);
}
