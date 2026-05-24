import type { EventItem } from '@eclosangeles/content-schema';

export const EVENTS: ReadonlyArray<EventItem> = [
  {
    slug: 'fundraising-gala',
    title: 'Fundraising gala dinner',
    date: 'Annual',
    location: 'Hollywood',
    glyph: 'ድ',
    bg: 'var(--green-500)',
    tag: ['saffron', 'Featured'],
    featured: true,
  },
  {
    slug: 'spring-festival',
    title: 'Spring festival & community picnic',
    date: 'Seasonal',
    location: 'Little Ethiopia',
    glyph: 'ጸ',
    bg: 'var(--earth-700)',
    tag: ['green', 'Recurring'],
  },
  {
    slug: 'job-fair',
    title: 'Job fair & college counseling',
    date: 'Fall',
    location: 'ECLA office',
    glyph: 'ወ',
    bg: 'var(--red-500)',
    tag: ['ink', 'Annual'],
  },
];
