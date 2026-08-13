import type { Metadata } from 'next';
import { Eyebrow, ProgramCard } from '@eclosangeles/ui';
import { getProgramsContent } from '@/lib/content';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Programs',
  description:
    'Four program areas serving Ethiopian families across Greater Los Angeles — immigration services, older adult services, mental health services, and workforce development.',
};

export default async function ProgramsIndexPage() {
  const programs = await getProgramsContent();

  return (
    <main className={styles.main}>
      <div className={styles.intro}>
        <Eyebrow>{programs.eyebrow}</Eyebrow>
        <h1 className={styles.title}>{programs.title}</h1>
      </div>
      <div className={styles.grid}>
        {programs.items.map((p) => (
          <ProgramCard key={p.slug} program={p} />
        ))}
      </div>
    </main>
  );
}
