import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button, Eyebrow } from '@eclosangeles/ui';
import { PROGRAMS, findProgramBySlug } from '@/lib/mock-data';
import styles from './page.module.css';

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = findProgramBySlug(slug);
  if (!program) return { title: 'Program not found' };
  return {
    title: program.title,
    description: program.summary,
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const program = findProgramBySlug(slug);
  if (!program) notFound();

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <Link href={`/${locale}/programs`} className={styles.back}>
          ← All programs
        </Link>
        <Eyebrow>Program</Eyebrow>
        <h1 className={styles.title}>{program.title}</h1>
        <p className={styles.lead}>{program.body ?? program.summary}</p>

        <div className={styles.layout}>
          <div className={styles.body}>
            {program.helpsWith && program.helpsWith.length > 0 && (
              <>
                <h3 className={styles.h3}>What we help with</h3>
                <ul className={styles.list}>
                  {program.helpsWith.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}
            {program.whatToBring && (
              <>
                <h3 className={`${styles.h3} ${styles.h3Spaced}`}>What to bring</h3>
                <p className={styles.bodyText}>{program.whatToBring}</p>
              </>
            )}
          </div>

          {program.walkInClinic && (
            <aside className={styles.aside}>
              <Eyebrow color="var(--fg-cta)">Walk-in clinic</Eyebrow>
              <h3 className={styles.asideTitle}>{program.walkInClinic.schedule}</h3>
              <p className={styles.asideAddress}>
                {program.walkInClinic.address.split('\n').map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </p>
              <Button variant="primary">Book a slot</Button>
              <p className={styles.asideNote}>Or just walk in. No appointment needed.</p>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
