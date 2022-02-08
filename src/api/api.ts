import { env } from "~/env";
import { getJson, postJson } from "./api-core";

const { apiUrl } = env;

type ExampleResponse = {
  message: string;
};

export function fetchExampleApiResponse(): Promise<ExampleResponse> {
  return getJson<ExampleResponse>(`${apiUrl}/hello-world`);
}

type ExamplePostArgs = {
  name: string;
};

export function postExampleApiResponse(
  data: ExamplePostArgs
): Promise<ExampleResponse> {
  return postJson<ExampleResponse>(`${apiUrl}/hello-world`, data);
}
