import { ErrorMessage } from "../error-message";
import { Loader } from "../loader";
import React from "react";

export type RemoteDataRenderOptions = {
  /**
   * Indicates if updated data is currently being fetched/refreshed.
   */
  isFetching: boolean;
};

export type RemoteDataProps<Data, Err> = {
  /**
   * Indicates if this is the intial load of data.
   */
  isLoading: boolean;
  /**
   * Indicates if data is being fetched post initial load.
   * We'll feed this value to your render function as it can be
   * useful to give user feedback that a fetch is in progress.
   */
  isFetching: boolean;
  error: Err | undefined;
  data: Data | undefined;
  render: (data: Data, options: RemoteDataRenderOptions) => JSX.Element;
  renderLoading?: () => JSX.Element;
  renderError?: (err: Err) => JSX.Element;
  refetch: () => void;
};

/**
 * Helper to render data that is fetched async.
 * Encapsulates the idea of different "states" like
 * loading, error, data available.
 *
 * You can wrap this to default standard UI elements for loading
 * and error for example.
 */
export function RemoteData<Data, Err>({
  isLoading,
  isFetching,
  error,
  data,
  renderLoading = () => <Loader />,
  renderError,
  render,
  refetch,
}: RemoteDataProps<Data, Err>): JSX.Element {
  if (isLoading) {
    return renderLoading();
  }

  if (error) {
    if (renderError) {
      return renderError(error);
    }

    return (
      <ErrorMessage title="Error fetching data">
        Please try refreshing the page or{" "}
        <button className="button-link" onClick={refetch}>
          click here to retry the request.
        </button>
      </ErrorMessage>
    );
  }

  if (data) {
    return render(data, { isFetching });
  }

  return <></>;
}
