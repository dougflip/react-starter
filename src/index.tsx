import "./index.css";

import { App } from "./app";
import React from "react";
import { createRoot } from "react-dom/client";

// https://github.com/msutkowski/msw-ts-vitejs/blob/main/src/main.tsx
async function loadAndStartMockServer() {
  const { worker } = await import("./mocks/browser");
  worker.start();
  renderApp();
}

function renderApp() {
  const container = document.getElementById("root")!;
  return createRoot(container).render(<App />);
}

// in development we first load and start the mock server
process.env.NODE_ENV === "development" ? loadAndStartMockServer() : renderApp();
