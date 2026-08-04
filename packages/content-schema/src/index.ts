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
  /** Color token identifying the program on its card — no icon art is used */
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
  /** PDFs shown on the program's page, exactly as supplied */
  documents?: ReadonlyArray<ProgramDocument>;
  /** Videos embedded on the program's page */
  videos?: ReadonlyArray<ProgramVideo>;
}

export interface ProgramVideo {
  /** Title shown under the player */
  title: string;
  /** Full watch URL — youtube.com/watch?v=…, youtu.be/…, or /shorts/… */
  url: string;
}

export interface ProgramDocument {
  /** Path under `public/`, e.g. "/docs/know-your-rights.pdf" */
  src: string;
  /** Title shown above the viewer and used as the link label */
  title: string;
  /** One-line summary of what the document covers */
  description?: string;
  /** Who produced it — these are third-party resources and must be credited */
  source?: string;
  /** Page count, shown so readers know the length before opening */
  pages?: number;
  /** Human-readable download size, e.g. "8.8 MB" */
  size?: string;
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
