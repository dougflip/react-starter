import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalErrorBoundary } from "~/components/global-error-boundary";
import { Home } from "~/pages/home";

const queryClient = new QueryClient();

export function App(): JSX.Element {
  return (
    <React.StrictMode>
      <GlobalErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <main>
            <Router>
              <Routes>
                <Route path="*" element={<Home />} />
              </Routes>
            </Router>
          </main>
        </QueryClientProvider>
      </GlobalErrorBoundary>
    </React.StrictMode>
  );
}
