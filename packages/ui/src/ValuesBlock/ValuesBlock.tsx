import type { Value } from '@eclosangeles/content-schema';
import { Eyebrow } from '../Eyebrow';
import styles from './ValuesBlock.module.css';

export interface ValuesBlockProps {
  values: ReadonlyArray<Value>;
  title?: string;
  eyebrow?: string;
}

export function ValuesBlock({
  values,
  title = 'Eight values, lived — not laminated.',
  eyebrow = 'What we stand for',
}: ValuesBlockProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className={styles.title}>{title}</h2>
        </header>
        <div className={styles.grid}>
          {values.map((v) => (
            <article key={v.order} className={styles.card}>
              <span className={styles.number} aria-hidden="true">
                {String(v.order).padStart(2, '0')}
              </span>
              <h3 className={styles.name}>{v.name}</h3>
              <p className={styles.description}>{v.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
