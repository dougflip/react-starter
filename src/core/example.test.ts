interface Person {
  name: string;
}

describe("example tests", () => {
  it("respects TS", () => {
    // a type mismatch here will cause the tests to fail to compile
    const person: Person = { name: "Geddy" };

    // verify snapshots are wired up
    expect(person).toMatchInlineSnapshot(`
      Object {
        "name": "Geddy",
      }
    `);
  });
});
