import styles from './PlaceholderBanner.module.css';

export interface PlaceholderBannerProps {
  /**
   * Custom message — defaults to a generic placeholder warning.
   * Use to clarify which feature is stubbed (e.g. "donations are not enabled yet").
   */
  message?: string;
}

/**
 * Renders a non-prod warning banner above any stubbed feature.
 * Hidden in production (NEXT_PUBLIC_ENV === 'production').
 *
 * Server component — uses build-time env var only.
 */
export function PlaceholderBanner({
  message = "This is a preview. Submissions don't go anywhere yet.",
}: PlaceholderBannerProps) {
  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    return null;
  }
  return (
    <div className={styles.banner} role="status">
      <span className={styles.dot} aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
