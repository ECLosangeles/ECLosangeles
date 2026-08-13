import {getCliClient} from 'sanity/cli'

/**
 * Populates `homePage.visionStatement`, which no CMS document ever held.
 *
 * The home page has always shown a rotating pair of statements — mission and
 * vision — but only the mission was in Sanity. The vision statement lived in
 * the repo (`apps/web/lib/content/statements.ts`) and the `vision` field in the
 * CMS turned out to be the roadmap strip, which is different copy entirely.
 *
 * The text below is reproduced word for word from `statements.ts`, which in
 * turn reproduces what the client supplied. Do not paraphrase it.
 *
 *   npm run seed:vision
 */
const client = getCliClient({apiVersion: '2026-05-13'})

const VISION_STATEMENT =
  'Our vision is to see Ethiopians in Los Angeles and its surroundings be fully integrated, united, equally addressed, and benefitted from the socio-economic and educational opportunities available in the country while advancing their culture, history and heritage.'

const visionStatement = {
  eyebrow: 'Our vision',
  statement: VISION_STATEMENT,
  tagline: 'Integrated · United · Equally addressed',
}

async function seed() {
  const existing = await client.getDocument('homePage')

  if (!existing) {
    throw new Error('No "homePage" document. Run `npm run migrate:homepage` first.')
  }

  // `setIfMissing` so re-running never overwrites wording an editor has since
  // adjusted in the Studio.
  await client.patch('homePage').setIfMissing({visionStatement}).commit()

  console.log('Set homePage.visionStatement (left alone if it already existed).')
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
