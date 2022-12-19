import { getJson, postJson } from "./api-core";

import { env } from "~/env";

const { apiUrl } = env;

type ExampleResponse = {
  message: string;
};

export function fetchExampleApiResponse(): Promise<ExampleResponse> {
  return getJson<ExampleResponse>(`${apiUrl}/hello-world`);
}

export function apiFailure(): Promise<ExampleResponse> {
  return getJson<ExampleResponse>(`${apiUrl}/api-failure`);
}

type ExamplePostArgs = {
  name: string;
};

export function postExampleApiResponse(
  data: ExamplePostArgs
): Promise<ExampleResponse> {
  return postJson<ExampleResponse>(`${apiUrl}/hello-world`, data);
}
