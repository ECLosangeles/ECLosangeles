'use client';

import { useId, useState } from 'react';
import styles from './DocumentEmbed.module.css';

export interface DocumentEmbedProps {
  /** Path to the PDF under `public/`, e.g. "/docs/guide.pdf" */
  src: string;
  /** Title shown above the viewer and used as the link label */
  title: string;
  /** One-line summary of what the document covers */
  description?: string;
  /** Who produced it — third-party resources must be credited */
  source?: string;
  /** Page count, shown so readers know the length before opening */
  pages?: number;
  /** Human-readable download size, e.g. "8.8 MB" */
  size?: string;
  /** Render the viewer immediately instead of behind a button */
  defaultOpen?: boolean;
}

/**
 * Shows a PDF inline, exactly as supplied — no re-typesetting, no rewriting.
 *
 * The viewer mounts on demand rather than on page load. These guides are
 * photo-heavy (one is 8.8 MB), and embedding several of them unconditionally
 * would push that to every visitor before they had asked to read anything —
 * a real cost for readers on phone data, who are much of the audience here.
 *
 * `<object>` rather than `<iframe>`: browsers without a built-in PDF viewer —
 * including most mobile browsers, which refuse to render PDFs inline at all —
 * fall back to the child content instead of showing an empty frame. The
 * "open in a new tab" link is therefore a genuine fallback, not decoration,
 * and is always present regardless of whether the viewer is open.
 */
export function DocumentEmbed({
  src,
  title,
  description,
  source,
  pages,
  size,
  defaultOpen = false,
}: DocumentEmbedProps) {
  const [open, setOpen] = useState(defaultOpen);
  const viewerId = useId();
  const meta = [pages ? `${pages} pages` : null, size, source].filter(Boolean).join(' · ');

  return (
    <section className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {meta && <p className={styles.meta}>{meta}</p>}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.button}
          onClick={() => setOpen((isOpen) => !isOpen)}
          aria-expanded={open}
          aria-controls={viewerId}
        >
          {open ? 'Close document' : 'Read it here'}
        </button>
        <a className={styles.link} href={src} target="_blank" rel="noopener noreferrer">
          Open in a new tab (PDF)
        </a>
      </div>

      {open && (
        <div id={viewerId}>
          <object className={styles.object} data={src} type="application/pdf" aria-label={title}>
            <div className={styles.fallback}>
              <p className={styles.fallbackText}>
                Your browser can&apos;t display this PDF inline.
              </p>
              <a className={styles.link} href={src} target="_blank" rel="noopener noreferrer">
                Open {title} (PDF) →
              </a>
            </div>
          </object>
          {/* A second control so a reader who has scrolled through a 10-page
              document doesn't have to scroll back up to collapse it. */}
          <div className={styles.closeRow}>
            <button type="button" className={styles.buttonQuiet} onClick={() => setOpen(false)}>
              Close document
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
