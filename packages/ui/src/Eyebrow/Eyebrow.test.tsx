import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Eyebrow } from './Eyebrow';

describe('Eyebrow', () => {
  it('renders children', () => {
    render(<Eyebrow>What we do</Eyebrow>);
    expect(screen.getByText('What we do')).toBeInTheDocument();
  });

  it('applies a custom color via inline style', () => {
    const { container } = render(<Eyebrow color="rgb(230, 174, 33)">Featured</Eyebrow>);
    const div = container.firstElementChild as HTMLElement;
    expect(div.style.color).toBe('rgb(230, 174, 33)');
  });
});
