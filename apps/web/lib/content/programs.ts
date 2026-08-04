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
    title: 'Immigration Services',
    tone: 'red-500',
    summary: 'Know-your-rights resources, legal guidance, community education.',
    videos: [
      {
        title: 'Know Your Rights',
        url: 'https://www.youtube.com/watch?v=qKoO87lJIxc',
      },
    ],
    // Third-party Know Your Rights guides, published exactly as supplied. They
    // are credited to their authors and must not be edited or excerpted —
    // people rely on the precise wording, and each carries its own legal
    // disclaimer that has to travel with the text.
    documents: [
      {
        src: '/docs/know-your-rights-guide-for-immigrants.pdf',
        title: 'Know Your Rights (KYR): A Guide for Immigrants',
        description:
          'Your rights during an encounter with ICE — at home, at work, in public, during a traffic stop, and if you are detained. Includes how to prepare in advance.',
        source: 'African Communities Together, February 2025',
        pages: 7,
        size: '8.8 MB',
      },
      {
        src: '/docs/know-your-rights-questioned-arrested-detained.pdf',
        title: 'Know Your Rights: If You Are Questioned, Arrested or Detained',
        description:
          'A detailed guide to your rights when stopped by immigration or other law enforcement, what happens in detention, how bond works, and how to find a lawyer.',
        source: 'National Immigration Law Center, January 2025',
        pages: 10,
        size: '256 KB',
      },
    ],
  },
  {
    slug: 'senior-services',
    title: 'Older Adult Services',
    tone: 'earth-700',
    summary: 'Wellness, social inclusion, county-benefits help in Amharic.',
  },
  {
    slug: 'mental-wellbeing',
    title: 'Mental Health Services',
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
