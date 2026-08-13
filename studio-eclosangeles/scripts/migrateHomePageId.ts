import {getCliClient} from 'sanity/cli'

/**
 * One-time migration: copy `homePage-en` to the plain `homePage` id.
 *
 * The `-en` suffix was required by the Document Internationalization plugin.
 * With the site English-only, the website loads a single fixed `homePage`
 * document instead.
 *
 * This copies the *live* content rather than re-seeding from the hardcoded
 * script, so anything editors changed since the original seed is preserved.
 *
 * Nothing is deleted. `homePage-en` stays exactly where it is — see
 * `legacy/README.md` for why. Safe to re-run: it will simply overwrite
 * `homePage` with the current `homePage-en` content again, so don't run it
 * after editors have started working in the new document.
 *
 *   npm run migrate:homepage
 */
const client = getCliClient({apiVersion: '2026-05-13'})

const SOURCE_ID = 'homePage-en'
const TARGET_ID = 'homePage'

async function migrate() {
  const source = await client.getDocument(SOURCE_ID)

  if (!source) {
    throw new Error(
      `No document with id "${SOURCE_ID}" in this dataset. ` +
        `If the migration already ran, "${TARGET_ID}" should exist — check the Studio.`,
    )
  }

  const existing = await client.getDocument(TARGET_ID)
  if (existing) {
    console.warn(
      `"${TARGET_ID}" already exists (last updated ${existing._updatedAt}).\n` +
        `Overwriting it with the contents of "${SOURCE_ID}".\n` +
        `If editors have already worked in it, stop now — those edits will be lost.`,
    )
  }

  // Drop the system fields and the plugin-managed `language` field. `_id` is
  // replaced; the rest are re-derived by the API on write.
  const {
    _id: _ignoredId,
    _rev: _ignoredRev,
    _createdAt: _ignoredCreatedAt,
    _updatedAt: _ignoredUpdatedAt,
    language: _ignoredLanguage,
    ...content
  } = source as Record<string, unknown> & {_id: string}

  await client.createOrReplace({...content, _id: TARGET_ID, _type: 'homePage'})

  console.log(`Copied "${SOURCE_ID}" -> "${TARGET_ID}".`)
  console.log(`"${SOURCE_ID}" was left untouched.`)
}

migrate().catch((error) => {
  console.error(error)
  process.exit(1)
})
