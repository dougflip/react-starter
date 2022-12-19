import { apiFailure, fetchExampleApiResponse } from "~/api";

import { DateDisplay } from "~/components/date-display";
import { NumberDisplay } from "~/components/number-display";
import React from "react";
import { RemoteData } from "~/components/remote-data";
import { useQuery } from "react-query";

export function Home(): JSX.Element {
  const query = useQuery("exampleResponse", fetchExampleApiResponse);
  const queryThatFails = useQuery("exampleResponseThatFails", apiFailure, {
    retry: false,
  });

  return (
    <>
      <section>
        <h1 style={{ marginTop: 0 }}>RemoteData</h1>
        <p>
          You will see the <code>loading</code> state while the mock backend
          delays the response.
        </p>

        <RemoteData {...query} render={(x) => <code>{x.message}</code>} />

        <p>
          This call will intentionally fail to show an error message being
          rendered.
        </p>

        <RemoteData
          {...queryThatFails}
          render={(x) => <code>{x.message}</code>}
        />
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
      <section>
        <h1>NumberDisplay</h1>

        <p>Using the defaults</p>
        <code>
          <NumberDisplay value={2112} />
        </code>

        <p>Using a custom fallback for when the number is empty (or invalid)</p>
        <code>
          <NumberDisplay value={null} fallback="N/A" />
        </code>

        <p>Using render children for custom display</p>
        <code>
          <NumberDisplay value={123456.125}>
            {(d) => <>Count: {d}</>}
          </NumberDisplay>
        </code>

        <p>Using render children with a custom formatter</p>
        <code>
          <NumberDisplay value={123456} formatNumber={(x) => x.toExponential()}>
            {(d) => <>Count: {d}</>}
          </NumberDisplay>
        </code>

        <p>Using a custom formatter and custom fallback</p>
        <code style={{ display: "block" }}>
          Count:{" "}
          <NumberDisplay
            value={undefined}
            fallback="--"
            formatNumber={(x) => x.toExponential()}
          />
        </code>
        <code>
          Count:{" "}
          <NumberDisplay
            value={123456}
            fallback="--"
            formatNumber={(x) => x.toExponential()}
          />
        </code>
      </section>
    </>
  );
}
