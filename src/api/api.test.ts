import { describe, expect, it } from "vitest";
import { jsonGetApiError, jsonPostApiError } from "~/test-utils";
import { fetchExampleApiResponse, postExampleApiResponse } from "./api";

describe("api", () => {
  describe("fetchExampleApiResponse", () => {
    it("makes a GET request", async () => {
      const response = await fetchExampleApiResponse();
      expect(response.message).toEqual("Hello World");
    });

    it("throws an exception for an error response", async () => {
      jsonGetApiError("hello-world", { status: 404 });
      await expect(fetchExampleApiResponse()).rejects.toThrow(/404/);
    });
  });

  describe("postExampleApiResponse", () => {
    it("makes a POST request", async () => {
      const response = await postExampleApiResponse({ name: "testing" });
      expect(response.message).toEqual("Hello World");
    });

    it("throws an exception for an error response", async () => {
      jsonPostApiError("hello-world");

      await expect(postExampleApiResponse({ name: "testing" })).rejects.toThrow(
        /500/
      );
    });
  });
});
