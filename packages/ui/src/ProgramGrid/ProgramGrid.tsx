import Link from 'next/link';
import type { Program } from '@eclosangeles/content-schema';
import { Eyebrow } from '../Eyebrow';
import { ProgramCard } from '../ProgramCard';
import styles from './ProgramGrid.module.css';

export interface ProgramGridProps {
  programs: ReadonlyArray<Program>;
  title?: string;
  eyebrow?: string;
  /** Show the "See all programs" link in the header */
  showSeeAll?: boolean;
  linkPrefix?: string;
}

export function ProgramGrid({
  programs,
  title = 'Programs that meet you where you are.',
  eyebrow = 'What we do',
  showSeeAll = true,
  linkPrefix = '',
}: ProgramGridProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className={styles.title}>{title}</h2>
          </div>
          {showSeeAll && (
            <Link href={`${linkPrefix}/programs`} className={styles.seeAll}>
              See all programs →
            </Link>
          )}
        </header>
        <div className={styles.grid}>
          {programs.map((p) => (
            <ProgramCard key={p.slug} program={p} linkPrefix={linkPrefix} />
          ))}
        </div>
      </div>
    </section>
  );
}
