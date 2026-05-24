import Link from 'next/link';
import { Button } from '../Button';
import { Tag } from '../Tag';
import styles from './MemberCard.module.css';

export interface MemberCardProps {
  label: string;
  price: string;
  cadence: string;
  features: ReadonlyArray<string>;
  /** Highlights this card as the recommended option (dark green panel) */
  primary?: boolean;
  /** Where the join button links — typically /membership/signup */
  joinHref?: string;
}

export function MemberCard({
  label,
  price,
  cadence,
  features,
  primary,
  joinHref = '/membership',
}: MemberCardProps) {
  return (
    <article className={`${styles.card} ${primary ? styles.primary : ''}`}>
      <header className={styles.header}>
        <div className={styles.label}>{label}</div>
        {primary && <Tag tone="solid">Most members</Tag>}
      </header>
      <div className={styles.priceRow}>
        <span className={styles.price}>{price}</span>
        <span className={styles.cadence}>{cadence}</span>
      </div>
      <ul className={styles.features}>
        {features.map((f) => (
          <li key={f} className={styles.feature}>
            <span className={styles.check} aria-hidden="true">
              ✓
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className={styles.cta}>
        <Link href={joinHref} className={styles.linkReset}>
          <Button variant={primary ? 'onDark' : 'primary'} size="lg">
            Join — {price}/yr
          </Button>
        </Link>
      </div>
    </article>
  );
}
