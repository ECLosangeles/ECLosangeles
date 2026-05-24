/**
 * @eclosangeles/design-tokens
 *
 * The design token CSS lives at `./colors_and_type.css`. Import it once
 * from any consuming app:
 *
 *   import '@eclosangeles/design-tokens/colors_and_type.css';
 *
 * The TypeScript exports below mirror the CSS variable names for type-safe
 * access in JS/TS code (e.g. inline-style fallbacks, theme-aware helpers).
 */

export const tokenNames = {
  bg: {
    base: 'var(--bg-base)',
    surface: 'var(--bg-surface)',
    elevated: 'var(--bg-elevated)',
    inverse: 'var(--bg-inverse)',
    muted: 'var(--bg-muted)',
    tinted: 'var(--bg-tinted)',
  },
  fg: {
    primary: 'var(--fg-1)',
    secondary: 'var(--fg-2)',
    tertiary: 'var(--fg-3)',
    muted: 'var(--fg-muted)',
    onInverse: 'var(--fg-on-inverse)',
    brand: 'var(--fg-brand)',
    cta: 'var(--fg-cta)',
    link: 'var(--fg-link)',
  },
  font: {
    display: 'var(--font-display)',
    body: 'var(--font-body)',
    amharic: 'var(--font-amharic)',
    mono: 'var(--font-mono)',
  },
  space: {
    0: 'var(--space-0)',
    1: 'var(--space-1)',
    2: 'var(--space-2)',
    3: 'var(--space-3)',
    4: 'var(--space-4)',
    5: 'var(--space-5)',
    6: 'var(--space-6)',
    7: 'var(--space-7)',
    8: 'var(--space-8)',
    9: 'var(--space-9)',
    10: 'var(--space-10)',
    11: 'var(--space-11)',
  },
  radius: {
    xs: 'var(--radius-xs)',
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    pill: 'var(--radius-pill)',
  },
  shadow: {
    xs: 'var(--shadow-xs)',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    focus: 'var(--shadow-focus)',
  },
  motion: {
    easeStandard: 'var(--ease-standard)',
    easeEmphasis: 'var(--ease-emphasis)',
    durationFast: 'var(--duration-fast)',
    durationBase: 'var(--duration-base)',
    durationSlow: 'var(--duration-slow)',
  },
  layout: {
    containerMax: 'var(--container-max)',
    containerWide: 'var(--container-wide)',
    containerNarrow: 'var(--container-narrow)',
    headerHeight: 'var(--header-height)',
  },
} as const;

export type TokenNames = typeof tokenNames;
