# ECLosangeles

The community website for [ECLA — Ethiopian Community Los Angeles](https://www.eclosangeles.org/), a 501(c)(3) civic nonprofit serving Ethiopian families in Greater Los Angeles.

> **Status:** Phase 1 (scaffold + design tokens). All dynamic features (donations, membership, events, bilingual content) are placeholders pending later phases.

## Architecture

A pnpm monorepo with a strict separation between the **content backend** and the **public frontend**:

- **`apps/web/`** — Next.js 15 App Router site (the public face of ECLA)
- **`apps/cms/`** — WordPress (headless), exposed via WPGraphQL — _Phase 4+, not yet scaffolded_
- **`packages/design-tokens/`** — single source of truth for colors, typography, spacing, shadows, motion
- **`packages/ui/`** — shared React components (Header, Hero, Footer, …) — _Phase 2+_
- **`packages/content-schema/`** — TypeScript types describing CMS content; the contract between WP and Next — _Phase 2+_

This separation keeps the frontend independent of any specific CMS — WordPress could be swapped for Sanity or Payload by replacing one adapter.

See [`docs/architecture.md`](docs/architecture.md) for diagrams and rationale (added in Phase 6).

## Getting started

### Requirements

- Node.js 20 LTS (see [`.nvmrc`](.nvmrc))
- pnpm 10 (this repo pins `packageManager` in [package.json](package.json))

### Install & run

```powershell
pnpm install
pnpm dev
```

The site will be available at <http://localhost:3000>. The Home page renders proof that the design tokens are wired (cream background, forest-green primary button, Fraunces display headline, Noto Sans Ethiopic for the Amharic phrase).

### Other scripts

| Command             | What it does                   |
| ------------------- | ------------------------------ |
| `pnpm dev`          | Start Next.js dev server       |
| `pnpm build`        | Production build of `apps/web` |
| `pnpm start`        | Run the production build       |
| `pnpm lint`         | Lint all packages              |
| `pnpm typecheck`    | Type-check all packages        |
| `pnpm format`       | Prettier format the repo       |
| `pnpm format:check` | Verify formatting (CI use)     |

## Repo layout

```
ECLosangeles/
├── apps/
│   ├── web/                 Next.js 15 frontend
│   └── cms/                 WordPress (Phase 4+)
├── packages/
│   ├── design-tokens/       CSS variables — brand source of truth
│   ├── ui/                  Shared React components (Phase 2+)
│   └── content-schema/      TS types for CMS content (Phase 2+)
├── docs/                    architecture.md, design-system.md
├── .github/workflows/       CI (Phase 6)
├── package.json             workspace root scripts
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

## Brand & design system

Brand and visual identity live in [`packages/design-tokens/src/colors_and_type.css`](packages/design-tokens/src/colors_and_type.css). Every color, type-scale, spacing token, radius, shadow, and motion easing the site uses is declared there.

The original design system (with full brand guidelines, voice rules, and JSX component reference) is at `c:\Users\Student\Downloads\Compressed\Eclosangeles Design System\`. Phase 1 copies the tokens and brand SVG assets in; Phase 2 ports the JSX components into [`packages/ui/`](packages/ui/).

**Important brand rules** (from the source `README.md`):

- Forest green (#2F6B33), saffron (#E6AE21), and cochineal red (#B0301F) are the only brand colors. No corporate teal, no soft lavender, no gradients-as-backgrounds.
- Fraunces (display, serif), Inter (body), Noto Sans Ethiopic (Amharic). Max three weights in active use.
- Sentence case for headlines. ALL CAPS reserved for small eyebrow labels and tags.
- Lucide outline icons only — never filled.
- No emoji in editorial UI.
- No invented stats or fabricated content. Every fact must trace to ECLA itself.

Logo and fonts are pending board approval — keep production environments behind basic auth until ECLA signs off on the brand.

## Phase roadmap

See [`C:\Users\Student\.claude\plans\eclosangeles-design-system-this-glittery-sundae.md`](../../Users/Student/.claude/plans/eclosangeles-design-system-this-glittery-sundae.md) for the approved plan.

| Phase | Goal                                           | Status          |
| ----- | ---------------------------------------------- | --------------- |
| 1     | Scaffold + tokens working                      | **In progress** |
| 2     | Port UI components + core pages with mock data | —               |
| 3     | i18n (next-intl) + remaining pages + Husky     | —               |
| 4     | WordPress headless backend (deferred)          | —               |
| 5     | Wire pages to CMS + ISR webhooks (deferred)    | —               |
| 6     | CI/CD + Playwright + docs                      | —               |

## License

TBD. Until set, treat this code as proprietary to ECLA.

## Contact

Project owner: Imran (beleteimran@gmail.com)
ECLA: info@eclosangeles.org · (323) 508-9960 · 8911 S Western Ave, Los Angeles, CA 90047
