import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/shared/ui/Button/Button';

describe('Button', () => {
  test('renders with default props', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('primary'); // Default variant
    expect(button).toHaveClass('md'); // Default size
  });

  test('renders with different variants', () => {
    const { rerender } = render(<Button variant="secondary">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('secondary');

    rerender(<Button variant="danger">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('danger');
  });

  test('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('sm');

    rerender(<Button size="lg">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('lg');
  });

  test('renders as disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('handles click events', () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Clickable Button</Button>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('renders with custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  test('renders as loading state', () => {
    render(<Button isLoading>Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    // When loading, the button should have a spinner, not text content
    expect(button.querySelector('.spinner')).toBeInTheDocument();
  });

  test('renders with loading state and disabled', () => {
    render(<Button isLoading>Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
