import { describe, expect, it } from "vitest";

interface Person {
  name: string;
}

describe("example tests", () => {
  it("respects TS", () => {
    // a type mismatch here will cause the tests to fail to compile
    const person: Person = { name: "Geddy" };

    // verify snapshots are wired up
    expect(person).toMatchInlineSnapshot(`
      {
        "name": "Geddy",
      }
    `);
  });
});
