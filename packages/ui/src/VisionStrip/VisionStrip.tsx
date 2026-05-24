import Link from 'next/link';
import { Button } from '../Button';
import { Eyebrow } from '../Eyebrow';
import styles from './VisionStrip.module.css';

export interface VisionStripProps {
  items: ReadonlyArray<string>;
  title?: string;
  eyebrow?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function VisionStrip({
  items,
  title = 'Programs in motion — and on the way.',
  eyebrow = "Where we're going",
  description = 'Some of these are running today. Some are next on the roadmap. Volunteer time and member dues fund every one of them.',
  ctaLabel = 'Get involved →',
  ctaHref = '/membership',
}: VisionStripProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <Eyebrow color="var(--saffron-300)">{eyebrow}</Eyebrow>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          <Link href={ctaHref} className={styles.linkReset}>
            <Button variant="onDark">{ctaLabel}</Button>
          </Link>
        </div>
        <div className={styles.chips}>
          {items.map((item) => (
            <div key={item} className={styles.chip}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
