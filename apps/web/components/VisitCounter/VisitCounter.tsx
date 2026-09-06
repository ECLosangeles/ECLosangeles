'use client';

import { useEffect, useState } from 'react';
import styles from './VisitCounter.module.css';

/**
 * Marks that this browser session has already been counted. Session-scoped on
 * purpose: reloading or clicking through the site is one visit, and a return
 * visit tomorrow is a new one.
 */
const SESSION_KEY = 'ecla:visit-counted';

function alreadyCounted(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    // Private browsing and blocked site data both throw here. Counting such a
    // visitor on every page is better than crashing the footer.
    return false;
  }
}

function markCounted(): void {
  try {
    window.sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    /* Nothing to do — see above. */
  }
}

/**
 * Total visits to the site, counted server-side in Sanity.
 *
 * Renders nothing until the count arrives, and nothing at all if the endpoint
 * is unconfigured or failing — an empty space reads better in the footer than
 * "0 visits" or an error.
 */
export function VisitCounter() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    const counted = alreadyCounted();
    // Marked before the request, not after: in development React runs effects
    // twice, and a slow round trip would otherwise be counted twice.
    if (!counted) markCounted();

    let cancelled = false;

    fetch('/api/visits', { method: counted ? 'GET' : 'POST' })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { visits?: number } | null) => {
        if (!cancelled && typeof data?.visits === 'number') setVisits(data.visits);
      })
      .catch(() => {
        /* Leave the counter hidden. */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (visits === null) return null;

  return (
    <div className={styles.counter}>
      <span className={styles.count}>{visits.toLocaleString('en-US')}</span>{' '}
      {visits === 1 ? 'visit' : 'visits'}
    </div>
  );
}
