import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalErrorBoundary } from "~/components/global-error-boundary";
import { Home } from "~pages/home";

export function App(): JSX.Element {
  return (
    <React.StrictMode>
      <GlobalErrorBoundary>
        <main>
          <Router>
            <Switch>
              <Route>
                <Home />
              </Route>
            </Switch>
          </Router>
        </main>
      </GlobalErrorBoundary>
    </React.StrictMode>
  );
}
