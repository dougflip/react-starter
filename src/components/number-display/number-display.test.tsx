import { NumberDisplay, formatNumberDefault } from "./number-display";
import { describe, it } from "vitest";
import { render, screen } from "~/test-utils";

import React from "react";

describe("<NumberDisplay />", () => {
  describe("defaults", () => {
    it("renders a number", () => {
      render(<NumberDisplay value={2112} />);
      expect(screen.getByText("2,112")).toBeInTheDocument();
    });

    it("renders a string representing a number", () => {
      render(<NumberDisplay value="2112" />);
      expect(screen.getByText("2,112")).toBeInTheDocument();
    });

    it("renders a fallback for null", () => {
      render(
        <button>
          <NumberDisplay value={null} />
        </button>
      );
      expect(screen.getByRole("button")).toBeEmptyDOMElement();
    });

    it("renders a fallback for undefined", () => {
      render(
        <button>
          <NumberDisplay value={undefined} />
        </button>
      );
      expect(screen.getByRole("button")).toBeEmptyDOMElement();
    });
  });

  describe("customization", () => {
    it("renders custom children", () => {
      render(
        <NumberDisplay value={2112}>{(x) => <>Count: {x}</>}</NumberDisplay>
      );
      expect(screen.getByText(/count: 2,112/i)).toBeInTheDocument();
    });

    it("renders a custom fallback", () => {
      render(<NumberDisplay fallback="N/A" value={null} />);
      expect(screen.getByText("N/A")).toBeInTheDocument();
    });

    it("renders a custom formatter", () => {
      render(
        <NumberDisplay
          value={2112}
          formatNumber={(d) =>
            formatNumberDefault(d, { maximumSignificantDigits: 1 })
          }
        />
      );
      expect(screen.getByText("2,000")).toBeInTheDocument();
    });

    it("accepts a custom parser", () => {
      render(<NumberDisplay value={"2112"} parseNumber={() => 42} />);
      expect(screen.getByText("42")).toBeInTheDocument();
    });
  });
});
