import { Eyebrow } from '../Eyebrow';
import styles from './KnowYourRights.module.css';

export interface KnowYourRightsVideo {
  title: string;
  url: string;
}

export interface KnowYourRightsProps {
  videos: ReadonlyArray<KnowYourRightsVideo>;
  title?: string;
  eyebrow?: string;
  description?: string;
}

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^www\./, '');

    if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      const videoId = parsedUrl.searchParams.get('v');

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      const [, route, id] = parsedUrl.pathname.split('/');

      if ((route === 'embed' || route === 'shorts') && id) {
        return `https://www.youtube.com/embed/${id}`;
      }
    }

    if (hostname === 'youtu.be') {
      const id = parsedUrl.pathname.split('/').filter(Boolean)[0];

      if (id) {
        return `https://www.youtube.com/embed/${id}`;
      }
    }
  } catch {
    return null;
  }

  return null;
}

export function KnowYourRights({
  videos,
  title = 'Know your rights',
  eyebrow = 'Community resources',
  description = 'Watch practical explainers and community education videos from ECLA and trusted partners.',
}: KnowYourRightsProps) {
  const embeddableVideos = videos
    .map((video) => ({ ...video, embedUrl: getYouTubeEmbedUrl(video.url) }))
    .filter((video): video is KnowYourRightsVideo & { embedUrl: string } =>
      Boolean(video.embedUrl),
    );

  if (embeddableVideos.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className={styles.title}>{title}</h2>
          {description && <p className={styles.description}>{description}</p>}
        </header>
        <div className={styles.grid}>
          {embeddableVideos.map((video) => (
            <article key={`${video.title}-${video.url}`} className={styles.card}>
              <iframe
                src={video.embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className={styles.frame}
              />
              <h3 className={styles.videoTitle}>{video.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
