import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

interface FooterColumn {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}

const DEFAULT_COLUMNS: ReadonlyArray<FooterColumn> = [
  {
    title: 'About',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Meet our board', href: '/about/board' },
      { label: 'Volunteers', href: '/about/volunteers' },
      { label: 'Our stories', href: '/stories' },
      { label: 'Annual reports', href: '/about/annual-reports' },
      { label: 'Bylaws', href: '/about/bylaws' },
      { label: 'Financials', href: '/about/financials' },
    ],
  },
  {
    title: 'Programs',
    links: [
      // ECLA's four official program areas. Keep in sync with
      // apps/web/lib/content/programs.ts.
      { label: 'Immigration Services', href: '/programs/immigration' },
      { label: 'Older Adult Services', href: '/programs/senior-services' },
      { label: 'Mental Health Services', href: '/programs/mental-wellbeing' },
      { label: 'Workforce Development', href: '/programs/workforce-development' },
    ],
  },
  {
    title: 'Get involved',
    links: [
      { label: 'Donate', href: '/donate' },
      { label: 'Become a member', href: '/membership' },
      { label: 'Volunteer', href: '/about/volunteers' },
      { label: 'Current events', href: '/events' },
      { label: 'Gallery of events', href: '/events#gallery' },
      { label: 'Media gallery', href: '/stories#media' },
    ],
  },
];

export interface FooterProps {
  /**
   * Optional path prefix prepended to every internal link.
   * Use to force locale-prefixed URLs (e.g. "/en" or "/am") when next-intl is set
   * to `localePrefix: 'always'`. Defaults to empty (links work as-is).
   */
  linkPrefix?: string;
  columns?: ReadonlyArray<FooterColumn>;
  /** Bilingual welcome text shown bottom-right */
  welcomeText?: string;
  /** Tagline appended to the copyright line — defaults to '501(c)(3) nonprofit · Founded 2019' */
  rightsTagline?: string;
}

function withPrefix(prefix: string, href: string): string {
  if (!prefix || !href.startsWith('/')) return href;
  return `${prefix}${href}`;
}

export function Footer({
  linkPrefix = '',
  columns = DEFAULT_COLUMNS,
  welcomeText = 'እንኳን ደና መጣችሁ · Welcome',
  rightsTagline = '501(c)(3) nonprofit · Founded 2019',
}: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.brandHead}>
              {/* Negative treatment — the footer sits on Eerie Black. */}
              <Image src="/brand/icons/lion.svg" width={36} height={36} alt="" aria-hidden="true" />
              <Image
                src="/brand/logo/logo-wordmark-light.svg"
                width={74}
                height={26}
                alt=""
                aria-hidden="true"
                className={styles.wordmark}
              />
            </div>
            <p className={styles.address}>
              Ethiopian Community Los Angeles
              <br />
              8911 S Western Ave
              <br />
              Los Angeles, CA 90047
              <br />
              <span className={styles.contact}>
                (323) 508-9960
                <br />
                info@eclosangeles.org
              </span>
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title} className={styles.column}>
              <div className={styles.columnTitle}>{col.title}</div>
              <ul className={styles.list}>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={withPrefix(linkPrefix, link.href)} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.bottom}>
          <div>
            © {year} Ethiopian Community Los Angeles · {rightsTagline}
          </div>
          <div lang="am" className={styles.welcome}>
            {welcomeText}
          </div>
        </div>
      </div>
    </footer>
  );
}
