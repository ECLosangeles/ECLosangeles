'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { LOGO_SRC } from '../brand';
import styles from './Header.module.css';

export type NavKey =
  | 'about'
  | 'programs'
  /** The "Media Gallery" menu, which lives under /events */
  | 'events'
  | 'donate'
  | 'membership'
  | 'volunteer';

export interface HeaderNavChild {
  label: string;
  href: string;
  /** Third-level pages, shown in a flyout beside this item */
  children?: ReadonlyArray<HeaderNavChild>;
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

const CARET_PATH = 'M1 1.5 5 5.5 9 1.5';

function Caret({ open, rotated }: { open: boolean; rotated?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`${rotated ? styles.caretSide : ''} ${open ? styles.navCaretOpen : ''}`}
      width="10"
      height="7"
      viewBox="0 0 10 7"
      fill="none"
    >
      <path
        d={CARET_PATH}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface DropdownItemProps {
  child: HeaderNavChild;
  onNavigate: () => void;
}

/**
 * A row inside a dropdown. Leaf rows are plain links; a row with its own
 * sub-pages keeps its link and opens a flyout to the side for them.
 */
function DropdownItem({ child, onNavigate }: DropdownItemProps) {
  const [open, setOpen] = useState(false);
  const submenuId = useId();
  const subPages = child.children;

  if (!subPages || subPages.length === 0) {
    return (
      <Link href={child.href} className={styles.dropdownLink} onClick={onNavigate}>
        {child.label}
      </Link>
    );
  }

  return (
    <div
      className={styles.dropdownGroup}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <div className={styles.dropdownRow}>
        <Link href={child.href} className={styles.dropdownLink} onClick={onNavigate}>
          {child.label}
        </Link>
        <button
          type="button"
          className={styles.subCaret}
          aria-label={`${child.label} sub-pages`}
          aria-expanded={open}
          aria-controls={submenuId}
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          <Caret open={open} rotated />
        </button>
      </div>
      <div id={submenuId} className={styles.submenu} hidden={!open}>
        {subPages.map((grandChild) => (
          <Link
            key={grandChild.href}
            href={grandChild.href}
            className={styles.dropdownLink}
            onClick={onNavigate}
          >
            {grandChild.label}
          </Link>
        ))}
      </div>
    </div>
  );
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
        <Caret open={open} />
      </button>
      <div id={menuId} className={styles.dropdown} hidden={!open}>
        {subPages.map((child) => (
          <DropdownItem key={child.href} child={child} onNavigate={() => setOpen(false)} />
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
          {/* The official ECLA logotype — one asset, not a mark + wordmark
              lockup, because the artwork already carries both. Loaded eagerly:
              it is above the fold on every page. */}
          <Image
            src={LOGO_SRC}
            width={92}
            height={36}
            alt=""
            aria-hidden="true"
            priority
            className={styles.logo}
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
                    <div key={child.href}>
                      <Link
                        href={child.href}
                        className={styles.mobileSubNavLink}
                        onClick={onMobileNavigate}
                      >
                        {child.label}
                      </Link>
                      {child.children && child.children.length > 0 && (
                        <div className={styles.mobileSubNav}>
                          {child.children.map((grandChild) => (
                            <Link
                              key={grandChild.href}
                              href={grandChild.href}
                              className={styles.mobileSubNavLink}
                              onClick={onMobileNavigate}
                            >
                              {grandChild.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
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
