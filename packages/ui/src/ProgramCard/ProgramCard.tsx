import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { Program } from '@eclosangeles/content-schema';
import styles from './ProgramCard.module.css';

const TONE_VAR: Record<Program['tone'], string> = {
  'green-500': 'var(--green-500)',
  'green-600': 'var(--green-600)',
  'green-700': 'var(--green-700)',
  'saffron-400': 'var(--saffron-400)',
  'saffron-500': 'var(--saffron-500)',
  'red-500': 'var(--red-500)',
  'earth-700': 'var(--earth-700)',
};

export interface ProgramCardProps {
  program: Pick<Program, 'slug' | 'title' | 'tone' | 'summary'>;
  linkPrefix?: string;
}

/**
 * Text-only program card. Each program is identified by its tone color, carried
 * by the rule above the title rather than by an icon.
 */
export function ProgramCard({ program, linkPrefix = '' }: ProgramCardProps) {
  return (
    <Link
      href={`${linkPrefix}/programs/${program.slug}`}
      className={styles.card}
      style={{ '--tone': TONE_VAR[program.tone] } as CSSProperties}
    >
      <span className={styles.rule} aria-hidden="true" />
      <h3 className={styles.title}>{program.title}</h3>
      <p className={styles.summary}>{program.summary}</p>
      <span className={styles.cta}>Learn more →</span>
    </Link>
  );
}
