import { fetchExampleApiResponse } from "./api";
import { jsonApiError } from "./api-mock-server";

describe("api", () => {
  describe("fetchExampleApiResponse", () => {
    it("makes a GET request", async () => {
      const response = await fetchExampleApiResponse();
      expect(response.message).toEqual("Hello World");
    });

    it("throws an exception for an error response", async () => {
      jsonApiError("/hello-world", {
        status: 500,
        body: { message: "Unknown error" },
      });

      await expect(fetchExampleApiResponse()).rejects.toThrow(/500/);
    });
  });
});
