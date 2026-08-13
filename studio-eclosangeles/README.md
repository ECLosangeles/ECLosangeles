# ECLA Content Studio

The [Sanity](https://www.sanity.io) Studio for **Ethiopian Community Los Angeles**.
This is where editors manage the content the public website (`apps/web`) renders.

- **Project ID:** `b59x306d`
- **Dataset:** `production`
- **API version:** `2026-05-13` (pinned — see below)

> This Studio is **not** part of the pnpm workspace. It manages its own
> dependencies with **npm**. Run `npm install` here, not `pnpm install`.

## Commands

| Command             | What it does                                                      |
| ------------------- | ----------------------------------------------------------------- |
| `npm run dev`       | Start the Studio locally at <http://localhost:3333>.              |
| `npm run build`     | Build the Studio for deployment.                                  |
| `npm run deploy`    | Deploy the Studio to Sanity's hosting.                            |
| `npm run typegen`   | Extract the schema and regenerate TypeScript types in `apps/web`. |
| `npm run typecheck` | Type-check the Studio (`tsc --noEmit`).                           |
| `npm run lint`      | Lint the Studio.                                                  |
| `npm run seed`      | Seed the Home Page documents (uploads brand images). See below.   |

## Visual editing (Presentation tool)

The Studio's **Presentation** tool shows the live website beside the editor.
Clicking any text or image on the page opens the field that produced it, and
edits appear in the preview as they are typed.

To run the whole loop locally you need three things:

1. **The website running.** From the repo root: `pnpm dev` (serves
   <http://localhost:3000>).
2. **A read token in the website.** Copy `apps/web/.env.example` to
   `apps/web/.env.local` and fill in `SANITY_API_READ_TOKEN` with a **Viewer**
   token from
   <https://sanity.io/manage/project/b59x306d/api#tokens>. Without it the preview
   shows published content only — drafts stay invisible.
3. **The Studio pointed at that site.** `npm run dev` here defaults to
   previewing `http://localhost:3000`. Override with
   `SANITY_STUDIO_PREVIEW_ORIGIN` if the site runs elsewhere.

Then open the Studio and pick **Presentation** from the toolbar.

> Only content the page actually reads through `sanityFetch` is clickable.
> Anything still hard-coded in `apps/web/lib/content/` renders normally but has
> no overlay, since there is no field behind it to open.

For the deployed Studio, the preview origin comes from the `SITE_ORIGIN`
repository variable — see [Deployment](#deployment).

## Deployment

The Studio deploys separately from the public Next.js site. GitHub Actions runs
[`deploy-sanity-studio.yml`](../.github/workflows/deploy-sanity-studio.yml) on
pushes to `main` when files under `studio-eclosangeles/**` change, and can also
be run manually from the Actions tab.

The deployed Studio hostname is passed by the GitHub Actions deploy command:

```text
eclosangeles
```

After deployment, the Studio is available at:

```text
https://eclosangeles.sanity.studio
```

Before the workflow can deploy, add this repository secret in GitHub:

```text
SANITY_AUTH_TOKEN
```

Create the token from Sanity with deploy/write access for project `b59x306d`.
Do not commit the token to the repo.

## Content model

Content types live in [`schemaTypes/`](./schemaTypes). Today there is one:

- **Home Page** (`homePage`) — a **singleton**: exactly one document, with the
  fixed id `homePage`. The Studio enforces this: the desk structure in
  [`structure.ts`](./structure.ts) opens that document directly, and
  [`sanity.config.ts`](./sanity.config.ts) strips the create/duplicate/delete
  actions for singleton types. **Do not** turn `homePage` into a
  freely-creatable type — the website queries `*[_type == "homePage"][0]` and
  would pick a random duplicate.

  > The site was bilingual until it moved to English-only. The old
  > `homePage-en` / `homePage-am` documents and the Document
  > Internationalization plugin are gone; the seed script deletes the leftovers.

When you add a new **non-singleton** type (e.g. `program`, `event`), it appears
in the Studio automatically. Add it to `SINGLETON_TYPES` in `structure.ts` only
if it should be a singleton.

## Type generation (keeping the website in sync)

The website's TypeScript types for CMS content are **generated from this schema**,
so they can't silently drift. After any change to a schema or to a GROQ query in
`apps/web/lib/sanity/`, run:

```bash
npm run typegen
```

This extracts the schema to `schema.json` (gitignored) and writes
`apps/web/lib/sanity/sanity.types.ts`. The config lives under `typegen` in
[`sanity.cli.ts`](./sanity.cli.ts).

## Seeding

[`scripts/seedHomePage.ts`](./scripts/seedHomePage.ts) creates/replaces the Home
Page document and uploads the brand images from `apps/web/public`. It also
deletes the legacy bilingual documents (`homePage-en`, `homePage-am`,
`homePage-translations`). It uses `createOrReplace`, so running it again
**overwrites** the document — don't run it against content editors have changed
by hand.

```bash
npm run seed   # runs `sanity exec ... --with-user-token`
```

## Environment

`projectId`/`dataset` are public and committed here. The **website** reads them
from env vars (with these as fallbacks) — see `apps/web/.env.example`. Any write
token must come from the environment and never be committed.
