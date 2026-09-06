import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { LOGO_SRC } from '../brand';
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
      { label: 'Volunteers', href: '/volunteer' },
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
      { label: 'Volunteer', href: '/volunteer' },
      { label: 'Current events', href: '/events' },
      { label: 'Gallery of events', href: '/events/gallery' },
      { label: 'Videos', href: '/events/videos' },
    ],
  },
];

export interface FooterProps {
  /**
   * Optional path prefix prepended to every internal link — e.g. to mount the
   * whole site under a sub-path. Defaults to empty (links work as-is), which is
   * what the site uses now that routes are unprefixed.
   */
  linkPrefix?: string;
  columns?: ReadonlyArray<FooterColumn>;
  /** Bilingual welcome text shown bottom-right */
  welcomeText?: string;
  /** Tagline appended to the copyright line — defaults to '501(c)(3) nonprofit · Founded 2019' */
  rightsTagline?: string;
  /**
   * Slot in the bottom bar, between the copyright and the welcome — used for
   * the visit counter, which needs app-level data this package doesn't fetch.
   */
  meta?: ReactNode;
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
  meta,
}: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.brandHead}>
              {/* The same logotype as the header — its orange holds up on
                  Eerie Black, so there is no separate negative treatment. */}
              <Image
                src={LOGO_SRC}
                width={102}
                height={40}
                alt=""
                aria-hidden="true"
                className={styles.logo}
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
          {meta}
          <div lang="am" className={styles.welcome}>
            {welcomeText}
          </div>
        </div>
      </div>
    </footer>
  );
}
