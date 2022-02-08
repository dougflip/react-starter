import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import "./index.css";

// https://github.com/msutkowski/msw-ts-vitejs/blob/main/src/main.tsx
async function loadAndStartMockServer() {
  const { worker } = await import("./mocks/browser");
  worker.start();
}

if (process.env.NODE_ENV === "development") {
  loadAndStartMockServer();
}

ReactDOM.render(<App />, document.getElementById("root"));
