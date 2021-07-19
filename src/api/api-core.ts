/**
 * Error wrapper for failed API Responses.
 * This will capture the original response which gives access to
 * information like `status` and `body`.
 * See also: `isApiResponseError`
 */
export class ApiResponseError extends Error {
  response: Response;

  constructor(response: Response) {
    super(`API responded with ${response.status}`);
    this.response = response;
  }
}

/**
 * Helper function to narrow the type of an error to an `ApiResponseError`.
 * This allows for type safe access to the `response` property.
 */
export function isApiResponseError(err: Error): err is ApiResponseError {
  return "response" in err;
}

/**
 * Wrapper over `fetch` which assumes content-type of JSON.
 * This will also throw when `response.ok` is False.
 */
async function fetchJson<T>(url: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new ApiResponseError(response);
  }

  return response.json();
}

/**
 * Utility for a GET request which sets the content-type to JSON.
 */
export async function getJson<T>(
  url: string,
  init: RequestInit = {}
): Promise<T> {
  return fetchJson(url, {
    ...init,
    method: "GET",
  });
}

/**
 * Utility for a POST request which sets the content-type to JSON.
 */
export async function postJson<T>(
  url: string,
  body: unknown,
  init: RequestInit = {}
): Promise<T> {
  return fetchJson(url, {
    ...init,
    body: JSON.stringify(body),
    method: "POST",
  });
}
