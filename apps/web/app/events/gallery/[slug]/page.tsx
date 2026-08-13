import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Eyebrow } from '@eclosangeles/ui';
import { findGalleryBySlug, getEventGallerySlugs } from '@/lib/content';
import styles from './page.module.css';

export async function generateStaticParams() {
  const slugs = await getEventGallerySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const gallery = await findGalleryBySlug(slug);
  if (!gallery) return { title: 'Gallery not found' };
  return {
    title: gallery.title,
    description: gallery.description ?? `Photos from ${gallery.title}.`,
  };
}

export default async function EventGalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gallery = await findGalleryBySlug(slug);
  if (!gallery) notFound();

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <Link href="/events/gallery" className={styles.back}>
          ← Gallery of Events
        </Link>
        <Eyebrow>Gallery</Eyebrow>
        <h1 className={styles.title}>{gallery.title}</h1>
        {gallery.date && <p className={styles.date}>{gallery.date}</p>}
        {gallery.description && <p className={styles.lead}>{gallery.description}</p>}

        {gallery.images.length > 0 ? (
          <ul className={styles.grid}>
            {gallery.images.map((image) => (
              <li key={image.src} className={styles.item}>
                <figure className={styles.figure}>
                  {/* Real asset dimensions, so photos keep their own aspect
                      ratio — editors upload a mix of portrait and landscape.
                      The CSS scales to the column width. */}
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className={styles.image}
                    sizes="(max-width: 700px) 100vw, (max-width: 1040px) 50vw, 33vw"
                    {...(image.lqip
                      ? { placeholder: 'blur' as const, blurDataURL: image.lqip }
                      : {})}
                  />
                  {image.caption && (
                    <figcaption className={styles.caption}>{image.caption}</figcaption>
                  )}
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          /* The page ships before the photos do — say so plainly rather than
             showing an empty grid. */
          <p className={styles.empty}>
            Photos from this event are being collected. Check back soon.
          </p>
        )}
      </div>
    </main>
  );
}
