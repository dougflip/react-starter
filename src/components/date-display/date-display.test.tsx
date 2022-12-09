import { DateDisplay, formatDateDefault } from "./date-display";
import { describe, it } from "vitest";
import { render, screen } from "~/test-utils";

import React from "react";

describe("<DateDisplay />", () => {
  describe("defaults", () => {
    it("renders a date instance", () => {
      render(
        <DateDisplay className="test-date" value={new Date("2022-01-01")} />
      );
      expect(
        document.querySelector(".test-date")?.textContent
      ).toMatchInlineSnapshot('"01/01/2022"');
    });

    it("renders a string representing a date", () => {
      render(<DateDisplay className="test-date" value="2022-01-01" />);
      expect(
        document.querySelector(".test-date")?.textContent
      ).toMatchInlineSnapshot('"01/01/2022"');
    });

    it("renders a number representing a date", () => {
      const time = new Date("2022-01-01").getTime();
      render(<DateDisplay className="test-date" value={time} />);
      expect(
        document.querySelector(".test-date")?.textContent
      ).toMatchInlineSnapshot('"01/01/2022"');
    });

    it("renders a fallback for null", () => {
      render(<DateDisplay className="test-date" value={null} />);
      expect(document.querySelector(".test-date")).toBeNull();
    });

    it("renders a fallback for undefined", () => {
      render(<DateDisplay className="test-date" value={undefined} />);
      expect(document.querySelector(".test-date")).toBeNull();
    });
  });

  describe("customization", () => {
    it("renders custom children", () => {
      render(
        <DateDisplay value="2022-01-01">
          {(x, iso) => (
            <button>
              {x} - {iso}
            </button>
          )}
        </DateDisplay>
      );
      expect(screen.getByRole("button").textContent).toMatchInlineSnapshot(
        '"01/01/2022 - 2022-01-01T00:00:00.000Z"'
      );
    });

    it("renders a custom fallback", () => {
      render(<DateDisplay fallback="N/A" value={null} />);
      expect(screen.getByText("N/A")).toBeInTheDocument();
    });

    it("renders a custom formatter", () => {
      render(
        <DateDisplay
          className="test-date"
          value="2022-01-01"
          formatDate={(d) => formatDateDefault(d, { year: "2-digit" })}
        />
      );
      expect(
        document.querySelector(".test-date")?.textContent
      ).toMatchInlineSnapshot('"01/01/22"');
    });

    it("accepts a custom parser", () => {
      render(
        <DateDisplay
          className="test-date"
          value={null}
          parseDate={() => new Date("2022-01-01")}
        />
      );
      expect(
        document.querySelector(".test-date")?.textContent
      ).toMatchInlineSnapshot('"01/01/2022"');
    });
  });
});
