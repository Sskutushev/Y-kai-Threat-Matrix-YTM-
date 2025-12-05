import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/client';
import { AnomaliesResponseSchema, type AnomaliesResponse } from './types';

// Fetch function with Zod validation
export const fetchAnomalies = async (): Promise<AnomaliesResponse> => {
  const data = await apiClient<unknown>('/api/anomalies');
  const validatedData = AnomaliesResponseSchema.parse(data);

  // Ensure we return plain objects without methods or complex prototypes
  return JSON.parse(JSON.stringify(validatedData));
};

// React Query hook
export const useAnomaliesQuery = () => {
  return useQuery<AnomaliesResponse, Error>({
    queryKey: ['anomalies'],
    queryFn: fetchAnomalies,
    staleTime: Infinity, // Data won't be considered stale
    retry: 1, // Retry once on failure
  });
};