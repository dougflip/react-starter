import { describe, it } from "vitest";
import { jsonGetApiError, renderApp, screen, waitFor } from "~/test-utils";

describe("<Home />", () => {
  it("renders a loading screen while the query loads", async () => {
    renderApp("/");
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders the response when the query is succeeds", async () => {
    renderApp("/");
    await waitFor(() => expect(screen.getByText(/hello world$/i)));
  });

  it("renders an error if the query fails", async () => {
    jsonGetApiError("hello-world");
    renderApp("/");
    await waitFor(() => expect(screen.getByText(/error/i)));
  });
});
