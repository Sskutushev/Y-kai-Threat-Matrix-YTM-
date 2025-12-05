import { NextRequest } from 'next/server';
import { resetAnomalies } from '@/shared/api/db';

export async function POST(_request: NextRequest) {
  try {
    // Reset all anomalies to their initial state
    const resetAnomaliesResult = resetAnomalies();

    // Create a response using the standard Response object
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Yokai have been reset successfully',
        count: resetAnomaliesResult.length,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error resetting anomalies:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to reset yokai',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
