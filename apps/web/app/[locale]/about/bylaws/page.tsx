import type { Metadata } from 'next';
import { DocumentLibraryPage } from '@/components/DocumentLibraryPage';
import { BYLAWS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Bylaws',
  description: "ECLA's bylaws, in English and Amharic.",
};

export default function BylawsPage() {
  return <DocumentLibraryPage library={BYLAWS} />;
}
