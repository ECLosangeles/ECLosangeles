# Contributing to ECLosangeles

Thanks for working on the ECLA community website. This document covers the conventions and tooling we use; the architecture and stack decisions live in [`README.md`](README.md).

## Branching

- `main` — production-ready. Protected once CI is set up (Phase 6).
- Feature branches: `feat/<short-description>`, `fix/<short-description>`, `docs/<short-description>`, `chore/<short-description>`.

## Commits

We will adopt [Conventional Commits](https://www.conventionalcommits.org/) when commitlint lands in Phase 3. Even before then, please prefix messages:

```
feat: add ProgramCard component
fix: correct Amharic font fallback on header
docs: update brand color rules in README
chore: bump next to 15.1.4
```

The first line should be ≤72 characters. Use the body for the _why_, not the _what_.

## Pull requests

- Reference the phase/feature the PR contributes to (e.g. _"Phase 2 — port Header component"_).
- Keep PRs small. A single component port or a single page is a good unit.
- Run `pnpm typecheck`, `pnpm lint`, and `pnpm format:check` before pushing.
- For UI changes, attach a screenshot or short loom of the rendered result alongside the existing design system preview ([`ui_kits/website/index.html`](file:///c:/Users/Student/Downloads/Compressed/Eclosangeles%20Design%20System/ui_kits/website/index.html)).

## Code conventions

- **TypeScript strict** — `strict: true`, `noUncheckedIndexedAccess: true`. Don't disable strict checks.
- **No `any`** unless paired with a `// TODO:` and a justification.
- **Functions and components** — prefer named exports; one component per file.
- **Server vs client components** — App Router defaults to server components. Add `'use client'` only when state, effects, or browser APIs are required.
- **Styling** — CSS Modules per component (`Component.tsx` + `Component.module.css`). Use design tokens (`var(--…)`) — do not hard-code colors, spacing, or radii. **Do not introduce Tailwind.**
- **Comments** — write a comment only when the _why_ is non-obvious. Don't narrate what the code does.
- **No invented content** — every program name, value, statistic, or quote must come from real ECLA materials.

## Adding a new component (Phase 2+)

Components live in [`packages/ui/src/<ComponentName>/`](packages/ui/src/) with this layout:

```
ComponentName/
├── ComponentName.tsx          named export
├── ComponentName.module.css   styles using design tokens
└── index.ts                   re-export
```

Add the component to [`packages/ui/src/index.ts`](packages/ui/src/index.ts) once it's ready.

## Adding a new page

Pages live in [`apps/web/app/[locale]/<path>/page.tsx`](apps/web/app/) once i18n lands in Phase 3. Until then, plain `apps/web/app/<path>/page.tsx`.

- Default to server components and ISR.
- Fetch data via `lib/cms/` (which transparently falls back to mock data when `NEXT_PUBLIC_USE_MOCK_DATA=true`).

## Brand & content rules

Read the **Brand & design system** section of [`README.md`](README.md). Of particular note:

- Logo + fonts are pending board approval. Don't deploy publicly until ECLA signs off.
- Amharic copy in the current design system is illustrative only. Real Amharic content needs native-speaker review before launch.
- Photography placeholders use a green block + Ge'ez glyph — never use generic stock-photo placeholders.

## Questions

Open a discussion or ping the project owner.
