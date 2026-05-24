'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Eyebrow } from '@eclosangeles/ui';
import styles from './DonateForm.module.css';

const PRESET_AMOUNTS = [25, 50, 100, 250, 500] as const;

const schema = z.object({
  amount: z.number().int().positive('Please choose or enter an amount'),
  frequency: z.enum(['monthly', 'one-time']),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Enter a valid email'),
});

type DonateFormValues = z.infer<typeof schema>;

export function DonateForm() {
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DonateFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { amount: 50, frequency: 'monthly', firstName: '', lastName: '', email: '' },
  });

  const amount = watch('amount');
  const frequency = watch('frequency');

  async function onSubmit(values: DonateFormValues) {
    try {
      const res = await fetch('/api/donate', {
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
        <h2 className={styles.successTitle}>We&apos;ll be in touch.</h2>
        <p className={styles.successBody}>
          Donation processing isn&apos;t live yet, but your form was received. When Stripe is wired
          up, this is where the actual donation will be confirmed.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.card} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Eyebrow>Choose an amount</Eyebrow>
      <div className={styles.amountRow}>
        {PRESET_AMOUNTS.map((preset) => (
          <button
            key={preset}
            type="button"
            className={`${styles.amountChip} ${amount === preset ? styles.amountChipActive : ''}`}
            onClick={() => setValue('amount', preset, { shouldValidate: true })}
          >
            ${preset}
          </button>
        ))}
        <div className={styles.customWrap}>
          <span className={styles.dollar}>$</span>
          <input
            type="number"
            min={1}
            placeholder="Other"
            className={styles.customInput}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (Number.isFinite(v) && v > 0) {
                setValue('amount', v, { shouldValidate: true });
              }
            }}
            aria-label="Custom donation amount"
          />
        </div>
      </div>
      {errors.amount && <p className={styles.error}>{errors.amount.message}</p>}

      <Eyebrow className={styles.eyebrowSpaced}>Frequency</Eyebrow>
      <Controller
        control={control}
        name="frequency"
        render={({ field }) => (
          <div className={styles.amountRow}>
            {(['monthly', 'one-time'] as const).map((f) => (
              <button
                key={f}
                type="button"
                className={`${styles.amountChip} ${field.value === f ? styles.amountChipActive : ''}`}
                onClick={() => field.onChange(f)}
              >
                {f === 'monthly' ? 'Monthly' : 'One-time'}
              </button>
            ))}
          </div>
        )}
      />

      <Eyebrow className={styles.eyebrowSpaced}>Your details</Eyebrow>
      <div className={styles.nameRow}>
        <FormField label="First name" error={errors.firstName?.message}>
          <input className={styles.input} placeholder="Selam" {...register('firstName')} />
        </FormField>
        <FormField label="Last name" error={errors.lastName?.message}>
          <input className={styles.input} placeholder="Bekele" {...register('lastName')} />
        </FormField>
      </div>
      <FormField label="Email" error={errors.email?.message}>
        <input
          className={styles.input}
          type="email"
          placeholder="you@example.com"
          {...register('email')}
        />
      </FormField>

      <div className={styles.submitRow}>
        <Button variant="cta" size="lg" type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? 'Processing…'
            : `Donate $${amount}${frequency === 'monthly' ? ' /month' : ''}`}
        </Button>
      </div>
      <p className={styles.disclaimer}>
        ECLA is a 501(c)(3) — your gift is tax-deductible. EIN 84-4910814.
      </p>
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
