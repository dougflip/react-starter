/**
 * A listing of "handlers" for our mock API.
 * There should be an entry for each API method here (at least happy path).
 *
 * In the future, we may move the responses themselves out to their own file
 * or even into a cheap in memory database if our mock becomes more full featured.
 *
 * See: https://kentcdodds.com/blog/stop-mocking-fetch
 */
import { HttpResponse, delay, http } from "msw";

import { env } from "~/env";

function devDelay(delay = 1000): number {
  return env.nodeEnv === "development" ? delay : 0;
}

type MockHandler = Parameters<typeof http.get>[1];

export const mocks = {
  fetchExampleApiResponse: (handler: MockHandler) =>
    http.get(`${env.apiUrl}/hello-world`, handler),
  fetchApiFailureResponse: (handler: MockHandler) =>
    http.get(`${env.apiUrl}/api-failure`, handler),
  postExampleApiResponse: (handler: MockHandler) =>
    http.post(`${env.apiUrl}/hello-world`, handler),
};

export const handlers = [
  mocks.fetchExampleApiResponse(async () => {
    await delay(devDelay());
    return HttpResponse.json({ message: "Hello World" });
  }),
  mocks.fetchApiFailureResponse(async () => {
    await delay(devDelay());
    return HttpResponse.json({ error: "Server Error" }, { status: 500 });
  }),
  mocks.postExampleApiResponse(async () => {
    await delay(devDelay());
    return HttpResponse.json({ message: "Hello World" });
  }),
];
