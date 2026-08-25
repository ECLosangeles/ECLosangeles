import type { Metadata } from 'next';
import { Eyebrow } from '@eclosangeles/ui';
import { BloomerangWidget } from '@/components/BloomerangWidget';
import styles from './page.module.css';

const DONATION_WIDGET_SRC =
  'https://s3-us-west-2.amazonaws.com/bloomerang-public-cdn/ethiopiancommunitylosangelesecla/.widget-js/37888.js';

export const metadata: Metadata = {
  title: 'Donate',
  description:
    "ECLA is 100% volunteer-powered. Your gift pays for printing, translation, kids' snacks at events, and the rent on the room where we meet. ECLA is a 501(c)(3) — your gift is tax-deductible.",
};

export default function DonatePage() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <Eyebrow color="var(--fg-cta)">Support ECLA</Eyebrow>
        <h1 className={styles.title}>Every dollar stays in the community.</h1>
        <p className={styles.lead}>
          ECLA is 100% volunteer-powered. Your gift pays for printing, translation, kids&apos;
          snacks at events, and the rent on the room where we meet.
        </p>
        <BloomerangWidget
          src={DONATION_WIDGET_SRC}
          fallbackLabel="The donation form couldn't load."
        />
        <p className={styles.disclaimer}>
          ECLA is a 501(c)(3) — your gift is tax-deductible. EIN 84-4910814.
        </p>
      </div>
    </main>
  );
}
