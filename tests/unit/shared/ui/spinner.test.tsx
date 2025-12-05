import React from 'react';
import { render, screen } from '@testing-library/react';
import { Spinner } from '@/shared/ui/Spinner/Spinner';

describe('Spinner', () => {
  test('renders with default size', () => {
    render(<Spinner />);

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('spinner');
    expect(spinner).toHaveClass('md'); // Default size
  });

  test('renders with small size', () => {
    render(<Spinner size="sm" />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('sm');
  });

  test('renders with large size', () => {
    render(<Spinner size="lg" />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('lg');
  });

  test('renders with custom className', () => {
    render(<Spinner className="custom-class" />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('custom-class');
  });

  test('renders with accessibility attributes', () => {
    render(<Spinner />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'Loading...');
  });

  test('renders with custom aria-label', () => {
    render(<Spinner aria-label="Custom loading indicator" />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'Custom loading indicator');
  });
});
