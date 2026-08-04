import styles from './VideoEmbed.module.css';
import { getYouTubeEmbedUrl } from './youtube';

export interface VideoEmbedProps {
  /** Full YouTube watch URL */
  url: string;
  /** Accessible title for the player, shown as a caption below it */
  title: string;
  /** Hide the caption when the surrounding layout already names the video */
  showTitle?: boolean;
}

/**
 * A single responsive YouTube player.
 *
 * Renders nothing when the URL isn't an embeddable YouTube link — better a
 * missing player than an empty frame. Use this for one video in a page's
 * flow; use KnowYourRights for a titled section listing several.
 */
export function VideoEmbed({ url, title, showTitle = true }: VideoEmbedProps) {
  const embedUrl = getYouTubeEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <figure className={styles.figure}>
      <div className={styles.frameWrapper}>
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className={styles.frame}
        />
      </div>
      {showTitle && <figcaption className={styles.caption}>{title}</figcaption>}
    </figure>
  );
}
