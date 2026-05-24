import type { ReactNode } from 'react';
import styles from './Tag.module.css';

export type TagTone = 'green' | 'saffron' | 'red' | 'ink' | 'solid';

export interface TagProps {
  tone?: TagTone;
  children: ReactNode;
  className?: string;
}

export function Tag({ tone = 'green', children, className }: TagProps) {
  return (
    <span className={[styles.tag, styles[tone], className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
}
