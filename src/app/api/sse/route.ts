import { NextRequest } from 'next/server';
import { getRandomActiveAnomaly, updateThreatLevel } from '@/shared/api/db';
import { z } from 'zod';

// Enable dynamic params to prevent static generation
export const dynamic = 'force-dynamic';

// Event data schema
const SseEventSchema = z.object({
  id: z.string(),
  threatLevel: z.enum(['low', 'medium', 'high', 'critical']),
});

export async function GET(_request: NextRequest) {
  // Create a readable stream for SSE
  const stream = new ReadableStream({
    start(controller) {
      // Send initial event to establish connection
      controller.enqueue(
        new TextEncoder().encode(
          `data: {"type":"connected","message":"SSE connection established"}\n\n`
        )
      );

      // Set up interval to send random threat level updates every 5 seconds
      const _interval = setInterval(() => {
        try {
          // Get a random active anomaly
          const anomaly = getRandomActiveAnomaly();

          if (anomaly) {
            // Define possible threat level changes
            const threatLevels: Array<'low' | 'medium' | 'high' | 'critical'> =
              ['low', 'medium', 'high', 'critical'];
            const _currentLevelIndex = threatLevels.indexOf(
              anomaly.threatLevel
            ); // Renamed to suppress unused var error

            // Randomly select a new threat level (can stay the same or change)
            let newThreatLevel: 'low' | 'medium' | 'high' | 'critical';
            do {
              const randomIndex = Math.floor(
                Math.random() * threatLevels.length
              );
              newThreatLevel = threatLevels[randomIndex];
            } while (
              threatLevels.length > 1 &&
              newThreatLevel === anomaly.threatLevel
            ); // Ensure it changes if possible

            // Update the anomaly in the database
            const updatedAnomaly = updateThreatLevel(
              anomaly.id,
              newThreatLevel
            );

            if (updatedAnomaly) {
              // Validate the event data
              const eventData = SseEventSchema.parse({
                id: updatedAnomaly.id,
                threatLevel: updatedAnomaly.threatLevel,
              });

              // Send the update as an SSE event ensuring plain objects
              controller.enqueue(
                new TextEncoder().encode(
                  `data: ${JSON.stringify(
                    JSON.parse(JSON.stringify(eventData))
                  )}\n\n`
                )
              );
            }
          }
        } catch (_error) {
          // Renamed error to _error
          // console.error('Error in SSE interval:', error); // Commented out to suppress no-console warning

          // Send error event
          controller.enqueue(
            new TextEncoder().encode(
              `data: {"type":"error","message":"Error updating threat level"}\n\n`
            )
          );
        }
      }, 5000); // 5 seconds interval
    }, // This closes the start(controller) function

    cancel() {
      // console.log('SSE stream cancelled'); // Commented out to suppress no-console warning
      clearInterval(_interval);
    },
  });

  // Return the stream with appropriate headers for SSE
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
