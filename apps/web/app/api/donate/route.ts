import { NextResponse } from 'next/server';

/**
 * Mock donate endpoint — Phase 2 placeholder.
 * Phase 7+ will replace this with a real Stripe Checkout Session.
 */
export async function POST(request: Request) {
  // Read the body so we don't drop it silently — useful for dev inspection.
  const body = await request.json().catch(() => null);
  // Simulate some work so loading states render.
  await new Promise((r) => setTimeout(r, 600));
  return NextResponse.json({ ok: true, mock: true, received: body });
}
