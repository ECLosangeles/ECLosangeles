import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Value } from '@eclosangeles/content-schema';
import { ValuesBlock } from './ValuesBlock';

// next/image needs a stub in the test environment — render a plain <img>.
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

const VALUES: ReadonlyArray<Value> = [
  {
    order: 1,
    name: 'Inclusiveness',
    description: 'Everyone belongs.',
    imageSrc: '/a.png',
    imageAlt: 'a',
  },
  { order: 2, name: 'Diversity', description: 'Many voices.', imageSrc: '/b.png', imageAlt: 'b' },
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

  it('renders the image with its alt text', () => {
    render(<ValuesBlock values={VALUES} />);
    expect(screen.getByAltText('a')).toBeInTheDocument();
  });

  it('honors custom eyebrow and title', () => {
    render(<ValuesBlock values={VALUES} eyebrow="Our values" title="Eight values" />);
    expect(screen.getByText('Our values')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Eight values', level: 2 })).toBeInTheDocument();
  });
});
