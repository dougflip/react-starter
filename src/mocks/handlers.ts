/**
 * A listing of "handlers" for our mock API.
 * There should be an entry for each API method here (at least happy path).
 *
 * In the future, we may move the responses themselves out to their own file
 * or even into a cheap in memory database if our mock becomes more full featured.
 *
 * See: https://kentcdodds.com/blog/stop-mocking-fetch
 */
import { rest, RestContext } from "msw";
import { env } from "~/env";

function devDelay(ctx: RestContext, delay = 1000) {
  const finalDelay = env.nodeEnv === "development" ? delay : 0;
  return ctx.delay(finalDelay);
}

export const handlers = [
  rest.get("/hello-world", (req, res, ctx) => {
    return res(devDelay(ctx), ctx.json({ message: "Hello World" }));
  }),
  rest.post("/hello-world", (req, res, ctx) => {
    return res(devDelay(ctx), ctx.json({ message: "Hello World" }));
  }),
];
