import type { Metadata } from 'next';
import Link from 'next/link';
import { Eyebrow } from '@eclosangeles/ui';
import { EVENT_GALLERIES } from '@/lib/content';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Gallery of Events',
  description: 'Photos from ECLA book signings, picnics, marathons, and community gatherings.',
};

export default function EventGalleryIndexPage() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <Link href="/events" className={styles.back}>
          ← All events
        </Link>
        <Eyebrow>Gallery</Eyebrow>
        <h1 className={styles.title}>Gallery of Events</h1>
        <p className={styles.lead}>
          Moments from past gatherings — book signings, picnics, and the community out running
          together.
        </p>

        <ul className={styles.grid}>
          {EVENT_GALLERIES.map((gallery) => (
            <li key={gallery.slug}>
              <Link href={`/events/gallery/${gallery.slug}`} className={styles.card}>
                <h2 className={styles.cardTitle}>{gallery.title}</h2>
                {gallery.date && <p className={styles.cardDate}>{gallery.date}</p>}
                <p className={styles.cardMeta}>
                  {gallery.images.length > 0
                    ? `${gallery.images.length} ${gallery.images.length === 1 ? 'photo' : 'photos'}`
                    : 'Photos coming soon'}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
