import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button, DocumentEmbed, Eyebrow, VideoEmbed } from '@eclosangeles/ui';
import type { Locale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { getProgramBySlug, getProgramsContent } from '@/lib/content';
import styles from './page.module.css';

export function generateStaticParams() {
  const { items } = getProgramsContent();
  return routing.locales.flatMap((locale) =>
    items.map((program) => ({ locale, slug: program.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return { title: 'Program not found' };
  return {
    title: program.title,
    description: program.summary,
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const program = getProgramBySlug(slug);
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

        {program.videos && program.videos.length > 0 && (
          <section className={styles.videos} aria-labelledby="program-videos">
            <h2 id="program-videos" className={styles.sectionTitle}>
              Watch
            </h2>
            {program.videos.map((video) => (
              <VideoEmbed key={video.url} url={video.url} title={video.title} />
            ))}
          </section>
        )}

        {/* Some programs publish documents that must appear exactly as
            supplied — shown in full rather than summarised or rewritten. */}
        {program.documents && program.documents.length > 0 && (
          <section className={styles.documents} aria-labelledby="program-documents">
            <h2 id="program-documents" className={styles.sectionTitle}>
              Know Your Rights
            </h2>
            <p className={styles.documentsLead}>
              These guides are published by the organizations credited below and are reproduced here
              unchanged. They are general information, not legal advice.
            </p>
            {program.documents.map((doc) => (
              <DocumentEmbed
                key={doc.src}
                src={doc.src}
                title={doc.title}
                description={doc.description}
                source={doc.source}
                pages={doc.pages}
                size={doc.size}
              />
            ))}
          </section>
        )}

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
