import type { Metadata } from 'next';
import Link from 'next/link';
import { Eyebrow } from '@eclosangeles/ui';
import { STORIES } from '@/lib/content';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Our stories',
  description:
    'Stories from ECLA volunteers, members, and the community we serve. Names and details shared with consent.',
};

export default async function StoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <main className={styles.main}>
      <div className={styles.intro}>
        <Eyebrow>Our stories</Eyebrow>
        <h1 className={styles.title}>The community in its own words.</h1>
        <p className={styles.lead}>
          A small but growing collection of stories from ECLA members, volunteers, and the neighbors
          we serve. New stories are added as they&apos;re shared with us.
        </p>
      </div>
      <div className={styles.list}>
        {STORIES.map((story) => (
          <article key={story.slug} className={styles.card}>
            <time className={styles.date} dateTime={story.publishedAt}>
              {new Date(story.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <h2 className={styles.cardTitle}>
              <Link href={`/${locale}/stories/${story.slug}`} className={styles.cardLink}>
                {story.title}
              </Link>
            </h2>
            <p className={styles.excerpt}>{story.excerpt}</p>
            {story.authorName && <p className={styles.author}>— {story.authorName}</p>}
          </article>
        ))}
      </div>
    </main>
  );
}
