import { API_URL } from "../env";

class ApiResponseError extends Error {
  response: Response;

  constructor(response: Response) {
    super(`API responded with ${response.status}`);
    this.response = response;
  }
}

async function getJson<T>(url: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    ...init,
    method: "GET",
  });

  if (!response.ok) {
    throw new ApiResponseError(response);
  }

  return response.json();
}

interface ExampleResponse {
  message: string;
}

export function fetchExampleApiResponse(): Promise<ExampleResponse> {
  return getJson<ExampleResponse>(`${API_URL}/hello-world`);
}
