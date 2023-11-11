import { HttpResponse, http } from "msw";

import { server } from "./node";

type MockHandlerFn = Parameters<typeof http.get>[1];
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
  return () => HttpResponse.json(body);
}

/**
 * Returns a handler function which responds with a 404 error JSON response.
 * Useful when a unit test wants to set a specific API call to return an error.
 */
export function serverNotFound(): MockHandlerFn {
  return () => HttpResponse.json({ error: "Not Found" }, { status: 404 });
}

/**
 * Returns a handler function which responds with a 500 error JSON response.
 * Useful when a unit test wants to set a specific API call to return an error.
 */
export function serverError(): MockHandlerFn {
  return () => HttpResponse.json({ error: "Server Error" }, { status: 500 });
}
