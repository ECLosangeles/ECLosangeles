'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Eyebrow } from '@eclosangeles/ui';
import styles from './MembershipForm.module.css';

const schema = z.object({
  tier: z.enum(['regular', 'retired']),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Enter a valid email'),
  autoRenew: z.boolean(),
});

type MembershipFormValues = z.infer<typeof schema>;

const TIER_PRICE: Record<MembershipFormValues['tier'], number> = {
  regular: 60,
  retired: 30,
};

export function MembershipForm() {
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MembershipFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      tier: 'regular',
      firstName: '',
      lastName: '',
      email: '',
      autoRenew: true,
    },
  });

  const tier = watch('tier');

  async function onSubmit(values: MembershipFormValues) {
    try {
      const res = await fetch('/api/membership', {
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
        <Eyebrow color="var(--fg-brand)">Welcome</Eyebrow>
        <h2 className={styles.successTitle}>You&apos;re on the list.</h2>
        <p className={styles.successBody}>
          Membership signup isn&apos;t live yet, but your form was received. When the payment system
          is wired up, this is where you&apos;ll complete payment and become an official ECLA
          member.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.card} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Eyebrow>Choose your tier</Eyebrow>
      <Controller
        control={control}
        name="tier"
        render={({ field }) => (
          <div className={styles.tierRow}>
            {(['regular', 'retired'] as const).map((t) => {
              const active = field.value === t;
              return (
                <button
                  key={t}
                  type="button"
                  className={`${styles.tierChip} ${active ? styles.tierChipActive : ''}`}
                  onClick={() => field.onChange(t)}
                >
                  <span className={styles.tierLabel}>
                    {t === 'regular' ? 'Regular' : 'Retired'}
                  </span>
                  <span className={styles.tierPrice}>${TIER_PRICE[t]}/yr</span>
                </button>
              );
            })}
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

      <label className={styles.checkboxRow}>
        <input type="checkbox" {...register('autoRenew')} />
        <span>Auto-renew my membership each year</span>
      </label>

      <div className={styles.submitRow}>
        <Button variant="primary" size="lg" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Processing…' : `Join — $${TIER_PRICE[tier]}/yr`}
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
