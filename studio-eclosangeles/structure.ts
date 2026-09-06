import type {StructureResolver} from 'sanity/structure'

/**
 * Document types that are singletons. They are managed through explicit list
 * items below and hidden from the generic "create new document" list so editors
 * can't spawn duplicates that the website's fixed-id queries would then miss.
 */
export const SINGLETON_TYPES = new Set<string>(['homePage', 'siteStats'])

// Types that get their own list item below, so they shouldn't also appear in
// the auto-generated document type list at the bottom.
const HIDDEN_TYPES = new Set<string>(['homePage', 'program', 'eventGallery', 'story', 'siteStats'])

/**
 * The Home Page is a single entry the editor opens directly.
 *
 * The document id is plain `homePage`. It used to be `homePage-en`, a suffix the
 * Document Internationalization plugin required; the site is English-only now
 * and that plugin is gone. Any existing `homePage-en` document in the dataset
 * needs migrating to the new id — see the seed script.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage').title('Home Page')),

      S.divider(),

      S.listItem()
        .title('Programs')
        .schemaType('program')
        .child(
          S.documentTypeList('program')
            .title('Programs')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),

      S.listItem()
        .title('Event Galleries')
        .schemaType('eventGallery')
        .child(
          S.documentTypeList('eventGallery')
            .title('Event Galleries')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
        ),

      S.listItem()
        .title('Stories')
        .schemaType('story')
        .child(
          S.documentTypeList('story')
            .title('Stories')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
        ),

      S.divider(),

      S.listItem()
        .title('Site Stats')
        .id('siteStats')
        .child(S.document().schemaType('siteStats').documentId('siteStats').title('Site Stats')),

      S.divider(),

      // Any future type appears here automatically until it gets its own entry.
      ...S.documentTypeListItems().filter((listItem) => !HIDDEN_TYPES.has(listItem.getId() ?? '')),
    ])
