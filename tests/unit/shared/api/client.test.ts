import { apiClient } from '@/shared/api/client';

// Mock the fetch function
global.fetch = jest.fn();

describe('apiClient', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  test('should make a GET request', async () => {
    const mockResponse = { data: 'test' };
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
      ok: true,
      status: 200,
    });

    const result = await apiClient('/test-endpoint');

    expect(global.fetch).toHaveBeenCalledWith('/test-endpoint', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    expect(result).toEqual(mockResponse);
  });

  test('should make a request with options', async () => {
    const mockResponse = { data: 'test' };
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
      ok: true,
      status: 200,
    });

    const options = {
      method: 'POST',
      headers: { Authorization: 'Bearer token' },
      body: JSON.stringify({ test: 'data' }),
    };

    const result = await apiClient('/test-endpoint', options);

    // Check the actual call that was made
    const callArgs = (global.fetch as jest.Mock).mock.calls[0];
    const actualOptions = callArgs[1];

    // The implementation merges headers with defaults first, then adds other options
    // So the content-type should be preserved when not explicitly overridden
    expect(actualOptions.headers).toMatchObject({
      'Content-Type': 'application/json',
      Authorization: 'Bearer token',
    });

    // Also verify other options
    expect(actualOptions.method).toBe('POST');
    expect(actualOptions.body).toBe(JSON.stringify({ test: 'data' }));

    expect(result).toEqual(mockResponse);
  });

  test('should throw an error for non-ok responses', async () => {
    const mockJson = jest.fn().mockResolvedValue({ error: 'Not found' });
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      json: mockJson,
    });

    await expect(apiClient('/test-endpoint')).rejects.toThrow(
      'API request failed: 404 Not Found'
    );
  });

  test('should throw an error when fetch fails', async () => {
    const error = new Error('Network error');
    (global.fetch as jest.Mock).mockRejectedValue(error);

    await expect(apiClient('/test-endpoint')).rejects.toThrow('Network error');
  });
});
