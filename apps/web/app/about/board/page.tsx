import type { Metadata } from 'next';
import { ComingSoonPage } from '@/components/ComingSoonPage';

export const metadata: Metadata = {
  title: 'Our board',
  description: 'The volunteer board that governs ECLA.',
};

export default function BoardPage() {
  return (
    <ComingSoonPage
      eyebrow="Our board"
      title="The volunteers who govern ECLA."
      lead="ECLA is run by an all-volunteer board elected by the membership."
      note="Board member profiles are being prepared and will be published here soon."
    />
  );
}
