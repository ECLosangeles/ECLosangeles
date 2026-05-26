import {createReadStream} from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'

type UploadedImage = {
  _id: string
}

type ProgramSeed = {
  slug: string
  title: string
  glyph: string
  iconPath: string
  iconAlt: string
  tone: string
  summary: string
  body: string
  helpsWith: string[]
  whatToBring?: string
  walkInClinic?: {
    schedule: string
    address: string
  }
}

const client = getCliClient({apiVersion: '2026-05-13'})
const webPublicDir = path.resolve(process.cwd(), '..', 'apps', 'web', 'public')

const PROGRAMS: ProgramSeed[] = [
  {
    slug: 'child-parent',
    title: 'Child & Parent',
    glyph: 'áˆ',
    iconPath: 'brand/childnparent.png',
    iconAlt: 'Child and parent support icon',
    tone: 'green-500',
    summary: 'Family preparedness, parenting resources, know-your-rights cards.',
    body: "Parenting in a new country is hard. ECLA's Child & Parent program connects Ethiopian families to school enrollment guidance, family preparedness materials, and culturally grounded parenting workshops in Amharic and English.",
    helpsWith: [
      'School enrollment paperwork and translation',
      'Family preparedness plans (immigration, emergency)',
      'Parenting workshops in Amharic',
      'Connections to youth and senior programs',
    ],
  },
  {
    slug: 'youth',
    title: 'Youth',
    glyph: 'á‹ˆ',
    iconPath: 'brand/youth.png',
    iconAlt: 'Youth program icon',
    tone: 'saffron-400',
    summary: 'Mentorship, college guidance, STEM direction, community involvement.',
    body: 'ECLA youth programs pair young Ethiopian-Americans with mentors who share their background - supporting them through college applications, STEM exploration, and community leadership.',
    helpsWith: [
      'College application support and counseling',
      'STEM mentorship and lab access',
      'Community service hours and leadership opportunities',
      'Cultural connection through youth gatherings',
    ],
  },
  {
    slug: 'senior-services',
    title: 'Senior services',
    glyph: 'áŠ ',
    iconPath: 'brand/seniorservices.png',
    iconAlt: 'Senior services icon',
    tone: 'earth-700',
    summary: 'Wellness, social inclusion, county-benefits help in Amharic.',
    body: 'Our senior program centers wellness, dignity, and Amharic-language access to the benefits older community members have earned. Bilingual help with Medicare, IHSS, and county social services.',
    helpsWith: [
      'Medicare enrollment and questions',
      'In-Home Supportive Services (IHSS)',
      'Wellness check-ins and social meetups',
      'Bilingual translation for medical appointments',
    ],
  },
  {
    slug: 'immigration',
    title: 'Immigration',
    glyph: 'áˆ•',
    iconPath: 'brand/immigration.png',
    iconAlt: 'Immigration support icon',
    tone: 'red-500',
    summary: 'Know-your-rights resources, legal guidance, community education.',
    body: 'Free, pro-bono, bilingual help with immigration paperwork - in Amharic or English. No appointment required for our weekly walk-in clinic.',
    walkInClinic: {
      schedule: 'Tuesdays, 10 AM - 2 PM',
      address: '8911 S Western Ave\nLos Angeles, CA 90047',
    },
    helpsWith: [
      'Green-card and residency paperwork',
      'Citizenship applications and study materials',
      'Work-authorization renewals',
      'Family reunification petitions',
      'Translation of supporting documents',
    ],
    whatToBring:
      "Any official documents you've received (in any language), a photo ID, and the questions you've been losing sleep over. We'll figure the rest out together.",
  },
  {
    slug: 'medical-health',
    title: 'Medical health',
    glyph: 'áŒ¤',
    iconPath: 'brand/medicalhealth.png',
    iconAlt: 'Medical health icon',
    tone: 'green-600',
    summary: 'Public health workshops, bilingual health panels, clinic referrals.',
    body: 'Bilingual public-health workshops, clinic referrals, and connections to community health workers - built around what community members actually ask about.',
    helpsWith: [
      'Bilingual health panels and workshops',
      'Referrals to community clinics',
      'Vaccination and screening drives',
      'Translation support at appointments',
    ],
  },
  {
    slug: 'mental-health',
    title: 'Mental health',
    glyph: 'áˆµ',
    iconPath: 'brand/mentalhealth.png',
    iconAlt: 'Mental health icon',
    tone: 'saffron-500',
    summary: 'Bilingual support, awareness, community-centered groups.',
    body: 'Bilingual mental-health awareness, peer support groups, and our "Art & Mind" program - combining art-making with mental wellness in a community setting.',
    helpsWith: [
      'Peer support groups (Amharic & English)',
      'Art & Mind - art-based mental-health meetups',
      'Referrals to bilingual therapists',
      'Workshops on stress, grief, and resilience',
    ],
  },
  {
    slug: 'social-cultural',
    title: 'Social & cultural',
    glyph: 'á‰£',
    iconPath: 'brand/socialncaltural.png',
    iconAlt: 'Social and cultural program icon',
    tone: 'green-700',
    summary: 'Heritage preservation, gatherings, cultural storytelling.',
    body: 'From Meskel celebrations to coffee mornings to Amharic lessons - our social and cultural programs are how the community stays a community.',
    helpsWith: [
      'Coffee ceremonies and elder storytelling',
      'Meskel and other heritage celebrations',
      'Amharic language classes (planned)',
      'Cultural exchange with other LA communities',
    ],
  },
]

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

async function seed() {
  for (const program of PROGRAMS) {
    const icon = await uploadImage(program.iconPath)

    await client.createOrReplace({
      _id: `program-${program.slug}`,
      _type: 'program',
      title: program.title,
      slug: {_type: 'slug', current: program.slug},
      summary: program.summary,
      body: program.body,
      glyph: program.glyph,
      icon: {...icon, alt: program.iconAlt},
      tone: program.tone,
      helpsWith: program.helpsWith,
      whatToBring: program.whatToBring,
      walkInClinic: program.walkInClinic,
    })

    console.log(`Seeded program-${program.slug}`)
  }
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
