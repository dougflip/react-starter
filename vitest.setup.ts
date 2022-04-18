import "@testing-library/jest-dom";
import "cross-fetch/polyfill";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { server } from "./src/mocks/node";

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

// Mock the ENV - could also look into a .env file for this
vi.mock("~/env.ts", () => ({
  env: {
    apiUrl: "http://www.example.com",
    nodeEnv: "TEST",
  },
}));
