import type { Metadata } from 'next';
import { DocumentLibraryPage } from '@/components/DocumentLibraryPage';
import { FINANCIALS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Financials',
  description: "ECLA's Form 990-EZ filings.",
};

export default function FinancialsPage() {
  return <DocumentLibraryPage library={FINANCIALS} />;
}
