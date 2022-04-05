import "@testing-library/jest-dom";
import "whatwg-fetch";
import { server } from "./src/mocks/node";

beforeAll(() => server.listen());
// if you need to add a handler after calling setupServer for some specific test
// this will remove that handler for the rest of them
// (which is important for test isolation):
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

/**
 * Mock out the env and make it specific to the test environment as needed.
 *
 * https://github.com/vitejs/vite/issues/1955#issuecomment-1029853795
 */
jest.mock("~/env", () => {
  return { env: { apiUrl: "", nodeEnv: "TEST" } };
});
