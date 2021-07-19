import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "~pages/home";

export function App(): JSX.Element {
  return (
    <main>
      <Router>
        <Switch>
          <Route>
            <Home />
          </Route>
        </Switch>
      </Router>
    </main>
  );
}
