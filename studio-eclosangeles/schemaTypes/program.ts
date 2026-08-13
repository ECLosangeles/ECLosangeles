import {defineArrayMember, defineField, defineType} from 'sanity'

const programToneOptions = [
  {title: 'Green 500', value: 'green-500'},
  {title: 'Green 600', value: 'green-600'},
  {title: 'Green 700', value: 'green-700'},
  {title: 'Saffron 400', value: 'saffron-400'},
  {title: 'Saffron 500', value: 'saffron-500'},
  {title: 'Red 500', value: 'red-500'},
  {title: 'Earth 700', value: 'earth-700'},
]

/**
 * One of ECLA's program areas: a card on the home page and /programs, plus its
 * own detail page.
 *
 * Note what is NOT here: the Know Your Rights PDFs. Those are third-party
 * guides carrying their own legal disclaimers, published exactly as supplied
 * and not to be edited or excerpted. They stay in the repo
 * (`apps/web/lib/content/programs.ts`) so changing one needs a code review
 * rather than a Studio session. The website merges them in by slug.
 */
export const program = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
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
      options: {source: 'title', maxLength: 96},
      description:
        "The program's web address, and how the site matches it to its documents. Changing this on an existing program will detach its Know Your Rights PDFs — check with a developer first.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Position in the programs grid and the navigation menu. Lower numbers first.',
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: 'tone',
      title: 'Colour',
      type: 'string',
      description: "The accent colour for this program's card.",
      options: {list: programToneOptions, layout: 'dropdown'},
      initialValue: 'green-500',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 2,
      description: 'One or two sentences, shown on the program card.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Introduction',
      type: 'text',
      rows: 4,
      description: 'Opening paragraph on the detail page. Falls back to the summary if empty.',
    }),
    defineField({
      name: 'helpsWith',
      title: 'What We Help With',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Bullet list shown on the detail page.',
    }),
    defineField({
      name: 'whatToBring',
      title: 'What To Bring',
      type: 'text',
      rows: 3,
      description: 'Optional. What someone should bring to a walk-in or appointment.',
    }),
    defineField({
      name: 'walkInClinic',
      title: 'Walk-in Clinic',
      type: 'object',
      description: 'Only fill this in for programs that run a walk-in clinic.',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({
          name: 'schedule',
          title: 'Schedule',
          type: 'string',
          description: 'e.g. "Tuesdays, 10 AM – 2 PM"',
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 3,
          description: 'One line per line — the page keeps the line breaks.',
        }),
      ],
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
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
              name: 'url',
              title: 'YouTube URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'url'}},
        }),
      ],
    }),
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', subtitle: 'summary', order: 'order'},
    prepare({title, subtitle, order}) {
      return {title: order ? `${order}. ${title}` : title, subtitle}
    },
  },
})
