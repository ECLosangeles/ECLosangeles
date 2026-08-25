import { Eyebrow } from '../Eyebrow';
import { MemberCard } from '../MemberCard';
import styles from './MembershipBlock.module.css';

export interface MembershipBlockProps {
  title?: string;
  eyebrow?: string;
  description?: string;
  joinHref?: string;
  /** Set false where the page already shows the signup form, so the cards
   *  don't offer a button that links back to the page you are on. */
  showJoinCta?: boolean;
  /** Set false to drop the "Most members" badge from the primary card. */
  showRecommendedTag?: boolean;
}

export function MembershipBlock({
  title = 'Join us. The community runs on its members.',
  eyebrow = 'Membership',
  description = 'Members vote on board elections, get a say in priorities, and help fund every program ECLA runs.',
  joinHref = '/membership',
  showJoinCta = true,
  showRecommendedTag = true,
}: MembershipBlockProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </header>
        <div className={styles.grid}>
          <MemberCard
            label="Regular"
            price="$60"
            cadence="per year"
            primary
            joinHref={showJoinCta ? joinHref : undefined}
            recommendedLabel={showRecommendedTag ? 'Most members' : undefined}
          />
          <MemberCard
            label="Retired"
            price="$30"
            cadence="per year"
            joinHref={showJoinCta ? joinHref : undefined}
          />
        </div>
      </div>
    </section>
  );
}
