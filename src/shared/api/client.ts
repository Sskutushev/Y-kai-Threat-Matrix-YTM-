// Define a serializable error interface instead of a class to avoid prototype issues
export interface ApiErrorData {
  message: string;
  status: number;
  data: any;
  name: string;
}

export const createApiError = (message: string, status: number, data: any = null): ApiErrorData => {
  return {
    message,
    status,
    data,
    name: 'ApiError'
  };
};

export const apiClient = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw createApiError(
      `API request failed: ${response.status} ${response.statusText}`,
      response.status,
      errorData
    );
  }

  // Handle GET requests that might return empty body
  if (response.status === 204) {
    return {} as T;
  }

  const data = await response.json();
  // Ensure we return only plain objects without methods
  return JSON.parse(JSON.stringify(data));
};