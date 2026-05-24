import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Donate</Button>);
    expect(screen.getByRole('button', { name: 'Donate' })).toBeInTheDocument();
  });

  it('fires onClick', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Click me' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('respects disabled', () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Disabled' }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('defaults to type=button (not submit)', () => {
    render(<Button>Default</Button>);
    expect(screen.getByRole('button', { name: 'Default' })).toHaveAttribute('type', 'button');
  });
});
