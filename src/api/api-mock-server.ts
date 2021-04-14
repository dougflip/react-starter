import { rest } from "msw";
import { setupServer } from "msw/node";
import { handlers } from "./api-mock-handlers";

/**
 * A (non exhaustive) list of HTTP Error status codes used in tests.
 * See: `jsonApiError`
 */
type HttpErrorStatus = 400 | 401 | 403 | 404 | 500 | 503;

/**
 * A response to use when mocking errors coming from the server.
 */
interface MockErrorResponse<T> {
  status: HttpErrorStatus;
  body: T;
}

/**
 * Configures the mock server to return a JSON error.
 * @param path The API path - example: "/user-info"
 * @param param1 The MockErrorResponse used as the result of the API call.
 */
export function jsonApiError<T>(
  path: string,
  { status, body }: MockErrorResponse<T>
): void {
  server.use(
    rest.get(path, (req, res, ctx) => {
      return res(ctx.status(status), ctx.json(body));
    })
  );
}

export const server = setupServer(...handlers);
