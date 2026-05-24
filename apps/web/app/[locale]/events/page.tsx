import type { Metadata } from 'next';
import { EventsRail, Eyebrow } from '@eclosangeles/ui';
import type { Locale } from '@/i18n/routing';
import { getHomePageContent } from '@/lib/sanity/home';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Coffee mornings, book signings, festivals, conferences, galas — community life happens in person.',
};

export default async function EventsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const content = await getHomePageContent(locale);
  const events = content?.events;

  return (
    <>
      <main className={styles.main}>
        <div className={styles.intro}>
          <Eyebrow>{events?.eyebrow || 'Community events'}</Eyebrow>
          <h1 className={styles.title}>{events?.title || "What's happening at ECLA."}</h1>
          <p className={styles.lead}>
            {events?.description ||
              'Our calendar updates as new events are confirmed by the board. RSVPs open one to two weeks before each gathering.'}
          </p>
        </div>
      </main>
      <EventsRail
        flyers={events?.flyers?.length ? events.flyers : []}
        title="All upcoming and recurring events"
        eyebrow={events?.eyebrow || undefined}
        description={events?.description || undefined}
        allEventsHref={`/${locale}/events`}
        allEventsLabel={events?.allEventsLabel || undefined}
        showHeader={false}
      />
    </>
  );
}
