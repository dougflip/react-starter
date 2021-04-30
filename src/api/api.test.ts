import { fetchExampleApiResponse, postExampleApiResponse } from "./api";
import { jsonGetApiError, jsonPostApiError } from "./api-test-utils";

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

  describe("postExampleApiResponse", () => {
    it("makes a POST request", async () => {
      const response = await postExampleApiResponse({ name: "testing" });
      expect(response.message).toEqual("Hello World");
    });

    it("throws an exception for an error response", async () => {
      jsonPostApiError("/hello-world", {
        status: 500,
        body: { message: "Unknown error" },
      });

      await expect(postExampleApiResponse({ name: "testing" })).rejects.toThrow(
        /500/
      );
    });
  });
});
