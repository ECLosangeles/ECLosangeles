import type { Metadata } from 'next';
import { EventsRail, Eyebrow } from '@eclosangeles/ui';
import type { Locale } from '@/i18n/routing';
import { getHomePageContent } from '@/lib/content';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Coffee mornings, book signings, festivals, conferences, galas — community life happens in person.',
};

export default async function EventsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const { events } = getHomePageContent();

  return (
    <>
      <main className={styles.main}>
        <div className={styles.intro}>
          <Eyebrow>{events.eyebrow}</Eyebrow>
          <h1 className={styles.title}>{events.title}</h1>
          <p className={styles.lead}>{events.description}</p>
        </div>
      </main>
      <EventsRail
        flyers={events.flyers}
        title="All upcoming and recurring events"
        eyebrow={events.eyebrow}
        description={events.description}
        allEventsHref={`/${locale}/events`}
        allEventsLabel={events.allEventsLabel}
        showHeader={false}
      />
    </>
  );
}
