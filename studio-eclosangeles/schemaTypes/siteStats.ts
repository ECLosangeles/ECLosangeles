import {defineField, defineType} from 'sanity'

/**
 * Site-wide counters. A singleton with the fixed id `siteStats`.
 *
 * `visits` is written by the website, not by editors — `/api/visits`
 * increments it once per browser session. It is shown read-only here so the
 * number can be checked (and, rarely, corrected) from the Studio without
 * inviting casual edits.
 */
export const siteStats = defineType({
  name: 'siteStats',
  title: 'Site Stats',
  type: 'document',
  fields: [
    defineField({
      name: 'visits',
      title: 'Visits',
      type: 'number',
      description: 'Total visits counted since the counter went live. Updated by the website.',
      readOnly: true,
      initialValue: 0,
    }),
  ],
  preview: {
    select: {visits: 'visits'},
    prepare({visits}) {
      return {title: 'Site Stats', subtitle: `${visits ?? 0} visits`}
    },
  },
})
