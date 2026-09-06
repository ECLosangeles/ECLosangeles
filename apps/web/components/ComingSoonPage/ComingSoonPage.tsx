import { Eyebrow } from '@eclosangeles/ui';
import styles from './ComingSoonPage.module.css';

export interface ComingSoonPageProps {
  eyebrow: string;
  title: string;
  /** Optional paragraph under the heading, for pages that can say something now. */
  lead?: string;
  /** The dashed placeholder note. */
  note: string;
}

/**
 * A published-but-empty page: the route and the navigation entry exist, and the
 * content is still being prepared.
 *
 * Deliberately not a `PlaceholderBanner` — that one hides itself in production,
 * and these pages are reachable from the live nav, so a visitor who lands here
 * needs to be told the section is coming rather than see a blank column.
 */
export function ComingSoonPage({ eyebrow, title, lead, note }: ComingSoonPageProps) {
  return (
    <main className={styles.main}>
      <div className={styles.intro}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className={styles.title}>{title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}
      </div>
      <p className={styles.empty}>{note}</p>
    </main>
  );
}
