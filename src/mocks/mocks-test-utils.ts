import { server } from "./node";
import { rest } from "msw";

type MockHandlerFn = Parameters<typeof rest.get>[1];
type MockHandler = Parameters<typeof server.use>[0];

/**
 * Applies a collection of handlers to the mock API.
 * By default, the mock API is pre-wired with success responses
 * and this function allows you to override those responses with something custom.
 */
export function useMockApi(handlers: MockHandler[]): void {
  handlers.forEach((x) => server.use(x));
}

/**
 * Returns a handler function which responds with a successful JSON response.
 * Useful for unit testing - especially for default handlers.
 */
export function jsonSuccess(body: Record<string, unknown> = {}): MockHandlerFn {
  return (_req, res, ctx) => res(ctx.json(body));
}

/**
 * Returns a handler function which responds with a 404 error JSON response.
 * Useful when a unit test wants to set a specific API call to return an error.
 */
export function serverNotFound(
  body: Record<string, unknown> = {}
): MockHandlerFn {
  return (_req, res, ctx) => res(ctx.status(404), ctx.json(body));
}

/**
 * Returns a handler function which responds with a 500 error JSON response.
 * Useful when a unit test wants to set a specific API call to return an error.
 */
export function serverError(body: Record<string, unknown> = {}): MockHandlerFn {
  return (_req, res, ctx) => res(ctx.status(500), ctx.json(body));
}
