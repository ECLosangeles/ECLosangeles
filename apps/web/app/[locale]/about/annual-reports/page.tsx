import type { Metadata } from 'next';
import { DocumentLibraryPage } from '@/components/DocumentLibraryPage';
import { ANNUAL_REPORTS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Annual reports',
  description: "ECLA's annual reports, year by year.",
};

export default function AnnualReportsPage() {
  return <DocumentLibraryPage library={ANNUAL_REPORTS} />;
}
