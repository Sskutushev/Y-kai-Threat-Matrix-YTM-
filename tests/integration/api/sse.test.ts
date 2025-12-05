import { dynamic as sseDynamic } from '@/app/api/sse/route';

describe('SSE API Integration Tests', () => {
  test('SSE route dynamic config should be set correctly', () => {
    expect(sseDynamic).toBe('force-dynamic');
  });

  test('should verify SSE route configuration', () => {
    // Just test the configuration is correct
    expect(sseDynamic).toBe('force-dynamic');
  });
});
