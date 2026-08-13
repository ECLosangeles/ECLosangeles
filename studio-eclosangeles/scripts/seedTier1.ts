import {getCliClient} from 'sanity/cli'

/**
 * Creates the Program, Event Gallery and Story documents from the content that
 * currently lives in the repo (`apps/web/lib/content/`).
 *
 * Uses `createIfNotExists`, so it is safe to re-run and will never overwrite
 * something an editor has changed. To genuinely reset a document, delete it in
 * the Studio first.
 *
 * The Know Your Rights PDFs attached to the Immigration program are
 * deliberately not seeded — they stay in the repo. See `schemaTypes/program.ts`.
 *
 * IMPORTANT: document ids must not contain a dot. A dot makes the id a *path*,
 * and path-prefixed documents (like `drafts.`) are private — they are invisible
 * to unauthenticated reads, which is how the website reads published content.
 * An earlier version of this script used ids like `program.immigration`; every
 * document it created was silently missing from the site. Use hyphens.
 *
 *   npm run seed:tier1
 */
const client = getCliClient({apiVersion: '2026-05-13'})

type Doc = Record<string, unknown> & {_id: string; _type: string}

/**
 * Ids created by the earlier, broken version of this script. They are private
 * and unreachable, so they are removed rather than left as invisible clutter.
 * Safe to delete: they only ever held content copied from the repo.
 */
const UNREACHABLE_DOTTED_IDS = [
  'program.immigration',
  'program.senior-services',
  'program.mental-wellbeing',
  'program.workforce-development',
  'eventGallery.book-signing-june-2022',
  'eventGallery.election-picnic-may-2022',
  'eventGallery.book-signing-2022',
  'eventGallery.marathon',
  'story.walk-in-clinic-tuesday',
  'story.art-and-mind',
  'story.meskel-2025',
]

const slugField = (current: string) => ({_type: 'slug', current})

const programs: Doc[] = [
  {
    _id: 'program-immigration',
    _type: 'program',
    title: 'Immigration Services',
    slug: slugField('immigration'),
    order: 1,
    tone: 'red-500',
    summary: 'Know-your-rights resources, legal guidance, community education.',
    videos: [
      {
        _key: 'kyr-overview',
        title: 'Know Your Rights',
        url: 'https://www.youtube.com/watch?v=qKoO87lJIxc',
      },
    ],
  },
  {
    _id: 'program-senior-services',
    _type: 'program',
    title: 'Older Adult Services',
    slug: slugField('senior-services'),
    order: 2,
    tone: 'earth-700',
    summary: 'Wellness, social inclusion, county-benefits help in Amharic.',
  },
  {
    _id: 'program-mental-wellbeing',
    _type: 'program',
    title: 'Mental Health Services',
    slug: slugField('mental-wellbeing'),
    order: 3,
    tone: 'saffron-500',
    summary: 'Bilingual support, awareness, and community-centered groups.',
  },
  {
    _id: 'program-workforce-development',
    _type: 'program',
    title: 'Workforce Development',
    slug: slugField('workforce-development'),
    order: 4,
    tone: 'green-600',
    summary: 'Job readiness, skills training, and connections to local employers.',
  },
]

// `publishedAt` only controls ordering. The client-supplied display dates are
// kept verbatim in `date`, including the ones that are only a month or a year.
const galleries: Doc[] = [
  {
    _id: 'eventGallery-book-signing-june-2022',
    _type: 'eventGallery',
    title: 'Book Signing June 2022',
    slug: slugField('book-signing-june-2022'),
    date: 'June 2022',
    publishedAt: '2022-06-15T00:00:00Z',
    images: [],
  },
  {
    _id: 'eventGallery-election-picnic-may-2022',
    _type: 'eventGallery',
    title: 'Election Picnic May 14, 2022',
    slug: slugField('election-picnic-may-2022'),
    date: 'May 14, 2022',
    publishedAt: '2022-05-14T00:00:00Z',
    images: [],
  },
  {
    _id: 'eventGallery-book-signing-2022',
    _type: 'eventGallery',
    title: 'Book Signing 2022',
    slug: slugField('book-signing-2022'),
    date: '2022',
    publishedAt: '2022-01-01T00:00:00Z',
    images: [],
  },
  {
    _id: 'eventGallery-marathon',
    _type: 'eventGallery',
    title: 'Marathon',
    slug: slugField('marathon'),
    publishedAt: '2021-01-01T00:00:00Z',
    images: [],
  },
]

/** Wraps a plain paragraph as portable text. */
const paragraph = (text: string, key: string) => [
  {
    _key: key,
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [{_key: `${key}-0`, _type: 'span', text, marks: []}],
  },
]

const stories: Doc[] = [
  {
    _id: 'story-walk-in-clinic-tuesday',
    _type: 'story',
    title: 'Tuesday at the walk-in clinic',
    slug: slugField('walk-in-clinic-tuesday'),
    excerpt:
      'Three families. One pile of paperwork. A volunteer translator who has seen it all before.',
    body: paragraph(
      'Real stories from the immigration walk-in clinic — names changed, details shared with consent. (Placeholder body — actual stories pending.)',
      'intro',
    ),
    publishedAt: '2026-04-21T00:00:00Z',
    authorName: 'ECLA Volunteers',
  },
  {
    _id: 'story-art-and-mind',
    _type: 'story',
    title: 'Art & Mind: a quieter way into mental health',
    slug: slugField('art-and-mind'),
    excerpt:
      'Sometimes the easiest way to talk about how you are doing is to draw it. Inside our art-based mental wellness program.',
    body: paragraph(
      'Placeholder for an upcoming feature on Art & Mind — our art-based mental health meetup. (Body pending.)',
      'intro',
    ),
    publishedAt: '2026-03-12T00:00:00Z',
  },
  {
    _id: 'story-meskel-2025',
    _type: 'story',
    title: 'Meskel 2025 in Little Ethiopia',
    slug: slugField('meskel-2025'),
    excerpt:
      'A community gathering, a bonfire, and three generations passing a single story between them.',
    body: paragraph(
      'Placeholder for an upcoming retrospective on the 2025 Meskel celebration. (Body pending.)',
      'intro',
    ),
    publishedAt: '2025-09-29T00:00:00Z',
    authorName: 'ECLA Community',
  },
]

async function seed() {
  const all = [...programs, ...galleries, ...stories]

  let created = 0
  let skipped = 0

  for (const doc of all) {
    const existing = await client.getDocument(doc._id)
    if (existing) {
      console.log(`skip    ${doc._id} (already exists)`)
      skipped += 1
      continue
    }
    await client.createIfNotExists(doc as never)
    console.log(`created ${doc._id}`)
    created += 1
  }

  console.log(`\n${created} created, ${skipped} left alone.`)

  let removed = 0
  for (const id of UNREACHABLE_DOTTED_IDS) {
    const existing = await client.getDocument(id)
    if (!existing) continue
    await client.delete(id)
    console.log(`removed unreachable ${id}`)
    removed += 1
  }
  if (removed) console.log(`${removed} unreachable dotted-id document(s) removed.`)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
