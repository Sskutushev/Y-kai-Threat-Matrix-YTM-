import { NextRequest, NextResponse } from 'next/server';
import { getAllAnomalies } from '@/shared/api/db';
import { z } from 'zod';

// Response schema for validation
const AnomaliesResponseSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    threatLevel: z.enum(['low', 'medium', 'high', 'critical']),
    location: z.string(),
    status: z.enum(['active', 'captured']),
    description: z.string().optional(),
    lastUpdated: z.number(),
  })
);

export async function GET(request: NextRequest) {
  try {
    const anomalies = getAllAnomalies();

    // Validate the response before sending
    const validatedData = AnomaliesResponseSchema.parse(anomalies);

    // Ensure we return only plain objects without methods or complex prototypes
    return NextResponse.json(JSON.parse(JSON.stringify(validatedData)));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: error.errors
        },
        { status: 500 }
      );
    }

    const apiError = error as any;
    if (apiError?.name === 'ApiError') {
      return NextResponse.json(
        {
          error: apiError.message,
          status: apiError.status
        },
        { status: apiError.status }
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