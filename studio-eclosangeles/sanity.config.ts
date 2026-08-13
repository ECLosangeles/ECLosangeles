import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {SINGLETON_TYPES, structure} from './structure'

// Singletons shouldn't be duplicated, deleted, or unpublished from the Studio.
// We strip those actions for singleton types so editors can only edit/publish
// the one document the website expects.
const LOCKED_SINGLETON_ACTIONS = new Set(['duplicate', 'delete', 'unpublish'])

export default defineConfig({
  name: 'default',
  title: 'ECLosangeles',

  projectId: 'b59x306d',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(({action}) => !action || !LOCKED_SINGLETON_ACTIONS.has(action))
        : input,
    // Don't offer singletons in the global "create new document" menu — they're
    // managed through their sections in the structure.
    newDocumentOptions: (prev, {creationContext}) =>
      creationContext.type === 'global'
        ? prev.filter((template) => !SINGLETON_TYPES.has(template.templateId))
        : prev,
  },
})
