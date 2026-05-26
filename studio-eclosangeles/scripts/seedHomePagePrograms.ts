import {createReadStream} from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'
import {PROGRAMS} from './programData'

type UploadedImage = {
  _id: string
}

const client = getCliClient({apiVersion: '2026-05-13'})
const webPublicDir = path.resolve(process.cwd(), '..', 'apps', 'web', 'public')

async function uploadImage(relativePath: string) {
  const filename = path.basename(relativePath)
  const filePath = path.join(webPublicDir, relativePath)
  const asset = (await client.assets.upload('image', createReadStream(filePath), {
    filename,
    source: {
      name: 'ECLA website program seed',
      id: relativePath,
    },
  })) as UploadedImage

  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  }
}

async function buildProgramItems() {
  return Promise.all(
    PROGRAMS.map(async (program) => {
      const icon = await uploadImage(program.iconPath)

      return {
        _key: program.slug,
        title: program.title,
        slug: {_type: 'slug', current: program.slug},
        summary: program.summary,
        glyph: program.glyph,
        tone: program.tone,
        icon: {...icon, alt: program.iconAlt},
      }
    }),
  )
}

async function seed() {
  const items = await buildProgramItems()
  const programs = {
    eyebrow: 'What we do',
    title: 'Programs that meet you where you are.',
    items,
  }

  for (const locale of ['en', 'am']) {
    await client.patch(`homePage-${locale}`).set({programs}).commit()
    console.log(`Seeded homePage-${locale}.programs`)
  }
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
