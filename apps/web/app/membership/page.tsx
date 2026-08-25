import type { Metadata } from 'next';
import { Eyebrow, MembershipBlock } from '@eclosangeles/ui';
import { BloomerangWidget } from '@/components/BloomerangWidget';
import styles from './page.module.css';

const MEMBERSHIP_WIDGET_SRC =
  'https://s3-us-west-2.amazonaws.com/bloomerang-public-cdn/ethiopiancommunitylosangelesecla/.widget-js/34817.js';

export const metadata: Metadata = {
  title: 'Membership',
  description:
    'Members vote on board elections, get a say in priorities, and help fund every program ECLA runs. Regular memberships are $60/year, retired memberships $30/year.',
};

export default function MembershipPage() {
  return (
    <>
      <main className={styles.intro}>
        <div className={styles.introInner}>
          <Eyebrow>Become a member</Eyebrow>
          <h1 className={styles.title}>Join ECLA. Help shape what we do next.</h1>
          <p className={styles.lead}>
            Members vote on board elections, get a say in priorities, and help fund every program
            ECLA runs. Annual dues — and that&apos;s it.
          </p>
          <BloomerangWidget
            src={MEMBERSHIP_WIDGET_SRC}
            fallbackLabel="The membership form couldn't load."
          />
        </div>
      </main>
      {/* The signup form is right above, so these cards are a price summary
          rather than another call to action. */}
      <MembershipBlock showJoinCta={false} showRecommendedTag={false} />
    </>
  );
}
