'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Eyebrow } from '@eclosangeles/ui';
import styles from './ContactForm.module.css';

const TOPICS = ['general', 'programs', 'volunteer', 'press'] as const;

const schema = z.object({
  topic: z.enum(TOPICS),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  message: z.string().min(10, 'Tell us a little more (at least 10 characters)'),
});

type ContactFormValues = z.infer<typeof schema>;

const TOPIC_LABEL: Record<(typeof TOPICS)[number], string> = {
  general: 'General question',
  programs: 'Program services',
  volunteer: 'Volunteering',
  press: 'Press / partnership',
};

export function ContactForm() {
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { topic: 'general', name: '', email: '', message: '' },
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Mock error');
      setSubmitState('success');
    } catch {
      setSubmitState('error');
    }
  }

  if (submitState === 'success') {
    return (
      <div className={styles.successCard}>
        <Eyebrow color="var(--fg-brand)">Thank you</Eyebrow>
        <h2 className={styles.successTitle}>Message received.</h2>
        <p className={styles.successBody}>
          Real-person email delivery isn&apos;t wired up yet, but your form was received. Once
          Resend (or similar) is configured, this is where the message would arrive in our inbox.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.card} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Eyebrow>What&apos;s this about?</Eyebrow>
      <select className={styles.select} {...register('topic')}>
        {TOPICS.map((t) => (
          <option key={t} value={t}>
            {TOPIC_LABEL[t]}
          </option>
        ))}
      </select>

      <Eyebrow className={styles.eyebrowSpaced}>Your details</Eyebrow>
      <FormField label="Name" error={errors.name?.message}>
        <input className={styles.input} placeholder="Selam Bekele" {...register('name')} />
      </FormField>
      <FormField label="Email" error={errors.email?.message}>
        <input
          className={styles.input}
          type="email"
          placeholder="you@example.com"
          {...register('email')}
        />
      </FormField>
      <FormField label="Message" error={errors.message?.message}>
        <textarea
          className={styles.textarea}
          rows={5}
          placeholder="What's on your mind?"
          {...register('message')}
        />
      </FormField>

      <div className={styles.submitRow}>
        <Button variant="primary" size="lg" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send message'}
        </Button>
      </div>
      {submitState === 'error' && (
        <p className={styles.error}>Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
}
