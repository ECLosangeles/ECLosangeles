import type { Metadata } from 'next';
import { Eyebrow, ProgramCard } from '@eclosangeles/ui';
import { PROGRAMS } from '@/lib/mock-data';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Programs',
  description:
    'Seven program areas serving Ethiopian families across Greater Los Angeles — child & parent, youth, senior services, immigration, medical health, mental health, social & cultural.',
};

export default function ProgramsIndexPage() {
  return (
    <main className={styles.main}>
      <div className={styles.intro}>
        <Eyebrow>What we do</Eyebrow>
        <h1 className={styles.title}>Programs that meet you where you are.</h1>
        <p className={styles.lead}>
          Seven program areas, all volunteer-powered, all built around what community members
          actually ask for.
        </p>
      </div>
      <div className={styles.grid}>
        {PROGRAMS.map((p) => (
          <ProgramCard key={p.slug} program={p} />
        ))}
      </div>
    </main>
  );
}
