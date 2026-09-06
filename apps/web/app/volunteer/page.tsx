import type { Metadata } from 'next';
import { ComingSoonPage } from '@/components/ComingSoonPage';

export const metadata: Metadata = {
  title: 'Become a volunteer',
  description: 'Volunteer with ECLA — every program we run is staffed by member volunteers.',
};

export default function VolunteerPage() {
  return (
    <ComingSoonPage
      eyebrow="Become a volunteer"
      title="Every program we run is staffed by volunteers."
      lead="Immigration clinics, older adult services, mental health outreach, workforce development — all of it is member volunteers giving their time."
      note="The volunteer sign-up form is being prepared. In the meantime, email info@eclosangeles.org or call (323) 508-9960 and we'll get you started."
    />
  );
}
