export const apiClient = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData: unknown = await response.json().catch(() => null);
    const error = new Error(`API request failed: ${response.status} ${response.statusText}`) as Error & { status: number; data: unknown; name: string };
    error.status = response.status;
    error.data = errorData;
    error.name = 'ApiError';
    throw error;
  }

  // Handle GET requests that might return empty body
  if (response.status === 204) {
    return {} as T; // Return an empty object if T allows, or undefined. The function signature promises T.
  }

  const data = await response.json();
  // Ensure we return only plain objects without methods
  return JSON.parse(JSON.stringify(data));
};