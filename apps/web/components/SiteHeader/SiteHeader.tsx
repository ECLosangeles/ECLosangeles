'use client';

import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header, type HeaderNavItem, type NavKey } from '@eclosangeles/ui';

/**
 * Route segment -> the nav item that should read as active. Most map one to
 * one; donate and membership both sit under the "Contribute" menu.
 */
const SEGMENT_NAV_KEYS: Readonly<Record<string, NavKey>> = {
  about: 'about',
  programs: 'programs',
  events: 'events',
  stories: 'stories',
  donate: 'contribute',
  membership: 'contribute',
};

function getActiveNavKey(segment: string | null): NavKey | undefined {
  return segment ? SEGMENT_NAV_KEYS[segment] : undefined;
}

interface SiteHeaderProps {
  nav: ReadonlyArray<HeaderNavItem>;
  homeHref: string;
}

export function SiteHeader({ nav, homeHref }: SiteHeaderProps) {
  const pathname = usePathname();
  const active = getActiveNavKey(useSelectedLayoutSegment());
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  // No language toggle: the site is English-only.
  return (
    <Header
      nav={nav}
      homeHref={homeHref}
      active={active}
      mobileNavOpen={mobileNavOpen}
      onMobileNavToggle={() => setMobileNavOpen((isOpen) => !isOpen)}
      onMobileNavigate={() => setMobileNavOpen(false)}
    />
  );
}
