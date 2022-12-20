import "./loader.css";

import React from "react";

export function Loader(): JSX.Element {
  return (
    <div className="loader-wrapper">
      <div className="loader" />
      <div className="sr-only">loading...</div>
    </div>
  );
}
