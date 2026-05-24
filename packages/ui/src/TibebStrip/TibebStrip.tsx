import type { CSSProperties } from 'react';
import styles from './TibebStrip.module.css';

export interface TibebStripProps {
  /** Strip height in pixels — design system recommends 4–8px */
  height?: number;
  className?: string;
  style?: CSSProperties;
}

export function TibebStrip({ height = 8, className, style }: TibebStripProps) {
  return (
    <div
      className={[styles.strip, className].filter(Boolean).join(' ')}
      style={{
        height,
        backgroundSize: `auto ${height}px`,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
