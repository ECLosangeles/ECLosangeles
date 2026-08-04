import type { Program } from '@eclosangeles/content-schema';

/**
 * ECLA's four official program areas.
 *
 * This list is authoritative — the client confirmed these four and retired the
 * earlier set (child & parent, youth, medical health, social & cultural). Adding
 * a program here is all that's needed for it to appear on the home grid, the
 * /programs index, and its own detail route.
 */
export const PROGRAMS: ReadonlyArray<Program> = [
  {
    slug: 'immigration',
    title: 'Immigration',
    tone: 'red-500',
    summary: 'Know-your-rights resources, legal guidance, community education.',
  },
  {
    slug: 'senior-services',
    title: 'Senior services',
    tone: 'earth-700',
    summary: 'Wellness, social inclusion, county-benefits help in Amharic.',
  },
  {
    slug: 'mental-wellbeing',
    title: 'Mental Wellbeing',
    tone: 'saffron-500',
    summary: 'Bilingual support, awareness, and community-centered groups.',
  },
  {
    slug: 'workforce-development',
    title: 'Workforce Development',
    tone: 'green-600',
    summary: 'Job readiness, skills training, and connections to local employers.',
  },
];

export function findProgramBySlug(slug: string): Program | undefined {
  return PROGRAMS.find((program) => program.slug === slug);
}
