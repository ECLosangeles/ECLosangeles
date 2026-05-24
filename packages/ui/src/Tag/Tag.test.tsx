import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders children', () => {
    render(<Tag>Featured</Tag>);
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('applies the tone class', () => {
    const { container } = render(<Tag tone="saffron">Recurring</Tag>);
    const span = container.querySelector('span');
    expect(span).not.toBeNull();
    expect(span?.className).toContain('saffron');
  });

  it('defaults to green tone when none specified', () => {
    const { container } = render(<Tag>Default</Tag>);
    const span = container.querySelector('span');
    expect(span?.className).toContain('green');
  });
});
