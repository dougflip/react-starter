import { QueryClient, QueryClientProvider } from "react-query";
import React, { ReactElement, ReactNode } from "react";
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
 */
import { RenderOptions, render } from "@testing-library/react";

import { AppRoutes } from "~/app";
import { MemoryRouter } from "react-router-dom";
import { noop } from "~/core/functions";
import { vi } from "vitest";

/**
 * Creates a spy for `console.error` with a noop implementation.
 */
export function suppressConsoleErrors(): void {
  vi.spyOn(console, "error").mockImplementation(noop);
}

/**
 * A query provider for react-query that is configured
 * for unit tests.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      retry: false,
    },
  },
});

/**
 * Applies all providers necessary for components running in a test env.
 */
const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

/**
 * Render the provided @param ui within the appropriate testing context.
 * This is useful for testing a single component in isolation.
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

/**
 * Render the top level `<App />` at an initial route.
 * This helps to test a full page component in full context.
 */
const renderApp = (
  initialPath: string,
  options?: Omit<RenderOptions, "wrapper">,
) =>
  render(
    <AppRoutes
      renderRoutes={(routes) => (
        <MemoryRouter initialEntries={[initialPath]}>{routes}</MemoryRouter>
      )}
    />,
    {
      wrapper: AllTheProviders,
      ...options,
    },
  );

export * from "@testing-library/react";
export { customRender as render, renderApp };
