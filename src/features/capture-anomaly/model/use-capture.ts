import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/client';
import toast from 'react-hot-toast';
import { Anomaly } from '@/entities/anomaly/model/types';
import { z } from 'zod';

// Capture response schema
const CaptureResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  threatLevel: z.enum(['low', 'medium', 'high', 'critical']),
  location: z.string(),
  status: z.enum(['active', 'captured']),
  description: z.string().optional(),
  lastUpdated: z.number(),
});

export const useCaptureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const response = await apiClient<unknown>('/api/capture', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Validate the response
      const validatedData = CaptureResponseSchema.parse(response);

      // Ensure we return plain objects without methods or complex prototypes
      return JSON.parse(JSON.stringify(validatedData));
    },
    onMutate: async ({ id }) => {
      // 1. Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: ['anomalies'] });

      // 2. Snapshot previous data
      const previousAnomalies = queryClient.getQueryData<Anomaly[]>(['anomalies']);

      // 3. Optimistic update
      queryClient.setQueryData<Anomaly[]>(['anomalies'], (old) => {
        if (!old) return old;
        return old.map((anomaly) =>
          anomaly.id === id
            ? { ...anomaly, status: 'captured' as const }
            : anomaly
        );
      });

      // Return context for rollback
      return { previousAnomalies };
    },
    onError: (err, { id: _id }, context) => { // Renamed 'id' to '_id'
      // 1. Rollback to previous data
      if (context?.previousAnomalies) {
        queryClient.setQueryData(['anomalies'], context.previousAnomalies);
      }

      // 2. Show error toast
      let errorMessage = 'Failed to capture the yokai';

      if (err instanceof Error) {
        const typedError = err as Error & { status?: number; data?: unknown; name?: string };
        if (typedError.name === 'ApiError') {
          errorMessage = typedError.data?.message || typedError.message;
        } else {
          errorMessage = typedError.message;
        }
      }
      toast.error(errorMessage);
    },
    onSuccess: (data) => {
      // Update the specific anomaly in the cache with the server response
      queryClient.setQueryData<Anomaly[]>(['anomalies'], (old) => {
        if (!old) return old;
        return old.map((anomaly) =>
          anomaly.id === data.id ? { ...data } : anomaly
        );
      });

      // Show success toast
      toast.success(`Successfully captured ${data.name}!`);
    },
    retry: 0, // Don't retry on failure since capture can only happen once
  });
};