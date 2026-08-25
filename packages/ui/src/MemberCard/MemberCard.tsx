import Link from 'next/link';
import { Button } from '../Button';
import { Tag } from '../Tag';
import styles from './MemberCard.module.css';

export interface MemberCardProps {
  label: string;
  price: string;
  cadence: string;
  /** Highlights this card as the recommended option (dark green panel) */
  primary?: boolean;
  /** Where the join button links. Omit to drop the button — e.g. on a page
   *  that already shows the signup form. */
  joinHref?: string;
  /** Badge shown on the primary card. Omit to drop the badge. */
  recommendedLabel?: string;
}

export function MemberCard({
  label,
  price,
  cadence,
  primary,
  joinHref,
  recommendedLabel,
}: MemberCardProps) {
  return (
    <article className={`${styles.card} ${primary ? styles.primary : ''}`}>
      <header className={styles.header}>
        <div className={styles.label}>{label}</div>
        {primary && recommendedLabel && <Tag tone="solid">{recommendedLabel}</Tag>}
      </header>
      <div className={styles.priceRow}>
        <span className={styles.price}>{price}</span>
        <span className={styles.cadence}>{cadence}</span>
      </div>
      {joinHref && (
        <div className={styles.cta}>
          <Link href={joinHref} className={styles.linkReset}>
            <Button variant={primary ? 'onDark' : 'primary'} size="lg">
              Join — {price}/yr
            </Button>
          </Link>
        </div>
      )}
    </article>
  );
}
