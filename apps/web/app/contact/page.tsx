import type { Metadata } from 'next';
import { Eyebrow, PlaceholderBanner } from '@eclosangeles/ui';
import { ContactForm } from './ContactForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with ECLA — by email, phone, or in person at 8911 S Western Ave, Los Angeles.',
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <PlaceholderBanner message="This is a preview. Form submissions are not delivered yet — they're mocked." />
        <Eyebrow>Get in touch</Eyebrow>
        <h1 className={styles.title}>Reach the people behind ECLA.</h1>
        <p className={styles.lead}>
          Drop in during walk-in hours, send an email, or use the form below. Real-person replies go
          out within a couple of business days.
        </p>

        <div className={styles.layout}>
          <ContactForm />
          <aside className={styles.aside}>
            <h2 className={styles.asideTitle}>By phone &amp; email</h2>
            <p className={styles.asideRow}>
              <span className={styles.asideLabel}>Phone</span>
              <a href="tel:+13235089960">(323) 508-9960</a>
            </p>
            <p className={styles.asideRow}>
              <span className={styles.asideLabel}>Email</span>
              <a href="mailto:info@eclosangeles.org">info@eclosangeles.org</a>
            </p>
            <h2 className={`${styles.asideTitle} ${styles.asideTitleSpaced}`}>In person</h2>
            <p className={styles.asideAddress}>
              8911 S Western Ave
              <br />
              Los Angeles, CA 90047
            </p>
            <p className={styles.asideNote}>
              Walk-in immigration clinic: Tuesdays, 10 AM – 2 PM. Other programs by appointment.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
