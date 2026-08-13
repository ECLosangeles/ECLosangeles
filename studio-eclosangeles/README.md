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

## Connecting the Studio to the live site

Four pieces of configuration live outside this repo. Miss one and the symptom
is usually silent — the site builds and serves stale or empty content rather
than failing.

**1. Sanity CORS origins** — <https://sanity.io/manage/project/b59x306d/api#cors-origins>

Add the website's origin (e.g. `https://ec-losangeles-web.vercel.app`) with
**Allow credentials** ticked. Without it the browser half of visual editing and
live updates is blocked; server-rendered pages still work, which is what makes
this one confusing to diagnose.

**2. Vercel environment variables** — Project → Settings → Environment Variables

| Variable                        | Value                                                 |
| ------------------------------- | ----------------------------------------------------- |
| `SANITY_API_READ_TOKEN`         | Viewer token. Needed for draft previews.              |
| `SANITY_REVALIDATE_SECRET`      | Any long random string. Must match the webhook below. |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | `https://eclosangeles.sanity.studio`                  |

The project id, dataset and API version have defaults in the code, so they only
need setting to point at something else.

**3. Revalidation webhook** — <https://sanity.io/manage/project/b59x306d/api#webhooks>

Without this, published edits do not appear on the live site until the next
deploy: pages are statically generated and cached indefinitely.

| Field   | Value                                                    |
| ------- | -------------------------------------------------------- |
| URL     | `https://<site>/api/revalidate`                          |
| Dataset | `production`                                             |
| Trigger | Create, Update, Delete                                   |
| Filter  | `_type in ["homePage","program","eventGallery","story"]` |
| Secret  | the same string as `SANITY_REVALIDATE_SECRET`            |

**4. `SITE_ORIGIN` repository variable** — GitHub → Settings → Secrets and
variables → Actions → Variables. Set it to the deployed site's URL so the
deployed Studio previews production rather than `localhost:3000`.

## Content model

Content types live in [`schemaTypes/`](./schemaTypes):

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

- **Program** (`program`) — one per program area. Drives the cards on the home
  page and `/programs`, its own detail page, and the navigation menu.
- **Event Gallery** (`eventGallery`) — photos from a past event.
- **Story** (`story`) — a community story shown on `/stories`.

New types appear in the Studio automatically unless they are given their own
section in [`structure.ts`](./structure.ts). Add to `SINGLETON_TYPES` there only
if the type should be a singleton.

> **Document ids must not contain a dot.** A dot makes the id a _path_, and
> path-prefixed documents are private in the same way `drafts.` documents are —
> invisible to the unauthenticated reads the website uses. A document with an id
> like `program.immigration` looks completely normal in the Studio and simply
> never appears on the site. Use hyphens.

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
