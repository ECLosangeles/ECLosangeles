import { NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity/writeClient';

/**
 * The site visit counter, stored as a single number on the `siteStats`
 * singleton in Sanity.
 *
 * GET reads the count. POST counts one visit and returns the new total — the
 * footer's counter POSTs once per browser session and GETs on every page after
 * that, so the number means "visits", not "page views".
 *
 * Needs SANITY_API_WRITE_TOKEN. Without it both verbs answer 503 and the
 * counter hides itself rather than showing a wrong or frozen number.
 */
const STATS_ID = 'siteStats';

/** Never cached: a counter read from a cache is a counter that stops moving. */
export const dynamic = 'force-dynamic';

const UNAVAILABLE = NextResponse.json(
  { error: 'Visit counting is not configured.' },
  { status: 503 },
);

export async function GET() {
  if (!writeClient) return UNAVAILABLE;

  try {
    const visits = await writeClient.fetch<number | null>(
      `*[_id == $id][0].visits`,
      { id: STATS_ID },
      { cache: 'no-store' },
    );
    return NextResponse.json({ visits: visits ?? 0 });
  } catch (error) {
    console.error('Reading the visit counter failed:', error);
    return NextResponse.json({ error: 'Could not read the visit count.' }, { status: 500 });
  }
}

export async function POST() {
  if (!writeClient) return UNAVAILABLE;

  try {
    // The document may not exist yet on a fresh dataset. `createIfNotExists`
    // is a no-op once it does, so this stays a single extra round trip on the
    // very first visit only.
    await writeClient.createIfNotExists({ _id: STATS_ID, _type: 'siteStats', visits: 0 });

    const updated = await writeClient
      .patch(STATS_ID)
      .setIfMissing({ visits: 0 })
      .inc({ visits: 1 })
      .commit<{ visits?: number }>();

    return NextResponse.json({ visits: updated.visits ?? 0 });
  } catch (error) {
    console.error('Incrementing the visit counter failed:', error);
    return NextResponse.json({ error: 'Could not count this visit.' }, { status: 500 });
  }
}
