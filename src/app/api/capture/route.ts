import { NextRequest, NextResponse } from 'next/server';
import { captureAnomaly, getAnomalyById } from '@/shared/api/db';
import { z } from 'zod';

// Request body schema
const CaptureRequestSchema = z.object({
  id: z.string().min(1, 'Anomaly ID is required'),
});

export async function POST(request: NextRequest) {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Parse and validate the request body
    const body = await request.json();
    const { id } = CaptureRequestSchema.parse(body);

    // Check if the anomaly exists
    const existingAnomaly = getAnomalyById(id);
    if (!existingAnomaly) {
      return NextResponse.json(
        { error: 'Anomaly not found' },
        { status: 404 }
      );
    }
    
    // Check if already captured
    if (existingAnomaly.status === 'captured') {
        return NextResponse.json(
            { error: 'Anomaly already captured' },
            { status: 400 }
        );
    }

    // Simulate 30% error rate
    if (Math.random() < 0.3) {
      return NextResponse.json(
        {
          error: 'Capture failed - anomaly escaped!',
          message: 'The yokai has evaded capture and disappeared temporarily'
        },
        { status: 500 }
      );
    }

    // Attempt to capture the anomaly
    const updatedAnomaly = captureAnomaly(id);
    if (!updatedAnomaly) {
      return NextResponse.json(
        { error: 'Failed to capture anomaly' },
        { status: 500 }
      );
    }

    // Return success response ensuring only plain objects are returned
    return NextResponse.json(JSON.parse(JSON.stringify(updatedAnomaly)));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: error.errors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}