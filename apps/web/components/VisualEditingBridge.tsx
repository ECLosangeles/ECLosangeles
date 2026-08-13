import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';

/**
 * Mounts the click-to-edit overlay, but only inside a draft preview.
 *
 * Kept as its own component (rather than inlined in the root layout) so the
 * `draftMode()` call — a dynamic API — sits behind a Suspense boundary instead
 * of forcing every route to render dynamically.
 */
export async function VisualEditingBridge() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;

  return <VisualEditing />;
}
