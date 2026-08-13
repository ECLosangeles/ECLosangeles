import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * A photo gallery for a past event, listed under Events → Gallery of Events.
 *
 * This is the type editors will touch most: adding photos after an event is
 * the whole reason the site has a CMS. A gallery with no photos yet is valid —
 * its page still renders with a "photos coming soon" note, so a gallery can be
 * created before the pictures arrive without the nav pointing at a dead end.
 */
export const eventGallery = defineType({
  name: 'eventGallery',
  title: 'Event Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Shown as the page heading and in the Events menu.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      description:
        "The gallery's web address. Changing this breaks any link already shared — avoid it once a gallery is public.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description:
        'Free text, shown exactly as written — e.g. "June 2022" or "May 14, 2022". Not a date picker, because some events only have a month or a year.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional paragraph shown under the title.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Sort Date',
      type: 'datetime',
      description:
        'Controls the order galleries appear in. Newest first. Unrelated to the display date above.',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description:
                'Describes the photo for people using a screen reader. Say what is happening, e.g. "Runners crossing the finish line together".',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional text shown under the photo, visible to everyone.',
            }),
          ],
        }),
      ],
      options: {layout: 'grid'},
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
    select: {title: 'title', subtitle: 'date', media: 'images.0'},
    prepare({title, subtitle, media}) {
      return {title, subtitle: subtitle || 'No date set', media}
    },
  },
})
