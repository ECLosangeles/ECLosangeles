'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import styles from './Header.module.css';

export type NavKey = 'about' | 'programs' | 'events' | 'stories' | 'membership';

export interface HeaderNavChild {
  label: string;
  href: string;
}

export interface HeaderNavItem {
  key: NavKey;
  label: string;
  href: string;
  /** Sub-pages shown in a dropdown under this item */
  children?: ReadonlyArray<HeaderNavChild>;
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

interface NavDropdownProps {
  item: HeaderNavItem;
  subPages: ReadonlyArray<HeaderNavChild>;
  isActive: boolean;
}

/**
 * Desktop nav item with sub-pages. The parent stays a real link — it still has
 * a page of its own — and the caret next to it opens the sub-page menu, which
 * also opens on hover for pointer users.
 */
function NavDropdown({ item, subPages, isActive }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className={styles.navGroup}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <Link
        href={item.href}
        className={`${styles.navLink} ${styles.navLinkWithMenu} ${isActive ? styles.navLinkActive : ''}`}
        aria-current={isActive ? 'page' : undefined}
      >
        {item.label}
      </Link>
      <button
        type="button"
        className={styles.navCaret}
        aria-label={`${item.label} sub-pages`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        {/* An inline SVG rather than a "▾" character — that glyph is missing
            from many UI fonts and degrades to a faint dot. */}
        <svg
          aria-hidden="true"
          className={open ? styles.navCaretOpen : undefined}
          width="10"
          height="7"
          viewBox="0 0 10 7"
          fill="none"
        >
          <path
            d="M1 1.5 5 5.5 9 1.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div id={menuId} className={styles.dropdown} hidden={!open}>
        {subPages.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className={styles.dropdownLink}
            onClick={() => setOpen(false)}
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
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
          {/* Lion + logotype, the "Logo + Icon" lockup from the brand
              guidelines. Both are the official vector artwork. */}
          <Image src="/brand/icons/lion.svg" width={36} height={36} alt="" aria-hidden="true" />
          <Image
            src="/brand/logo/logo-wordmark.svg"
            width={74}
            height={26}
            alt=""
            aria-hidden="true"
            className={styles.wordmark}
          />
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          {nav.map((item) =>
            item.children && item.children.length > 0 ? (
              <NavDropdown
                key={item.key}
                item={item}
                subPages={item.children}
                isActive={active === item.key}
              />
            ) : (
              <Link
                key={item.key}
                href={item.href}
                className={`${styles.navLink} ${active === item.key ? styles.navLinkActive : ''}`}
                aria-current={active === item.key ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
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
        {/* Sub-pages are listed inline on mobile rather than hidden behind a
            second tap — the panel is already a disclosure. */}
        <nav className={styles.mobileNav} aria-label="Mobile primary">
          {nav.map(({ key, label, href, children }) => (
            <div key={key} className={styles.mobileNavItem}>
              <Link
                href={href}
                className={`${styles.mobileNavLink} ${active === key ? styles.mobileNavLinkActive : ''}`}
                aria-current={active === key ? 'page' : undefined}
                onClick={onMobileNavigate}
              >
                {label}
              </Link>
              {children && children.length > 0 && (
                <div className={styles.mobileSubNav}>
                  {children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={styles.mobileSubNavLink}
                      onClick={onMobileNavigate}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        {mobileActions && <div className={styles.mobileActions}>{mobileActions}</div>}
      </div>
    </header>
  );
}
