import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {visionTool} from '@sanity/vision'
import {locations} from './presentationLocations'
import {schemaTypes} from './schemaTypes'
import {SINGLETON_TYPES, structure} from './structure'

/**
 * The website the Presentation tool renders in its preview pane.
 *
 * Defaults to the live site, deliberately: a deployed Studio that falls back to
 * localhost shows editors nothing but "Unable to connect". Developers override
 * it locally instead, which fails safely — the worst case is previewing
 * production from a dev machine.
 *
 * Set SANITY_STUDIO_PREVIEW_ORIGIN=http://localhost:3000 in
 * `studio-eclosangeles/.env.local` when working against a local site. The
 * SANITY_STUDIO_ prefix is what makes an env var visible to the Studio bundle.
 */
const previewOrigin =
  process.env.SANITY_STUDIO_PREVIEW_ORIGIN || 'https://ec-losangeles-web.vercel.app'

// Singletons shouldn't be duplicated, deleted, or unpublished from the Studio.
// We strip those actions for singleton types so editors can only edit/publish
// the one document the website expects.
const LOCKED_SINGLETON_ACTIONS = new Set(['duplicate', 'delete', 'unpublish'])

export default defineConfig({
  name: 'default',
  title: 'ECLosangeles',

  projectId: 'b59x306d',
  dataset: 'production',

  plugins: [
    // Renders the live site next to the editor, with click-to-edit overlays on
    // any field the page pulled from Sanity. `previewMode.enable` is the route
    // in the Next.js app that turns on draft mode for the preview iframe.
    presentationTool({
      resolve: {locations},
      previewUrl: {
        origin: previewOrigin,
        preview: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),
    structureTool({structure}),
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
    // Don't offer singletons in the global "create new document" menu — they're
    // managed through their sections in the structure.
    newDocumentOptions: (prev, {creationContext}) =>
      creationContext.type === 'global'
        ? prev.filter((template) => !SINGLETON_TYPES.has(template.templateId))
        : prev,
  },
})
