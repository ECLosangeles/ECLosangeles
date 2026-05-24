/**
 * @eclosangeles/content-schema
 *
 * Single source of truth for the shape of content the website renders.
 * Mock data implements these types; later, GraphQL queries against
 * WordPress will return objects matching these types.
 *
 * Token names like `tone` reference values from
 * @eclosangeles/design-tokens (e.g. 'green-500', 'saffron-400').
 */

export type ProgramTone =
  | 'green-500'
  | 'green-600'
  | 'green-700'
  | 'saffron-400'
  | 'saffron-500'
  | 'red-500'
  | 'earth-700';

export interface Program {
  /** URL slug, e.g. "immigration" */
  slug: string;
  /** English title, e.g. "Immigration" */
  title: string;
  /** Single Ge'ez glyph used as the program's icon, e.g. "ሕ" */
  glyph: string;
  /** Optional image icon used on program cards */
  iconSrc?: string;
  /** Accessible label for the optional image icon */
  iconAlt?: string;
  /** Color token used for the glyph badge */
  tone: ProgramTone;
  /** Short description shown on cards (1–2 sentences) */
  summary: string;
  /** Long-form body for the detail page (markdown / rich text) */
  body?: string;
  /** Walk-in clinic info — present on Immigration; null for programs without a clinic */
  walkInClinic?: WalkInClinic | null;
  /** Bullet list of services this program offers */
  helpsWith?: string[];
  /** What attendees should bring to a walk-in or appointment */
  whatToBring?: string;
}

export interface WalkInClinic {
  schedule: string; // e.g. "Tuesdays, 10 AM – 2 PM"
  address: string; // multi-line, supports \n
}

export type EventTagTone = 'green' | 'saffron' | 'red' | 'ink';

export interface EventItem {
  slug: string;
  title: string;
  /** Display date — could be "Annual", "Seasonal", "Sep 28, 2026" */
  date: string;
  location: string;
  /** Optional Ge'ez glyph for the event card photo placeholder */
  glyph?: string;
  /** Background color for the photo block — references a design token */
  bg?: string;
  /** [tone, label] pair shown as a tag on the card */
  tag?: [EventTagTone, string];
  /** Whether this event is visible on the home rail */
  featured?: boolean;
  /** Optional external RSVP URL — placeholder until Phase 7+ */
  rsvpUrl?: string | null;
}

export interface Story {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  authorName?: string;
  publishedAt: string; // ISO date
  featuredImageUrl?: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string;
  headshotUrl?: string;
  emailPublic?: boolean;
  order: number;
}

export interface Value {
  /** Order index — values are numbered 01..08 in the UI */
  order: number;
  /** e.g. "Inclusiveness" */
  name: string;
  /** Optional image used as the value card background */
  imageSrc?: string;
  /** Accessible label for the optional background image */
  imageAlt?: string;
  /** 1-sentence description */
  description: string;
}

export interface PageContent {
  slug: string;
  title: string;
  body: string;
}

export interface TimelineEntry {
  /** Display date, e.g. "Sep 2019" or "Today" */
  date: string;
  /** The narrative for this timeline entry */
  body: string;
}
