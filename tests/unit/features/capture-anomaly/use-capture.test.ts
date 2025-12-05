import React from 'react';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCaptureMutation } from '@/features/capture-anomaly/model/use-capture';

// Create a wrapper component to provide the QueryClient
const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return React.createElement(
    QueryClientProvider,
    { client: queryClient },
    children
  );
};

describe('useCaptureMutation', () => {
  test('should have the correct mutation structure', () => {
    const { result } = renderHook(() => useCaptureMutation(), { wrapper });

    // Check that the hook returns the expected structure
    expect(result.current).toHaveProperty('mutate');
    expect(result.current).toHaveProperty('isPending');
    expect(result.current).toHaveProperty('isSuccess');
    expect(result.current).toHaveProperty('isError');
  });
});
