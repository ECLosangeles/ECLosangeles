import { NextResponse } from 'next/server';

/**
 * Mock membership endpoint — Phase 2 placeholder.
 * Phase 7+ will replace this with Stripe + WP user creation.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  await new Promise((r) => setTimeout(r, 600));
  return NextResponse.json({ ok: true, mock: true, received: body });
}
