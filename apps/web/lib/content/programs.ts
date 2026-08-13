import type { Program, ProgramDocument } from '@eclosangeles/content-schema';
import { PROGRAMS_QUERY, PROGRAM_QUERY, PROGRAM_SLUGS_QUERY } from '../sanity/queries';
import { fetchStatic } from '../sanity/fetchStatic';
import type { PROGRAMS_QUERY_RESULT, PROGRAM_QUERY_RESULT } from '../sanity/sanity.types';
import { sanityFetch } from '../sanity/live';

/**
 * Third-party Know Your Rights guides, published exactly as supplied.
 *
 * These stay in the repo rather than the CMS on purpose. They are credited to
 * their authors and must not be edited or excerpted — people rely on the
 * precise wording, and each carries its own legal disclaimer that has to travel
 * with the text. Keeping them here means changing one needs a code review
 * rather than a Studio session.
 *
 * Keyed by program slug; the loaders below merge them into the CMS content.
 */
const PROGRAM_DOCUMENTS: Readonly<Record<string, ReadonlyArray<ProgramDocument>>> = {
  immigration: [
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
};

type CmsProgram = NonNullable<PROGRAM_QUERY_RESULT>;

/**
 * Maps a CMS program onto the shape the UI renders, attaching any repo-held
 * documents for that slug.
 *
 * `tone` is validated against a fixed list in the schema, but the generated
 * type is a plain string, so it is narrowed here rather than asserted blindly —
 * an unrecognised value falls back to the default rather than emitting a class
 * name that matches no design token.
 */
function toProgram(program: CmsProgram): Program {
  const slug = program.slug ?? '';

  return {
    slug,
    title: program.title ?? '',
    tone: toTone(program.tone),
    summary: program.summary ?? '',
    ...(program.body ? { body: program.body } : {}),
    ...(program.helpsWith?.length ? { helpsWith: [...program.helpsWith] } : {}),
    ...(program.whatToBring ? { whatToBring: program.whatToBring } : {}),
    ...(program.walkInClinic?.schedule && program.walkInClinic.address
      ? {
          walkInClinic: {
            schedule: program.walkInClinic.schedule,
            address: program.walkInClinic.address,
          },
        }
      : {}),
    ...(program.videos?.length
      ? {
          videos: program.videos
            .filter((video) => video.title && video.url)
            .map((video) => ({ title: video.title!, url: video.url! })),
        }
      : {}),
    ...(PROGRAM_DOCUMENTS[slug] ? { documents: PROGRAM_DOCUMENTS[slug] } : {}),
  };
}

const TONES = [
  'green-500',
  'green-600',
  'green-700',
  'saffron-400',
  'saffron-500',
  'red-500',
  'earth-700',
] as const satisfies ReadonlyArray<Program['tone']>;

function toTone(value: string | null): Program['tone'] {
  return (TONES as ReadonlyArray<string>).includes(value ?? '')
    ? (value as Program['tone'])
    : 'green-500';
}

export async function getPrograms(): Promise<ReadonlyArray<Program>> {
  const { data } = await sanityFetch({ query: PROGRAMS_QUERY });
  return ((data ?? []) as PROGRAMS_QUERY_RESULT).map(toProgram);
}

/** Build-time only — see `fetchStatic`. */
export async function getProgramSlugs(): Promise<ReadonlyArray<string>> {
  const slugs = await fetchStatic<Array<string | null>>(PROGRAM_SLUGS_QUERY);
  return slugs.filter((slug): slug is string => Boolean(slug));
}

export async function findProgramBySlug(slug: string): Promise<Program | undefined> {
  const { data } = await sanityFetch({ query: PROGRAM_QUERY, params: { slug } });
  return data ? toProgram(data) : undefined;
}
