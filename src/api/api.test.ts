import { fetchExampleApiResponse } from "./api";
import { jsonGetApiError } from "./api-test-utils";

describe("api", () => {
  describe("fetchExampleApiResponse", () => {
    it("makes a GET request", async () => {
      const response = await fetchExampleApiResponse();
      expect(response.message).toEqual("Hello World");
    });

    it("throws an exception for an error response", async () => {
      jsonGetApiError("/hello-world", {
        status: 500,
        body: { message: "Unknown error" },
      });

      await expect(fetchExampleApiResponse()).rejects.toThrow(/500/);
    });
  });
});
