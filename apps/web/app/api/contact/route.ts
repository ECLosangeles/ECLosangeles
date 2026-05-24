import { NextResponse } from 'next/server';

/**
 * Mock contact endpoint — Phase 3 placeholder.
 * Phase 7+ will replace this with Resend (or similar) → info@eclosangeles.org.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  await new Promise((r) => setTimeout(r, 600));
  return NextResponse.json({ ok: true, mock: true, received: body });
}
