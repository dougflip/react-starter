import React from "react";
import { useQuery } from "react-query";
import { fetchExampleApiResponse } from "~/api";
import { RemoteData } from "~/components/remote-data";

export function Home(): JSX.Element {
  const query = useQuery("exampleResponse", fetchExampleApiResponse);

  return (
    <RemoteData
      {...query}
      renderLoading={() => <div>loading...</div>}
      renderError={() => <div>Error!</div>}
      render={(x) => <div>{x.message}</div>}
    />
  );
}
