import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'b59x306d',
    dataset: 'production',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  /**
   * TypeGen reads the extracted schema + the website's GROQ queries and emits
   * fully-typed results into the web app. Run `pnpm typegen` after changing the
   * schema or a query so the generated types can't drift from the real schema.
   */
  typegen: {
    path: '../apps/web/lib/sanity/**/*.{ts,tsx}',
    schema: './schema.json',
    generates: '../apps/web/lib/sanity/sanity.types.ts',
    overloadClientMethods: false,
  },
})
