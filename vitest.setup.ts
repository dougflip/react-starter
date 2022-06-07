import "@testing-library/jest-dom";
import "cross-fetch/polyfill";

import { afterAll, afterEach, beforeAll, vi } from "vitest";

import { server } from "./src/mocks/node";

/**
 * Set up [MSW](https://mswjs.io/) for API mocking during tests.
 * This includes:
 *  - Starting the server before all tests
 *  - Stopping the server after all tests complete
 *  - Resetting handlers between each test
 */
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

/**
 * Restore mocks between every test.
 */
afterEach(() => { vi.restoreAllMocks() });

/**
 * Provide a mock of our env module during testing.
 * We could look into using a .env file for this as well.
 */
vi.mock("~/env.ts", () => ({
  env: {
    apiUrl: "http://www.example.com",
    nodeEnv: "TEST",
  },
}));
