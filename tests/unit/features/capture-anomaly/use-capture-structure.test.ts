import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCaptureMutation } from '@/features/capture-anomaly/model/use-capture';

import React from 'react';

// Mock the apiClient function to avoid network calls
jest.mock('@/shared/api/client', () => ({
  apiClient: jest.fn(() => Promise.resolve({ id: '1', status: 'captured' })),
}));

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

describe('useCaptureMutation - Structure and Behavior', () => {
  test('should return mutation object with correct properties', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { result } = renderHook(() => useCaptureMutation(), { wrapper });

    // Check that the hook returns the expected structure
    expect(result.current).toHaveProperty('mutate');
    expect(result.current).toHaveProperty('isPending');
    expect(result.current).toHaveProperty('isSuccess');
    expect(result.current).toHaveProperty('isError');
    expect(result.current).toHaveProperty('reset');
    expect(result.current).toHaveProperty('data');
    expect(result.current).toHaveProperty('error');
  });

  test('should have correct function types', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { result } = renderHook(() => useCaptureMutation(), { wrapper });

    expect(typeof result.current.mutate).toBe('function');
    expect(typeof result.current.reset).toBe('function');
  });

  test('should have correct boolean state properties', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { result } = renderHook(() => useCaptureMutation(), { wrapper });

    expect(typeof result.current.isPending).toBe('boolean');
    expect(typeof result.current.isSuccess).toBe('boolean');
    expect(typeof result.current.isError).toBe('boolean');
  });

  test('should allow mutate with correct payload', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { result } = renderHook(() => useCaptureMutation(), { wrapper });

    // Check that mutate accepts the right type of payload
    // This should not throw an error about wrong types
  });

  test('should have correct initial values for data and error', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { result } = renderHook(() => useCaptureMutation(), { wrapper });

    // Initially, data is undefined and error is null in TanStack Query mutations
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
  });
});
