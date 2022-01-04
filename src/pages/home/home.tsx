import React from "react";
import { useQuery } from "react-query";
import { fetchExampleApiResponse } from "~/api";

export function Home(): JSX.Element {
  const query = useQuery("exampleResponse", fetchExampleApiResponse);

  if (query.isLoading) {
    return <div>loading...</div>;
  }
  if (query.error) {
    return <div>Error!</div>;
  }
  if (query.data) {
    return <div>{query.data.message}</div>;
  }

  return <></>;
}
