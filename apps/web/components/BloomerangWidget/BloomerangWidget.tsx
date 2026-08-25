'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './BloomerangWidget.module.css';

type BloomerangWidgetProps = {
  /** Full URL of the per-widget loader script from Bloomerang's CDN. */
  src: string;
  /** Shown if the loader script itself fails to download. */
  fallbackLabel: string;
};

/**
 * Embeds a Bloomerang widget (donation, membership, …).
 *
 * The widget renders its markup relative to its own <script> tag, so the tag
 * has to live inside the container where the form should appear — that rules
 * out next/script, which hoists into <head>. React 19 hoists a JSX <script src>
 * too, so the element is created imperatively on mount instead.
 *
 * Note for local dev: Bloomerang picks its API host by sniffing
 * window.location.href, and any URL containing "localhost" is routed to their
 * internal http://localhost:55386. The widget therefore always fails on
 * http://localhost:3000 — use http://127.0.0.1:3000 to see it render.
 */
export function BloomerangWidget({ src, fallbackLabel }: BloomerangWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;
    script.onerror = () => setFailed(true);
    container.appendChild(script);

    return () => {
      // Each widget type pulls a different, non-interchangeable Bloomerang
      // library (Bloomerang-v2.js for donations, Bloomerang-Memberships.js for
      // memberships), but every loader guards on the same two globals. Left in
      // place, a client-side nav from one widget page to the other would reuse
      // the wrong library and the second widget would fail. Clearing both forces
      // a genuine cold load — the same reset Bloomerang's own loader performs
      // when it detects a version mismatch.
      const w = window as { bloomerangLoadStarted?: boolean; Bloomerang?: unknown };
      delete w.bloomerangLoadStarted;
      delete w.Bloomerang;
      container.replaceChildren();
    };
  }, [src]);

  return (
    <div className={styles.card}>
      <div ref={containerRef} className={styles.widget} />
      {failed && (
        <p className={styles.error}>
          {fallbackLabel} Please refresh, or email{' '}
          <a href="mailto:info@eclosangeles.org">info@eclosangeles.org</a> and we&apos;ll help you
          directly.
        </p>
      )}
    </div>
  );
}
