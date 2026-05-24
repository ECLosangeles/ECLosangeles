import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {schemaTypes} from './schemaTypes'
import {SINGLETON_TYPES, structure} from './structure'

// Singletons shouldn't be duplicated, deleted, or unpublished from the Studio.
// We strip those actions for singleton types so editors can only edit/publish
// the one document the website expects. (Translations are managed by the
// internationalization plugin's "Translations" button, which is unaffected.)
const LOCKED_SINGLETON_ACTIONS = new Set(['duplicate', 'delete', 'unpublish'])

export default defineConfig({
  name: 'default',
  title: 'ECLosangeles',

  projectId: 'b59x306d',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    // Lets editors create an Amharic version of a page by *copying* the English
    // one and translating in place. Adds a managed `language` field to each type
    // listed here and links translations via a `translation.metadata` document.
    documentInternationalization({
      supportedLanguages: [
        {id: 'en', title: 'English'},
        {id: 'am', title: 'Amharic'},
      ],
      schemaTypes: ['homePage'],
      apiVersion: '2026-05-13',
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(({action}) => !action || !LOCKED_SINGLETON_ACTIONS.has(action))
        : input,
    // Don't offer singletons (or the internal translation-metadata type) in the
    // global "create new document" menu — they're managed through their sections.
    newDocumentOptions: (prev, {creationContext}) =>
      creationContext.type === 'global'
        ? prev.filter(
            (template) =>
              !SINGLETON_TYPES.has(template.templateId) &&
              template.templateId !== 'translation.metadata',
          )
        : prev,
  },
})
