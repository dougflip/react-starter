import { describe, expect, it } from "vitest";
import {
  mocks,
  renderApp,
  screen,
  serverError,
  suppressConsoleErrors,
  useMockApi,
  waitFor,
} from "~/test-utils";

describe("<Home />", () => {
  it("renders a loading screen while the query loads", async () => {
    renderApp("/");
    expect(screen.getAllByText(/loading\.\.\./i)).toHaveLength(2);
  });

  it("renders the response when the query is succeeds", async () => {
    suppressConsoleErrors();
    renderApp("/");
    await waitFor(() => expect(screen.getByText(/hello world$/i)));
  });

  it("renders an error if the query fails", async () => {
    suppressConsoleErrors();
    useMockApi([mocks.fetchExampleApiResponse(serverError())]);
    renderApp("/");
    await waitFor(() => expect(screen.getByText(/error/i)));
  });
});
