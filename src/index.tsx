import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import "./index.css";

if (process.env.NODE_ENV === "development") {
  // This require statement allows this module to be loaded conditionally.
  // This means all of the "mock" code is only pulled in for development builds.
  /* eslint-disable-next-line */
  const { worker } = require("./mocks/browser");
  worker.start();
}

ReactDOM.render(<App />, document.getElementById("root"));
