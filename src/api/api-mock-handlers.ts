/**
 * A listing of "handlers" for our mock API.
 * There should be an entry for each API method here (at least happy path).
 *
 * In the future, we may move the responses themselves out to their own file
 * or even into a cheap in memory database if our mock becomes more featured.
 *
 * See: https://kentcdodds.com/blog/stop-mocking-fetch
 */
import { rest } from "msw";

export const handlers = [
  rest.get("/hello-world", (req, res, ctx) => {
    return res(ctx.json({ message: "Hello World" }));
  }),
];
