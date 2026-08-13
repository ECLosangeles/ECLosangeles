import type { Metadata } from 'next';
import { Eyebrow, OriginStory, ValuesBlock } from '@eclosangeles/ui';
import { MISSION_STATEMENT, TIMELINE, VALUES, VISION_STATEMENT } from '@/lib/content';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About',
  description:
    'ECLA is a 501(c)(3) civic nonprofit founded in 2019 by an eleven-member volunteer board, serving Ethiopian families across Greater Los Angeles.',
};

export default function AboutPage() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.intro}>
          <Eyebrow>About ECLA</Eyebrow>
          <h1 className={styles.title}>
            Eleven volunteers. One town hall. A community that needed a neighbor.
          </h1>
          <p className={styles.lead}>
            ECLA — the Ethiopian Community of Los Angeles — is a 501(c)(3) civic nonprofit at 8911 S
            Western Ave. We&apos;re inclusive, nonpolitical, and nonreligious. We work across four
            program areas, run entirely by member volunteers, and we answer to the people we serve.
          </p>
        </div>
        <div className={styles.statements}>
          <section className={styles.statement}>
            <Eyebrow>Mission statement</Eyebrow>
            <p className={styles.statementBody}>{MISSION_STATEMENT}</p>
          </section>
          <section className={styles.statement}>
            <Eyebrow>Vision</Eyebrow>
            <p className={styles.statementBody}>{VISION_STATEMENT}</p>
          </section>
        </div>
      </main>
      <OriginStory timeline={TIMELINE} />
      <ValuesBlock values={VALUES} />
    </>
  );
}
