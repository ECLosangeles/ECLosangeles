import {defineField, defineType} from 'sanity'

/**
 * A story from the community, listed under Our Stories.
 *
 * `body` is portable text rather than a plain string so editors get paragraphs,
 * links, and emphasis without writing markup.
 */
export const story = defineType({
  name: 'story',
  title: 'Story',
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
      description: "The story's web address. Avoid changing it once published.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'The teaser shown in the stories list. One or two sentences.',
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
      description: 'The full story.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published',
      type: 'datetime',
      description: 'Shown on the story and used to order the list, newest first.',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author',
      type: 'string',
      description:
        'Optional. Names of community members should only be published with their consent.',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'publishedAt', media: 'coverImage'},
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toISOString().slice(0, 10) : 'Unpublished',
        media,
      }
    },
  },
})
