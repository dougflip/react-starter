import { API_URL } from "~/env";
import { getJson, postJson } from "./api-core";

type ExampleResponse = {
  message: string;
};

export function fetchExampleApiResponse(): Promise<ExampleResponse> {
  return getJson<ExampleResponse>(`${API_URL}/hello-world`);
}

type ExamplePostArgs = {
  name: string;
};

export function postExampleApiResponse(
  data: ExamplePostArgs
): Promise<ExampleResponse> {
  return postJson<ExampleResponse>(`${API_URL}/hello-world`, data);
}
