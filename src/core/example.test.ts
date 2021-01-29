describe("example tests", () => {
  it("respects TS", () => {
    // a type mismatch here will cause the tests to fail to compile
    const name: string = "Doug";
    expect(name).toBe("Doug");
  });
});
