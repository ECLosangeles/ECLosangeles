import { Eyebrow } from '@eclosangeles/ui';
import type { DocumentLibrary } from '@/lib/content';
import styles from './DocumentLibraryPage.module.css';

export interface DocumentLibraryPageProps {
  library: DocumentLibrary;
}

/**
 * Shared layout for the accountability pages (annual reports, bylaws,
 * financials). Each one is the same thing — a heading plus a list of files —
 * so they share a single presentation and differ only in their content entry.
 */
export function DocumentLibraryPage({ library }: DocumentLibraryPageProps) {
  const { eyebrow, title, documents } = library;

  return (
    <main className={styles.main}>
      <div className={styles.intro}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className={styles.title}>{title}</h1>
      </div>
      {documents.length === 0 ? (
        <p className={styles.empty}>Documents will be posted here soon.</p>
      ) : (
        <ul className={styles.list}>
          {documents.map((document) => (
            <li key={document.href} className={styles.item}>
              <h2 className={styles.itemTitle}>
                <a
                  href={document.href}
                  className={styles.itemLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {document.title}
                </a>
              </h2>
              <a
                href={document.href}
                className={styles.download}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open PDF <span aria-hidden="true">↗</span>
                <span className={styles.srOnly}> — {document.title}, opens in a new tab</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
