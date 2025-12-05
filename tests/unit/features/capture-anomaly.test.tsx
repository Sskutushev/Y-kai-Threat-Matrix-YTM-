// Polyfill for Response object in jsdom environment
const { Response } = require('node-fetch');
global.Response = Response;

import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCaptureMutation } from '@/features/capture-anomaly/model/use-capture';
import { Anomaly } from '@/entities/anomaly/model/types';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
};

const wrapper = (queryClient: QueryClient) =>
  function CreatedWrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

const mockAnomalies: Anomaly[] = [
  {
    id: '1',
    name: 'Kitsune',
    location: 'Shibuya',
    threatLevel: 'high',
    status: 'active',
    description: 'A sly fox spirit.',
    lastUpdated: Date.now(),
  },
];

describe('useCaptureMutation', () => {
  it('should optimistically update the status to "captured" and succeed', async () => {
    server.use(
      http.post('/api/capture', () => {
        return HttpResponse.json({
          ...mockAnomalies[0],
          status: 'captured',
        });
      })
    );

    const queryClient = createTestQueryClient();
    queryClient.setQueryData(['anomalies'], mockAnomalies);

    const { result } = renderHook(() => useCaptureMutation(), {
      wrapper: wrapper(queryClient),
    });

    result.current.mutate({ id: '1' });

    await waitFor(() => {
      const updatedAnomalies = queryClient.getQueryData<Anomaly[]>(['anomalies']);
      expect(updatedAnomalies?.[0].status).toBe('captured');
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });

  it('should rollback the status on mutation error', async () => {
    server.use(
      http.post('/api/capture', () => {
        return new HttpResponse(JSON.stringify({ error: 'Capture failed!' }), {
          status: 500,
        });
      })
    );

    const queryClient = createTestQueryClient();
    queryClient.setQueryData(['anomalies'], mockAnomalies);

    const { result } = renderHook(() => useCaptureMutation(), {
      wrapper: wrapper(queryClient),
    });

    result.current.mutate({ id: '1' });

    // First, check the optimistic update
    await waitFor(() => {
      const updatedAnomalies = queryClient.getQueryData<Anomaly[]>(['anomalies']);
      expect(updatedAnomalies?.[0].status).toBe('captured');
    });

    // Then, wait for the rollback
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    const finalAnomalies = queryClient.getQueryData<Anomaly[]>(['anomalies']);
    expect(finalAnomalies?.[0].status).toBe('active');
  });
});
