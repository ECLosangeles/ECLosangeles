import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Locale-aware navigation primitives. Use these instead of importing directly
 * from `next/link` and `next/navigation` in any code that should respect the
 * current locale.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
