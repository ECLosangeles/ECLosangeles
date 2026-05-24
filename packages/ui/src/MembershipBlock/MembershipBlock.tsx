import { Eyebrow } from '../Eyebrow';
import { MemberCard } from '../MemberCard';
import styles from './MembershipBlock.module.css';

const REGULAR_FEATURES: ReadonlyArray<string> = [
  'Voting rights at the annual meeting',
  'Community updates in Amharic & English',
  'Priority RSVP for ECLA events',
  'Volunteer opportunities',
  'Auto-renew or manual renewal',
];

const RETIRED_FEATURES: ReadonlyArray<string> = [
  'Same voting and event privileges',
  'Reduced rate for retirees',
  'Auto-renew or manual renewal',
];

export interface MembershipBlockProps {
  title?: string;
  eyebrow?: string;
  description?: string;
  joinHref?: string;
}

export function MembershipBlock({
  title = 'Join us. The community runs on its members.',
  eyebrow = 'Membership',
  description = 'Members vote on board elections, get a say in priorities, and help fund every program ECLA runs.',
  joinHref = '/membership',
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
            features={REGULAR_FEATURES}
            primary
            joinHref={joinHref}
          />
          <MemberCard
            label="Retired"
            price="$30"
            cadence="per year"
            features={RETIRED_FEATURES}
            joinHref={joinHref}
          />
        </div>
      </div>
    </section>
  );
}
