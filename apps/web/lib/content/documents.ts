/**
 * Public-accountability documents — annual reports, bylaws, and financials.
 *
 * The files live under `apps/web/public/documents/<folder>/`. To publish a new
 * one: drop the PDF in that folder, then add an entry here with its `href` set
 * to the path *below* `public` (so
 * `public/documents/bylaws/ecla-bylaws-english.pdf` becomes
 * `/documents/bylaws/ecla-bylaws-english.pdf`). Keep filenames lowercase and
 * hyphenated — spaces have to be percent-encoded to survive as URLs.
 */

export interface DocumentEntry {
  title: string;
  /** Path under `public`, always starting with `/documents/` */
  href: string;
}

export interface DocumentLibrary {
  eyebrow: string;
  title: string;
  documents: ReadonlyArray<DocumentEntry>;
}

export const ANNUAL_REPORTS: DocumentLibrary = {
  eyebrow: 'Annual reports',
  title: 'What we did, year by year.',
  documents: [
    { title: 'Annual Report 2025', href: '/documents/annual-reports/annual-report-2025.pdf' },
    { title: 'Annual Report 2024', href: '/documents/annual-reports/annual-report-2024.pdf' },
    { title: 'Annual Report 2023', href: '/documents/annual-reports/annual-report-2023.pdf' },
  ],
};

export const BYLAWS: DocumentLibrary = {
  eyebrow: 'Bylaws',
  title: 'How we govern ourselves.',
  documents: [
    { title: 'ECLA Bylaws — English', href: '/documents/bylaws/ecla-bylaws-english.pdf' },
    { title: 'ECLA Bylaws — Amharic', href: '/documents/bylaws/ecla-bylaws-amharic.pdf' },
  ],
};

export const FINANCIALS: DocumentLibrary = {
  eyebrow: 'Financials',
  title: 'Our filings, open to read.',
  documents: [
    { title: 'Form 990-EZ — 2024', href: '/documents/financials/form-990ez-2024.pdf' },
    { title: 'Form 990-EZ — 2023', href: '/documents/financials/form-990ez-2023.pdf' },
    { title: 'Form 990-EZ — 2022', href: '/documents/financials/form-990ez-2022.pdf' },
  ],
};
