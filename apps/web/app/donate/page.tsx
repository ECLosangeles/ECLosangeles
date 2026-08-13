import type { Metadata } from 'next';
import { Eyebrow, PlaceholderBanner } from '@eclosangeles/ui';
import { DonateForm } from './DonateForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Donate',
  description:
    "ECLA is 100% volunteer-powered. Your gift pays for printing, translation, kids' snacks at events, and the rent on the room where we meet. ECLA is a 501(c)(3) — your gift is tax-deductible.",
};

export default function DonatePage() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <PlaceholderBanner message="This is a preview. Donations are not enabled yet — submissions are mocked." />
        <Eyebrow color="var(--fg-cta)">Support ECLA</Eyebrow>
        <h1 className={styles.title}>Every dollar stays in the community.</h1>
        <p className={styles.lead}>
          ECLA is 100% volunteer-powered. Your gift pays for printing, translation, kids&apos;
          snacks at events, and the rent on the room where we meet.
        </p>
        <DonateForm />
      </div>
    </main>
  );
}
