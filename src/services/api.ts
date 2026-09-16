const API_BASE_URL =
  'http://192.168.1.5:5000/api';

type ApiOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  token?: string;
};

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      method: options.method || 'GET',

      headers: {
        'Content-Type': 'application/json',

        ...(options.token
          ? {
              Authorization:
                `Bearer ${options.token}`,
            }
          : {}),
      },

      ...(options.body
        ? {
            body: JSON.stringify(
              options.body
            ),
          }
        : {}),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        'Something went wrong.'
    );
  }

  return data;
}

export { API_BASE_URL };
