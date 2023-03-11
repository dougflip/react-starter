import "./index.css";

import { App } from "./app";
import React from "react";
import ReactDOM from "react-dom";

// https://github.com/msutkowski/msw-ts-vitejs/blob/main/src/main.tsx
async function loadAndStartMockServer() {
  const { worker } = await import("./mocks/browser");
  worker.start();
  renderApp();
}

function renderApp() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

// in development we first load and start the mock server
process.env.NODE_ENV === "development" ? loadAndStartMockServer() : renderApp();
