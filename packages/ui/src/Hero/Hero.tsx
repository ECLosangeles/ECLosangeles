import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../Button';
import styles from './Hero.module.css';

export interface HeroProps {
  imageSrc?: string;
  imageAlt?: string;
  linkPrefix?: string;
  tagline?: string;
  title?: string;
  titleEmphasis?: string;
  lead?: string;
  ctas?: ReadonlyArray<{
    label: string;
    href: string;
  }>;
  /** Amharic welcome chip text shown over the hero image */
  welcomeChip?: string;
}

const DEFAULT_TITLE = 'A trusted neighbor for Ethiopian families across';
const DEFAULT_TITLE_EMPHASIS = 'Greater Los Angeles';
const DEFAULT_CTAS: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'Donate', href: '/donate' },
  { label: 'Become a member', href: '/membership' },
  { label: 'Volunteer', href: '/about' },
  { label: 'Get services →', href: '/programs' },
];
function resolveHref(linkPrefix: string, href: string) {
  if (href.startsWith('http') || href.startsWith('#') || href.startsWith(linkPrefix)) {
    return href;
  }

  return `${linkPrefix}${href.startsWith('/') ? href : `/${href}`}`;
}

export function Hero({
  imageSrc = '/brand/hero.png',
  imageAlt = 'Ethiopian Community Los Angeles members gathered together',
  linkPrefix = '',
  tagline = 'Serving Greater LA since 2019',
  title = DEFAULT_TITLE,
  titleEmphasis = DEFAULT_TITLE_EMPHASIS,
  lead = "An inclusive, nonpolitical, nonreligious civic organization — supporting our community's social, economic, educational, health, and cultural needs.",
  ctas = DEFAULT_CTAS,
  welcomeChip = 'እንኳን ደህና መጣችሁ',
}: HeroProps) {
  return (
    <section className={styles.hero}>
      <Image src={imageSrc} alt={imageAlt} fill priority sizes="100vw" className={styles.image} />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.text}>
          <div className={styles.tag}>
            <span className={styles.tagDot} />
            {tagline}
          </div>
          <h1 className={styles.title}>
            {title} {titleEmphasis && <em>{titleEmphasis}</em>}
          </h1>
          <p className={styles.lead}>{lead}</p>
          <div className={styles.ctas}>
            {ctas.slice(0, 4).map((cta, index) => (
              <Link
                key={`${cta.href}-${cta.label}`}
                href={resolveHref(linkPrefix, cta.href)}
                className={styles.linkReset}
              >
                <Button
                  variant={
                    index === 0
                      ? 'cta'
                      : index === 1
                        ? 'primary'
                        : index === 2
                          ? 'gold'
                          : 'goldOutline'
                  }
                  size="lg"
                >
                  {cta.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.welcome} lang="am">
          {welcomeChip}
        </div>
      </div>
    </section>
  );
}
