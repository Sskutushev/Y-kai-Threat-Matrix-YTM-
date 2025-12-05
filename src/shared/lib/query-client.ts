import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Data won't be considered stale
      retry: 1, // Retry once on failure
    },
  },
});