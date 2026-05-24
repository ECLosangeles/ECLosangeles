import type {StructureResolver} from 'sanity/structure'

/**
 * Document types that are singletons. They are managed through explicit list
 * items below and hidden from the generic "create new document" list so editors
 * can't spawn duplicates that the website's `[0]` queries would then pick from
 * at random.
 */
export const SINGLETON_TYPES = new Set<string>(['homePage'])

// Internal type created by the Document Internationalization plugin to link an
// English page to its Amharic translation. Editors never open it directly.
const HIDDEN_TYPES = new Set<string>(['homePage', 'translation.metadata'])

/**
 * The Home Page is a single entry. Editors open it (English by default) and use
 * the "Translations" button in the toolbar to create/switch to the Amharic
 * version — which copies the English content as a starting point to translate.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage-en').title('Home Page')),

      S.divider(),

      // Any future, non-singleton document types appear here automatically.
      ...S.documentTypeListItems().filter((listItem) => !HIDDEN_TYPES.has(listItem.getId() ?? '')),
    ])
