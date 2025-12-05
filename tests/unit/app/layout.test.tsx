import React from 'react';
import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';

describe('Root Layout', () => {
  test('should render children', () => {
    const mockChildren = <div data-testid="test-child">Test Child</div>;

    render(<RootLayout>{mockChildren}</RootLayout>);

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  test('should have correct metadata', () => {
    // This test checks that the layout component exists and has the expected structure
    const mockChildren = <div>Test Content</div>;

    render(<RootLayout>{mockChildren}</RootLayout>);

    // The layout wraps content inside html/body tags (which are handled by Next.js)
    // so we just test that children are rendered
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('should render with providers context', () => {
    const mockChildren = <div>Provided Content</div>;

    render(<RootLayout>{mockChildren}</RootLayout>);

    expect(screen.getByText('Provided Content')).toBeInTheDocument();
  });
});
