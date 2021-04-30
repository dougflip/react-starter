import { rest } from "msw";
import { server } from "~/mocks/node";

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

function defaultErrorResponse(): MockErrorResponse<string> {
  return {
    status: 500,
    body: "An unknown error occured",
  };
}

/**
 * Configures the mock server to return a JSON error.
 * @param verb The HTTP verb - "get" or "post"
 * @param path The API path - example: "/user-info"
 * @param param1 The MockErrorResponse used as the result of the API call.
 */
export function jsonApiError<T>(
  verb: "get" | "post",
  path: string,
  { status, body }: MockErrorResponse<T>
): void {
  server.use(
    rest[verb](path, (req, res, ctx) => {
      return res(ctx.status(status), ctx.json(body));
    })
  );
}

/**
 * Configures the mock server to return a JSON error.
 * @param path The API path - example: "/user-info"
 * @param param1 The MockErrorResponse used as the result of the API call.
 */
export function jsonGetApiError<T>(
  path: string,
  mockResponse: Partial<MockErrorResponse<T>> = {}
): void {
  return jsonApiError("get", path, {
    ...defaultErrorResponse(),
    ...mockResponse,
  });
}

/**
 * Configures the mock server to return a JSON error for a POST request.
 * @param path The API path - example: "/user-info"
 * @param param1 The MockErrorResponse used as the result of the API call.
 */
export function jsonPostApiError<T>(
  path: string,
  mockResponse: Partial<MockErrorResponse<T>> = {}
): void {
  return jsonApiError("post", path, {
    ...defaultErrorResponse(),
    ...mockResponse,
  });
}
