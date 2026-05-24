import Image from 'next/image';
import Link from 'next/link';
import type { EventItem } from '@eclosangeles/content-schema';
import { Eyebrow } from '../Eyebrow';
import { Tag } from '../Tag';
import styles from './EventsRail.module.css';

export interface EventFlyer {
  imageSrc: string;
  imageAlt?: string;
  href?: string;
}

export interface EventsRailProps {
  flyers?: ReadonlyArray<EventFlyer>;
  events?: ReadonlyArray<EventItem>;
  title?: string;
  eyebrow?: string;
  description?: string;
  /** Where "All events →" links */
  allEventsHref?: string;
  allEventsLabel?: string;
  showHeader?: boolean;
}

export function EventsRail({
  flyers = [],
  events = [],
  title = "What's happening at ECLA",
  eyebrow = 'Community events',
  description = 'Coffee mornings, book signings, festivals, conferences, galas - community life happens in person.',
  allEventsHref = '/events',
  allEventsLabel = 'All events →',
  showHeader = true,
}: EventsRailProps) {
  if (flyers.length === 0 && events.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {showHeader && (
          <header className={styles.header}>
            <div className={styles.copy}>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.description}>{description}</p>
            </div>
            <Link href={allEventsHref} className={styles.allEvents}>
              {allEventsLabel}
            </Link>
          </header>
        )}
        <div className={styles.grid}>
          {flyers.length > 0
            ? flyers.map((flyer) => {
                const image = (
                  <Image
                    src={flyer.imageSrc}
                    alt={flyer.imageAlt ?? ''}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.flyerImage}
                  />
                );

                return (
                  <article key={flyer.imageSrc} className={styles.card}>
                    {flyer.href ? (
                      <Link href={flyer.href} className={styles.flyerLink}>
                        {image}
                      </Link>
                    ) : (
                      <div className={styles.flyerFrame}>{image}</div>
                    )}
                  </article>
                );
              })
            : events.map((event) => (
                <article key={event.slug} className={styles.card}>
                  <div
                    className={styles.photo}
                    style={event.bg ? { background: event.bg } : undefined}
                  >
                    <div className={styles.photoOverlay} />
                    {event.glyph && (
                      <div className={styles.photoGlyph} aria-hidden="true">
                        {event.glyph}
                      </div>
                    )}
                    {event.tag && (
                      <div className={styles.tagWrap}>
                        <Tag tone={event.tag[0]}>{event.tag[1]}</Tag>
                      </div>
                    )}
                  </div>
                  <div className={styles.body}>
                    <div className={styles.date}>{event.date}</div>
                    <h3 className={styles.cardTitle}>{event.title}</h3>
                    <div className={styles.location}>{event.location}</div>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
}
