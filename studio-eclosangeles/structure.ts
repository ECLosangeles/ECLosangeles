import type {StructureResolver} from 'sanity/structure'

/**
 * Document types that are singletons. They are managed through explicit list
 * items below and hidden from the generic "create new document" list so editors
 * can't spawn duplicates that the website's `[0]` queries would then pick from
 * at random.
 */
export const SINGLETON_TYPES = new Set<string>(['homePage'])

// Types managed through explicit list items above, so they shouldn't also show
// up in the auto-generated document type list below.
const HIDDEN_TYPES = new Set<string>(['homePage'])

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

      // Any future, non-singleton document types appear here automatically.
      ...S.documentTypeListItems().filter((listItem) => !HIDDEN_TYPES.has(listItem.getId() ?? '')),
    ])
