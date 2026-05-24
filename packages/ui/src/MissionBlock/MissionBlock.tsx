import { Eyebrow } from '../Eyebrow';
import { TibebStrip } from '../TibebStrip';
import styles from './MissionBlock.module.css';

export interface MissionBlockProps {
  eyebrow?: string;
  /** Custom mission statement; defaults to ECLA's official mission */
  mission?: string;
  /** Tagline shown below the mission */
  tagline?: string;
}

const DEFAULT_MISSION =
  'To address the social, economic, educational, health, immigration, and cultural needs of Ethiopian immigrants in Greater Los Angeles — and to promote the cultural heritage of Ethiopia at large.';

export function MissionBlock({
  eyebrow = 'Our mission',
  mission = DEFAULT_MISSION,
  tagline = 'Inclusive · Nonpolitical · Nonreligious',
}: MissionBlockProps) {
  return (
    <section className={styles.section}>
      <TibebStrip height={6} className={styles.strip} />
      <div className={styles.inner}>
        <Eyebrow color="var(--saffron-300)">{eyebrow}</Eyebrow>
        <p className={styles.mission}>{mission}</p>
        <p className={styles.tagline}>{tagline}</p>
      </div>
    </section>
  );
}
