import { API_URL } from "~/env";

class ApiResponseError extends Error {
  response: Response;
  statusCode: number;

  constructor(response: Response) {
    super(`API responded with ${response.status}`);
    this.statusCode = response.status;
    this.response = response;
  }
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
async function getJson<T>(url: string, init: RequestInit = {}): Promise<T> {
  return fetchJson(url, {
    ...init,
    method: "GET",
  });
}

/**
 * Utility for a POST request which sets the content-type to JSON.
 */
async function postJson<T>(
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

interface ExampleResponse {
  message: string;
}

interface ExamplePostArgs {
  name: string;
}

export function fetchExampleApiResponse(): Promise<ExampleResponse> {
  return getJson<ExampleResponse>(`${API_URL}/hello-world`);
}

export function postExampleApiResponse(
  data: ExamplePostArgs
): Promise<ExampleResponse> {
  return postJson<ExampleResponse>(`${API_URL}/hello-world`, data);
}
