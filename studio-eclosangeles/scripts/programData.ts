export type ProgramSeed = {
  slug: string
  title: string
  iconPath: string
  iconAlt: string
  tone: string
  summary: string
  glyph?: string
}

export const PROGRAMS: ProgramSeed[] = [
  {
    slug: 'child-parent',
    title: 'Child & Parent',
    iconPath: 'brand/childnparent.png',
    iconAlt: 'Child and parent support icon',
    tone: 'green-500',
    summary: 'Family preparedness, parenting resources, know-your-rights cards.',
  },
  {
    slug: 'youth',
    title: 'Youth',
    iconPath: 'brand/youth.png',
    iconAlt: 'Youth program icon',
    tone: 'saffron-400',
    summary: 'Mentorship, college guidance, STEM direction, community involvement.',
  },
  {
    slug: 'senior-services',
    title: 'Senior services',
    iconPath: 'brand/seniorservices.png',
    iconAlt: 'Senior services icon',
    tone: 'earth-700',
    summary: 'Wellness, social inclusion, county-benefits help in Amharic.',
  },
  {
    slug: 'immigration',
    title: 'Immigration',
    iconPath: 'brand/immigration.png',
    iconAlt: 'Immigration support icon',
    tone: 'red-500',
    summary: 'Know-your-rights resources, legal guidance, community education.',
  },
  {
    slug: 'medical-health',
    title: 'Medical health',
    iconPath: 'brand/medicalhealth.png',
    iconAlt: 'Medical health icon',
    tone: 'green-600',
    summary: 'Public health workshops, bilingual health panels, clinic referrals.',
  },
  {
    slug: 'mental-health',
    title: 'Mental health',
    iconPath: 'brand/mentalhealth.png',
    iconAlt: 'Mental health icon',
    tone: 'saffron-500',
    summary: 'Bilingual support, awareness, community-centered groups.',
  },
  {
    slug: 'social-cultural',
    title: 'Social & cultural',
    iconPath: 'brand/socialncaltural.png',
    iconAlt: 'Social and cultural program icon',
    tone: 'green-700',
    summary: 'Heritage preservation, gatherings, cultural storytelling.',
  },
]
