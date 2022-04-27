/**
 * Wraps testing library and adds a custom render function
 * which will apply all of our providers or other "wrapper" setup.
 *
 * https://testing-library.com/docs/react-testing-library/setup/
 *
 * Some ideas for larger apps:
 *
 * - Move the provider setup into a shared space which can then
 *      be reused by the <App /> component as well.
 * - Provide a `renderApp` which renders the entire app at a given
 *      route allowing you to test more in context.
 */
import { render, RenderOptions } from "@testing-library/react";
import React, { FC, ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const AllTheProviders: FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
