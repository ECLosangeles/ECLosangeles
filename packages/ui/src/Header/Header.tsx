import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './Header.module.css';

export type NavKey = 'about' | 'programs' | 'events' | 'stories' | 'membership';

export interface HeaderNavItem {
  key: NavKey;
  label: string;
  href: string;
}

export interface HeaderProps {
  nav: ReadonlyArray<HeaderNavItem>;
  /** Slot rendered on the right side of the header — typically a LanguageToggle + Donate button */
  actions?: ReactNode;
  /** Slot rendered inside the mobile menu */
  mobileActions?: ReactNode;
  /** Currently active route — drives the underline state */
  active?: NavKey;
  /** Whether the mobile menu is open */
  mobileNavOpen?: boolean;
  /** Toggle callback owned by the app shell */
  onMobileNavToggle?: () => void;
  /** Called after a mobile navigation link is selected */
  onMobileNavigate?: () => void;
  /** Where the brand logo links — typically the locale's home (e.g. "/en") */
  homeHref?: string;
  /** Visually hidden label for the brand link (for assistive tech) */
  brandLabel?: string;
}

export function Header({
  nav,
  actions,
  mobileActions,
  active,
  mobileNavOpen = false,
  onMobileNavToggle,
  onMobileNavigate,
  homeHref = '/',
  brandLabel = 'ECLA — home',
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href={homeHref} className={styles.brand} aria-label={brandLabel}>
          <Image src="/brand/logo-mark.svg" width={36} height={36} alt="" aria-hidden="true" />
          <span className={styles.wordmark}>ECLA</span>
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          {nav.map(({ key, label, href }) => (
            <Link
              key={key}
              href={href}
              className={`${styles.navLink} ${active === key ? styles.navLinkActive : ''}`}
              aria-current={active === key ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        {actions && <div className={styles.right}>{actions}</div>}
        <button
          type="button"
          className={`${styles.menuButton} ${mobileNavOpen ? styles.menuButtonOpen : ''}`}
          onClick={onMobileNavToggle}
          aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileNavOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div
        id="mobile-navigation"
        className={`${styles.mobilePanel} ${mobileNavOpen ? styles.mobilePanelOpen : ''}`}
        hidden={!mobileNavOpen}
      >
        <nav className={styles.mobileNav} aria-label="Mobile primary">
          {nav.map(({ key, label, href }) => (
            <Link
              key={key}
              href={href}
              className={`${styles.mobileNavLink} ${active === key ? styles.mobileNavLinkActive : ''}`}
              aria-current={active === key ? 'page' : undefined}
              onClick={onMobileNavigate}
            >
              {label}
            </Link>
          ))}
        </nav>
        {mobileActions && <div className={styles.mobileActions}>{mobileActions}</div>}
      </div>
    </header>
  );
}
