'use client';

import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header, type HeaderNavItem, type NavKey } from '@eclosangeles/ui';

const NAV_SEGMENTS = new Set<NavKey>(['about', 'programs', 'events', 'stories', 'membership']);

function getActiveNavKey(segment: string | null): NavKey | undefined {
  return segment && NAV_SEGMENTS.has(segment as NavKey) ? (segment as NavKey) : undefined;
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
