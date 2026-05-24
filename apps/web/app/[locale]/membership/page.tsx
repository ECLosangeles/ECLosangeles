import type { Metadata } from 'next';
import { Eyebrow, MembershipBlock, PlaceholderBanner } from '@eclosangeles/ui';
import { MembershipForm } from './MembershipForm';
import styles from './page.module.css';

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
          <PlaceholderBanner message="This is a preview. Membership signup is not enabled yet — submissions are mocked." />
          <Eyebrow>Become a member</Eyebrow>
          <h1 className={styles.title}>Join ECLA. Help shape what we do next.</h1>
          <p className={styles.lead}>
            Members vote on board elections, get a say in priorities, and help fund every program
            ECLA runs. Annual dues — and that&apos;s it.
          </p>
          <MembershipForm />
        </div>
      </main>
      <MembershipBlock />
    </>
  );
}
