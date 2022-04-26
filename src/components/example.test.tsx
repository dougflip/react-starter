import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, it } from "vitest";

describe("example tests", () => {
  it("handles JSX", () => {
    render(<button>Click Me!</button>);
    userEvent.click(screen.getByRole("button"));
  });
});
