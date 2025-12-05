import React from 'react';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAnomalySSE } from '@/features/realtime-monitoring/model/use-sse';

// Mock EventSource
class MockEventSource {
  onopen: ((this: EventSource, ev: Event) => any) | null = null;
  onmessage: ((this: EventSource, ev: MessageEvent) => any) | null = null;
  onerror: ((this: EventSource, ev: Event) => any) | null = null;
  readyState = 1; // OPEN
  url = '';
  withCredentials = false;

  constructor(url: string) {
    this.url = url;
  }

  close = jest.fn();
  addEventListener = jest.fn();
  removeEventListener = jest.fn();
  dispatchEvent = jest.fn();
}

// Mock window.EventSource
Object.defineProperty(window, 'EventSource', {
  value: MockEventSource,
  writable: true,
});

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

describe('useAnomalySSE', () => {
  beforeEach(() => {
    // Clear any existing query cache
    const queryClient = new QueryClient();
    queryClient.clear();
  });

  test('should initialize SSE connection', () => {
    const { result } = renderHook(() => useAnomalySSE(), { wrapper });

    // The hook should run without errors
    expect(result.current).toBeUndefined();
  });
});
