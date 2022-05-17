import { describe, expect, it } from "vitest";
import { fetchExampleApiResponse, postExampleApiResponse } from "./api";
import { mocks, serverError, serverNotFound, useMockApi } from "~/test-utils";

describe("api", () => {
  describe("fetchExampleApiResponse", () => {
    it("makes a GET request", async () => {
      const response = await fetchExampleApiResponse();
      expect(response.message).toEqual("Hello World");
    });

    it("throws an exception for an error response", async () => {
      useMockApi([mocks.fetchExampleApiResponse(serverNotFound())]);
      await expect(fetchExampleApiResponse()).rejects.toThrow(/404/);
    });
  });

  describe("postExampleApiResponse", () => {
    it("makes a POST request", async () => {
      const response = await postExampleApiResponse({ name: "testing" });
      expect(response.message).toEqual("Hello World");
    });

    it("throws an exception for an error response", async () => {
      useMockApi([mocks.postExampleApiResponse(serverError())]);

      await expect(postExampleApiResponse({ name: "testing" })).rejects.toThrow(
        /500/
      );
    });
  });
});
