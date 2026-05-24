import Image from 'next/image';
import Link from 'next/link';
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
  program: Pick<Program, 'slug' | 'title' | 'glyph' | 'iconSrc' | 'iconAlt' | 'tone' | 'summary'>;
  linkPrefix?: string;
}

export function ProgramCard({ program, linkPrefix = '' }: ProgramCardProps) {
  return (
    <Link href={`${linkPrefix}/programs/${program.slug}`} className={styles.card}>
      <div className={styles.iconShell} style={{ background: TONE_VAR[program.tone] }}>
        {program.iconSrc ? (
          <Image
            src={program.iconSrc}
            alt={program.iconAlt ?? ''}
            width={54}
            height={54}
            className={styles.iconImage}
          />
        ) : (
          <span className={styles.glyph} aria-hidden="true">
            {program.glyph}
          </span>
        )}
      </div>
      <h3 className={styles.title}>{program.title}</h3>
      <p className={styles.summary}>{program.summary}</p>
      <span className={styles.cta}>Learn more →</span>
    </Link>
  );
}
