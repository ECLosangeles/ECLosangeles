import type { Metadata } from 'next';
import { Eyebrow, ProgramCard } from '@eclosangeles/ui';
import type { Locale } from '@/i18n/routing';
import { getProgramsContent } from '@/lib/sanity/home';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Programs',
  description:
    'Seven program areas serving Ethiopian families across Greater Los Angeles — child & parent, youth, senior services, immigration, medical health, mental health, social & cultural.',
};

export default async function ProgramsIndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const programs = await getProgramsContent(locale);

  return (
    <main className={styles.main}>
      <div className={styles.intro}>
        <Eyebrow>{programs?.eyebrow ?? 'What we do'}</Eyebrow>
        <h1 className={styles.title}>{programs?.title ?? 'Programs'}</h1>
        {programs?.description ? <p className={styles.lead}>{programs.description}</p> : null}
      </div>
      <div className={styles.grid}>
        {(programs?.items ?? []).map((p) => (
          <ProgramCard key={p.slug} program={p} linkPrefix={`/${locale}`} />
        ))}
      </div>
    </main>
  );
}
