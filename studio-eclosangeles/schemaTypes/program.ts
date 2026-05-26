import {defineField, defineType} from 'sanity'

const programToneOptions = [
  {title: 'Green 500', value: 'green-500'},
  {title: 'Green 600', value: 'green-600'},
  {title: 'Green 700', value: 'green-700'},
  {title: 'Saffron 400', value: 'saffron-400'},
  {title: 'Saffron 500', value: 'saffron-500'},
  {title: 'Red 500', value: 'red-500'},
  {title: 'Earth 700', value: 'earth-700'},
]

export const program = defineType({
  name: 'program',
  title: 'Programs',
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
    defineField({
      name: 'helpsWith',
      title: 'Helps With',
      type: 'array',
      of: [{type: 'string'}],
    }),
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
    select: {
      title: 'title',
      subtitle: 'summary',
      media: 'icon',
    },
  },
})
