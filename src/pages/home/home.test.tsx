import React from "react";
import { describe, it } from "vitest";
import { jsonGetApiError, render, screen, waitFor } from "~/test-utils";
import { Home } from "./home";

describe("<Home />", () => {
  it("renders a loading screen initially", async () => {
    render(<Home />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders the response when the query is done", async () => {
    render(<Home />);
    await waitFor(() => expect(screen.getByText(/hello world$/i)));
  });

  it("renders an error if the query fails", async () => {
    jsonGetApiError("hello-world");
    render(<Home />);
    await waitFor(() => expect(screen.getByText(/error/i)));
  });
});
