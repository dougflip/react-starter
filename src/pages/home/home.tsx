import React from "react";
import { useQuery } from "react-query";
import { fetchExampleApiResponse } from "~/api";
import { DateDisplay } from "~/components/date-display";
import { RemoteData } from "~/components/remote-data";

export function Home(): JSX.Element {
  const query = useQuery("exampleResponse", fetchExampleApiResponse);

  return (
    <>
      <section>
        <h1 style={{ marginTop: 0 }}>RemoteData</h1>
        <p>
          You will see the <code>loading</code> state while the mock backend
          delays the response.
        </p>

        <code>
          <RemoteData
            {...query}
            renderLoading={() => <div>loading...</div>}
            renderError={() => <div>Error!</div>}
            render={(x) => <div>{x.message}</div>}
          />
        </code>
      </section>
      <section>
        <h1>DateDisplay</h1>

        <p>Using the defaults</p>
        <code>
          <DateDisplay className="date-time" value={new Date()} />
        </code>

        <p>Using a custom fallback for when the date is empty (or invalid)</p>
        <code>
          <DateDisplay value={null} fallback="N/A" />
        </code>

        <p>Using render children for custom display</p>
        <code>
          <DateDisplay value={new Date()}>
            {(d) => <>Last updated: {d}</>}
          </DateDisplay>
        </code>

        <p>Using render children with a custom formatter</p>
        <code>
          <DateDisplay value={new Date()} formatDate={(d) => d.toUTCString()}>
            {(d) => <>Last updated: {d}</>}
          </DateDisplay>
        </code>
      </section>
    </>
  );
}
