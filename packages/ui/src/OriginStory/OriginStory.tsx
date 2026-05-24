import type { TimelineEntry } from '@eclosangeles/content-schema';
import Link from 'next/link';
import { Button } from '../Button';
import { Eyebrow } from '../Eyebrow';
import styles from './OriginStory.module.css';

export interface OriginStoryProps {
  timeline: ReadonlyArray<TimelineEntry>;
  title?: string;
  eyebrow?: string;
  paragraphs?: ReadonlyArray<string>;
  /** Where the "Read the full history" button links */
  readMoreHref?: string;
  readMoreLabel?: string;
}

const DEFAULT_PARAGRAPHS: ReadonlyArray<string> = [
  'ECLA started in conversations between Ethiopian Angelenos who saw their neighbors falling through the cracks — language barriers at the DMV, parents unsure how to enroll a child, elders missing benefits they qualified for.',
  "On September 28, 2019, those conversations became a town hall. By the end of the meeting, eleven volunteers had been elected to a founding board. Six months later, the pandemic arrived — and ECLA's first major work became bilingual health panels for community members navigating COVID in their second language.",
];

export function OriginStory({
  timeline,
  title = 'Built by neighbors, in a town hall.',
  eyebrow = 'Our story',
  paragraphs = DEFAULT_PARAGRAPHS,
  readMoreHref = '/about',
  readMoreLabel = 'Read the full history',
}: OriginStoryProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className={styles.title}>{title}</h2>
          {paragraphs.map((p, i) => (
            <p key={i} className={styles.paragraph}>
              {p}
            </p>
          ))}
          <Link href={readMoreHref} className={styles.linkReset}>
            <Button variant="secondary">{readMoreLabel}</Button>
          </Link>
        </div>
        <ol className={styles.timeline}>
          <div className={styles.line} aria-hidden="true" />
          {timeline.map((entry, i) => {
            const isLast = i === timeline.length - 1;
            return (
              <li key={i} className={styles.entry}>
                <span
                  className={`${styles.dot} ${isLast ? styles.dotLast : ''}`}
                  aria-hidden="true"
                />
                <div className={styles.entryBody}>
                  <div className={styles.entryDate}>{entry.date}</div>
                  <p className={styles.entryText}>{entry.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
