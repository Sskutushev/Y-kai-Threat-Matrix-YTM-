import React from 'react';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useAnomaliesQuery,
  fetchAnomalies,
} from '@/entities/anomaly/model/queries';

// Mock the apiClient function
jest.mock('@/shared/api/client', () => ({
  apiClient: jest.fn(),
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

describe('Anomaly Queries', () => {
  test('should have proper structure', () => {
    expect(useAnomaliesQuery).toBeDefined();
    expect(fetchAnomalies).toBeDefined();
  });

  test('should useAnomaliesQuery return structure', () => {
    const { result } = renderHook(() => useAnomaliesQuery(), { wrapper });

    // Check that the hook returns the expected structure
    expect(result.current).toHaveProperty('data');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('isSuccess');
    expect(result.current).toHaveProperty('isError');
  });
});
