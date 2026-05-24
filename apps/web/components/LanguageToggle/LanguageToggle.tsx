'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import styles from './LanguageToggle.module.css';

/**
 * Switches between locales using next-intl's locale-aware router.
 * The router preserves the current pathname while changing the locale prefix.
 */
export function LanguageToggle() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('LanguagePicker');
  const [isPending, startTransition] = useTransition();

  const next: Locale = locale === 'en' ? 'am' : 'en';

  const onToggle = () => {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={onToggle}
      disabled={isPending}
      aria-label={`${t('ariaLabel')} — ${locale === 'en' ? t('english') : t('amharic')}`}
    >
      <span className={`${styles.amharic} ${locale === 'am' ? styles.active : ''}`} lang="am">
        አማ
      </span>
      <span className={styles.divider}>/</span>
      <span className={locale === 'en' ? styles.active : ''}>EN</span>
    </button>
  );
}
