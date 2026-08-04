'use client';

import { useCallback, useEffect, useState } from 'react';
import { Eyebrow } from '../Eyebrow';
import { TibebStrip } from '../TibebStrip';
import styles from './MissionBlock.module.css';

export interface StatementSlide {
  eyebrow: string;
  /** The statement itself — reproduced verbatim, never paraphrased */
  body: string;
  /** Short line shown below the statement */
  tagline?: string;
}

export interface MissionBlockProps {
  /** Statements to rotate through; defaults to ECLA's mission and vision */
  statements?: ReadonlyArray<StatementSlide>;
  /** Milliseconds each slide is shown before advancing. 0 disables auto-advance. */
  interval?: number;
}

/** ECLA's official statements, reproduced word for word. Do not paraphrase. */
const DEFAULT_STATEMENTS: ReadonlyArray<StatementSlide> = [
  {
    eyebrow: 'Our mission',
    body: 'The Ethiopian Community Los Angeles, ECLA, is an inclusive, nonpolitical, and nonreligious civic organization aiming to address the social, economic, and educational needs of Ethiopian immigrants, and others in similar situations, residing in the Greater Los Angeles area of Southern California. ECLA is committed to promote the history and the cultural heritage of Ethiopia at large.',
    tagline: 'Inclusive · Nonpolitical · Nonreligious',
  },
  {
    eyebrow: 'Our vision',
    body: 'Our vision is to see Ethiopians in Los Angeles and its surroundings be fully integrated, united, equally addressed, and benefitted from the socio-economic and educational opportunities available in the country while advancing their culture, history and heritage.',
    tagline: 'Integrated · United · Equally addressed',
  },
];

export function MissionBlock({
  statements = DEFAULT_STATEMENTS,
  interval = 9000,
}: MissionBlockProps) {
  const slides = statements.length > 0 ? statements : DEFAULT_STATEMENTS;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (next: number) => setIndex((next + slides.length) % slides.length),
    [slides.length],
  );

  // Auto-advance, unless there is nothing to advance to, the visitor is
  // interacting with the slider, or they have asked for reduced motion.
  useEffect(() => {
    if (slides.length < 2 || interval <= 0 || paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval, paused, slides.length]);

  const activeLabel = slides[index]?.eyebrow;

  return (
    <section
      className={styles.section}
      aria-roledescription="carousel"
      aria-label="Mission and vision"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <TibebStrip height={6} className={styles.strip} />
      <div className={styles.inner}>
        <div className={styles.stack}>
          {slides.map((slide, slideIndex) => (
            <div
              key={slide.eyebrow}
              className={`${styles.slide} ${slideIndex === index ? styles.slideActive : ''}`}
              aria-hidden={slideIndex === index ? undefined : true}
            >
              <Eyebrow color="var(--saffron-300)">{slide.eyebrow}</Eyebrow>
              <p className={styles.statement}>{slide.body}</p>
              {slide.tagline && <p className={styles.tagline}>{slide.tagline}</p>}
            </div>
          ))}
        </div>

        {slides.length > 1 && (
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => goTo(index - 1)}
              aria-label="Previous statement"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <div className={styles.dots}>
              {slides.map((slide, slideIndex) => (
                <button
                  key={slide.eyebrow}
                  type="button"
                  className={`${styles.dot} ${slideIndex === index ? styles.dotActive : ''}`}
                  onClick={() => goTo(slideIndex)}
                  aria-label={`Show ${slide.eyebrow}`}
                  aria-current={slideIndex === index ? 'true' : undefined}
                />
              ))}
            </div>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => goTo(index + 1)}
              aria-label="Next statement"
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>
        )}
      </div>
      <div className={styles.srOnly} aria-live="polite">
        {activeLabel}
      </div>
    </section>
  );
}
