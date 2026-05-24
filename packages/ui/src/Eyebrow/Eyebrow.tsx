import type { CSSProperties, ReactNode } from 'react';
import styles from './Eyebrow.module.css';

export interface EyebrowProps {
  children: ReactNode;
  /** Color token override — defaults to brand green */
  color?: string;
  className?: string;
}

export function Eyebrow({ children, color, className }: EyebrowProps) {
  const style: CSSProperties | undefined = color ? { color } : undefined;
  return (
    <div className={[styles.eyebrow, className].filter(Boolean).join(' ')} style={style}>
      {children}
    </div>
  );
}
