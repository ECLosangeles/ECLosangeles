import type { Story } from '@eclosangeles/content-schema';

export const STORIES: ReadonlyArray<Story> = [
  {
    slug: 'walk-in-clinic-tuesday',
    title: 'Tuesday at the walk-in clinic',
    excerpt:
      'Three families. One pile of paperwork. A volunteer translator who has seen it all before.',
    body: 'Real stories from the immigration walk-in clinic — names changed, details shared with consent. (Placeholder body — actual stories pending.)',
    publishedAt: '2026-04-21',
    authorName: 'ECLA Volunteers',
  },
  {
    slug: 'art-and-mind',
    title: 'Art & Mind: a quieter way into mental health',
    excerpt:
      'Sometimes the easiest way to talk about how you are doing is to draw it. Inside our art-based mental wellness program.',
    body: 'Placeholder for an upcoming feature on Art & Mind — our art-based mental health meetup. (Body pending.)',
    publishedAt: '2026-03-12',
  },
  {
    slug: 'meskel-2025',
    title: 'Meskel 2025 in Little Ethiopia',
    excerpt:
      'A community gathering, a bonfire, and three generations passing a single story between them.',
    body: 'Placeholder for an upcoming retrospective on the 2025 Meskel celebration. (Body pending.)',
    publishedAt: '2025-09-29',
    authorName: 'ECLA Community',
  },
];

export function findStoryBySlug(slug: string): Story | undefined {
  return STORIES.find((s) => s.slug === slug);
}
