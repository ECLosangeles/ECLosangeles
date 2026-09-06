'use client';

import { usePathname } from 'next/navigation';
import { PageMotifs } from '@eclosangeles/ui';

/**
 * Drops the cultural motifs onto whatever page is showing.
 *
 * Seeded with the pathname so every page gets its own arrangement and keeps it
 * — including across a server render and its hydration, which is why the seed
 * comes from the route rather than `Math.random()`.
 *
 * A client component only because the pathname lives on the client side of the
 * boundary; the artwork itself is plain markup, the same split the header uses.
 */
export function SiteMotifs() {
  return <PageMotifs seed={usePathname()} />;
}
