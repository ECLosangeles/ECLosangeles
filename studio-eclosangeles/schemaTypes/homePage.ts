import {defineArrayMember, defineField, defineType} from 'sanity'

// NOTE: The `language` field is added automatically by the Document
// Internationalization plugin (see sanity.config.ts) — don't define it here.

const linkField = defineField({
  name: 'href',
  title: 'Link',
  type: 'string',
  validation: (rule) => rule.required(),
})

const textArrayField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [defineArrayMember({type: 'string'})],
  })

const programToneOptions = [
  {title: 'Green 500', value: 'green-500'},
  {title: 'Green 600', value: 'green-600'},
  {title: 'Green 700', value: 'green-700'},
  {title: 'Saffron 400', value: 'saffron-400'},
  {title: 'Saffron 500', value: 'saffron-500'},
  {title: 'Red 500', value: 'red-500'},
  {title: 'Earth 700', value: 'earth-700'},
]

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      initialValue: 'Home Page',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({name: 'tagline', title: 'Tagline', type: 'string'}),
        defineField({name: 'title', title: 'Title', type: 'text', rows: 2}),
        defineField({
          name: 'titleEmphasis',
          title: 'Title Emphasis',
          type: 'string',
          description: 'Optional phrase highlighted at the end of the hero title.',
        }),
        defineField({name: 'lead', title: 'Lead', type: 'text', rows: 3}),
        defineField({name: 'welcomeChip', title: 'Welcome Chip', type: 'string'}),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
        }),
        defineField({
          name: 'ctas',
          title: 'Calls to Action',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [defineField({name: 'label', title: 'Label', type: 'string'}), linkField],
              preview: {
                select: {title: 'label', subtitle: 'href'},
              },
            }),
          ],
          validation: (rule) => rule.max(4),
        }),
        defineField({
          name: 'notes',
          title: 'Highlight Notes',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({name: 'label', title: 'Label', type: 'string'}),
                defineField({name: 'body', title: 'Body', type: 'string'}),
              ],
              preview: {
                select: {title: 'label', subtitle: 'body'},
              },
            }),
          ],
          validation: (rule) => rule.max(2),
        }),
      ],
    }),
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'statement', title: 'Mission Statement', type: 'text', rows: 4}),
        defineField({name: 'tagline', title: 'Tagline', type: 'string'}),
      ],
    }),
    defineField({
      name: 'programs',
      title: 'Programs Section',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({
          name: 'items',
          title: 'Program Cards',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'slug',
                  title: 'Slug',
                  type: 'slug',
                  options: {source: 'title'},
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'summary',
                  title: 'Summary',
                  type: 'text',
                  rows: 2,
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'body',
                  title: 'Body',
                  type: 'text',
                  rows: 5,
                }),
                defineField({
                  name: 'glyph',
                  title: 'Fallback Glyph',
                  type: 'string',
                  description: 'Shown only when no icon image is set.',
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'image',
                  options: {hotspot: true},
                  fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
                }),
                defineField({
                  name: 'tone',
                  title: 'Color Tone',
                  type: 'string',
                  options: {list: programToneOptions, layout: 'dropdown'},
                  initialValue: 'green-500',
                  validation: (rule) => rule.required(),
                }),
                textArrayField('helpsWith', 'Helps With'),
                defineField({
                  name: 'whatToBring',
                  title: 'What To Bring',
                  type: 'text',
                  rows: 3,
                }),
                defineField({
                  name: 'walkInClinic',
                  title: 'Walk-In Clinic',
                  type: 'object',
                  fields: [
                    defineField({name: 'schedule', title: 'Schedule', type: 'string'}),
                    defineField({name: 'address', title: 'Address', type: 'text', rows: 3}),
                  ],
                }),
              ],
              preview: {
                select: {title: 'title', subtitle: 'summary', media: 'icon'},
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'values',
      title: 'Values Section',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({
          name: 'items',
          title: 'Values',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({name: 'order', title: 'Order', type: 'number'}),
                defineField({name: 'name', title: 'Name', type: 'string'}),
                defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {hotspot: true},
                  fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
                }),
              ],
              preview: {
                select: {title: 'name', subtitle: 'description', media: 'image'},
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'originStory',
      title: 'Origin Story',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'title', title: 'Title', type: 'string'}),
        textArrayField('paragraphs', 'Paragraphs'),
        defineField({name: 'readMoreLabel', title: 'Read More Label', type: 'string'}),
        linkField,
        defineField({
          name: 'timeline',
          title: 'Timeline',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({name: 'date', title: 'Date', type: 'string'}),
                defineField({name: 'body', title: 'Body', type: 'text', rows: 2}),
              ],
              preview: {
                select: {title: 'date', subtitle: 'body'},
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'events',
      title: 'Events Section',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
        defineField({name: 'allEventsLabel', title: 'All Events Label', type: 'string'}),
        linkField,
        defineField({
          name: 'flyers',
          title: 'Flyers',
          description: 'Upload event flyers. Event details can live directly on the image.',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Flyer Image',
                  type: 'image',
                  options: {hotspot: true},
                  fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'href',
                  title: 'Optional Link',
                  type: 'string',
                  description: 'Optional detail page, RSVP URL, or social post URL.',
                }),
              ],
              preview: {
                select: {title: 'image.alt', subtitle: 'href', media: 'image'},
                prepare({title, subtitle, media}) {
                  return {
                    title: title || 'Event flyer',
                    subtitle,
                    media,
                  }
                },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'knowYourRights',
      title: 'Know Your Rights',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
        defineField({
          name: 'videos',
          title: 'YouTube Videos',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Video Title',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'url',
                  title: 'YouTube URL',
                  type: 'url',
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: {title: 'title', subtitle: 'url'},
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'vision',
      title: 'Vision Section',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
        defineField({name: 'ctaLabel', title: 'CTA Label', type: 'string'}),
        linkField,
        textArrayField('items', 'Vision Items'),
      ],
    }),
    defineField({
      name: 'membership',
      title: 'Membership Section',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
        linkField,
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'language',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Home Page',
        subtitle: subtitle ? `Language: ${subtitle}` : undefined,
      }
    },
  },
})
