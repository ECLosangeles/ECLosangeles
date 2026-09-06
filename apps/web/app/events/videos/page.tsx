import type { Metadata } from 'next';
import { ComingSoonPage } from '@/components/ComingSoonPage';

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Video from ECLA events and community education sessions.',
};

export default function VideosPage() {
  return (
    <ComingSoonPage
      eyebrow="Media gallery"
      title="Video from our community."
      note="Videos are being gathered and will be posted here soon."
    />
  );
}
