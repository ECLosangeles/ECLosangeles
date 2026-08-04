import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Value } from '@eclosangeles/content-schema';
import { ValuesBlock } from './ValuesBlock';

const VALUES: ReadonlyArray<Value> = [
  { order: 1, name: 'Inclusiveness', description: 'Everyone belongs.' },
  { order: 2, name: 'Diversity', description: 'Many voices.' },
];

describe('ValuesBlock', () => {
  it('renders each value name and description (always visible, not hover-gated)', () => {
    render(<ValuesBlock values={VALUES} />);
    expect(screen.getByText('Inclusiveness')).toBeInTheDocument();
    expect(screen.getByText('Everyone belongs.')).toBeInTheDocument();
    expect(screen.getByText('Diversity')).toBeInTheDocument();
    expect(screen.getByText('Many voices.')).toBeInTheDocument();
  });

  it('zero-pads the order number', () => {
    render(<ValuesBlock values={VALUES} />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
  });

  it('renders no images — the cards are text-only', () => {
    const { container } = render(<ValuesBlock values={VALUES} />);
    expect(container.querySelector('img')).toBeNull();
  });

  it('honors custom eyebrow and title', () => {
    render(<ValuesBlock values={VALUES} eyebrow="Our values" title="Eight values" />);
    expect(screen.getByText('Our values')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Eight values', level: 2 })).toBeInTheDocument();
  });
});
