import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Leaves draft preview and returns to published content.
 *
 * Useful when a preview session is opened outside the Studio — the visual
 * editing overlay's "exit preview" control lands here.
 */
export async function GET(request: Request) {
  const draft = await draftMode();
  draft.disable();

  return NextResponse.redirect(new URL('/', request.url));
}
