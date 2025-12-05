import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnomalyDashboard } from '@/widgets/anomaly-dashboard/ui/AnomalyDashboard';

// Mock the useAnomalySSE hook since it uses EventSource which isn't available in tests
jest.mock('@/features/realtime-monitoring/model/use-sse', () => ({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useAnomalySSE: () => {},
}));

// Create a mock implementation that can be changed
const mockUseAnomaliesQuery = jest.fn();

// Mock the useAnomaliesQuery hook to return mock data
jest.mock('@/entities/anomaly/model/queries', () => ({
  useAnomaliesQuery: () => mockUseAnomaliesQuery(),
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

describe('AnomalyDashboard', () => {
  beforeEach(() => {
    // Reset the mock to return no data by default
    mockUseAnomaliesQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });
  });

  test('should render without crashing', () => {
    render(<AnomalyDashboard />, { wrapper });

    // When there are no anomalies, it should show "No Anomalies Detected"
    expect(screen.getByText(/no anomalies detected/i)).toBeInTheDocument();
  });

  test('should render loading state', () => {
    mockUseAnomaliesQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(<AnomalyDashboard />, { wrapper });

    expect(
      screen.getByText(/loading spiritual anomalies/i)
    ).toBeInTheDocument();
  });

  test('should render anomalies', () => {
    mockUseAnomaliesQuery.mockReturnValue({
      data: [
        {
          id: '1',
          name: 'Test Yokai',
          threatLevel: 'high',
          location: 'Test Location',
          status: 'active',
          description: 'Test Description',
          lastUpdated: Date.now(),
        },
      ],
      isLoading: false,
      error: null,
    });

    render(<AnomalyDashboard />, { wrapper });

    expect(screen.getByText(/test yokai/i)).toBeInTheDocument();
    expect(screen.getByText(/test location/i)).toBeInTheDocument();
  });
});
