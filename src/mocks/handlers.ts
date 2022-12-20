/**
 * A listing of "handlers" for our mock API.
 * There should be an entry for each API method here (at least happy path).
 *
 * In the future, we may move the responses themselves out to their own file
 * or even into a cheap in memory database if our mock becomes more full featured.
 *
 * See: https://kentcdodds.com/blog/stop-mocking-fetch
 */
import { RestContext, rest } from "msw";

import { env } from "~/env";

function devDelay(ctx: RestContext, delay = 1000) {
  const finalDelay = env.nodeEnv === "development" ? delay : 0;
  return ctx.delay(finalDelay);
}

type MockHandler = Parameters<typeof rest.get>[1];

export const mocks = {
  fetchExampleApiResponse: (handler: MockHandler) =>
    rest.get(`${env.apiUrl}/hello-world`, handler),
  fetchApiFailureResponse: (handler: MockHandler) =>
    rest.get(`${env.apiUrl}/api-failure`, handler),
  postExampleApiResponse: (handler: MockHandler) =>
    rest.post(`${env.apiUrl}/hello-world`, handler),
};

export const handlers = [
  mocks.fetchExampleApiResponse((_req, res, ctx) => {
    return res(devDelay(ctx), ctx.json({ message: "Hello World" }));
  }),
  mocks.fetchApiFailureResponse((_req, res, ctx) => {
    return res(devDelay(ctx), ctx.status(500));
  }),
  mocks.postExampleApiResponse((_req, res, ctx) => {
    return res(devDelay(ctx), ctx.json({ message: "Hello World" }));
  }),
];
