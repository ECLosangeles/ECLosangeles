import { parseBody } from 'next-sanity/webhook';
import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Publishes content changes to the live site.
 *
 * Pages are statically generated and `sanityFetch` caches with
 * `revalidate: false`, so without this endpoint an edit in the Studio would not
 * appear until the next deploy. Sanity calls this on every document change and
 * we drop the cached queries.
 *
 * `parseBody` verifies the signature Sanity sends using the shared secret, so
 * this cannot be triggered by anyone who simply knows the URL. Requests that
 * fail verification are rejected before anything is revalidated.
 *
 * Set up in Sanity → API → Webhooks. See the Studio README.
 */
export async function POST(request: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      request,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse('Bad request: no document type', { status: 400 });
    }

    // Every `sanityFetch` is tagged 'sanity' by default. Clearing that one tag
    // refreshes all CMS-backed pages — this site is small enough that
    // per-document tags would add moving parts without saving meaningful work.
    revalidateTag('sanity');

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      now: Date.now(),
    });
  } catch (error) {
    console.error('Revalidation webhook failed:', error);
    return new NextResponse(error instanceof Error ? error.message : 'Revalidation failed', {
      status: 500,
    });
  }
}
