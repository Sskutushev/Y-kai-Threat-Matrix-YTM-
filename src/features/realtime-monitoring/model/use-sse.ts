import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { SseEventSchema } from '@/entities/anomaly/model/types';

export const useAnomalySSE = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Create EventSource connection to SSE endpoint
    const eventSource = new EventSource('/api/sse');

    eventSource.onmessage = (event) => {
      try {
        const eventData = JSON.parse(event.data);

        // Only process events that are anomaly updates
        if (eventData.id) {
          // Validate the event data using Zod
          const validatedData = SseEventSchema.parse(eventData);

          // Update the specific anomaly in the query cache without refetching
          queryClient.setQueryData<import('@/entities/anomaly/model/types').Anomaly[]>(
            ['anomalies'],
            (old) => {
              if (!old) return old;
              return old.map((anomaly) =>
                anomaly.id === validatedData.id
                  ? { ...anomaly, threatLevel: validatedData.threatLevel }
                  : anomaly
              );
            }
          );
        }
      } catch (error) {
        // console.error('Error processing SSE event:', error);
      }
    };

    eventSource.onerror = (error) => {
      // console.error('SSE connection error:', error);
      eventSource.close();
    };

    // Cleanup function to close the connection when component unmounts
    return () => {
      eventSource.close();
    };
  }, [queryClient]);
};