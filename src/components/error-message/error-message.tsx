import "./error-message.css";

import React from "react";
import { StrictReactNode } from "~/core/react-types";

type ErrorMessageProps = {
  title: string;
  children: StrictReactNode;
};

/**
 * Display component for rendering error messages.
 * This can be custom (like this) or come from your UI lib like mantine or other.
 */
export function ErrorMessage({
  title,
  children,
}: ErrorMessageProps): JSX.Element {
  return (
    <div className="error-message">
      <div className="error-message-sidebar">❗</div>
      <div className="error-message-content">
        <div className="error-message-title">{title}</div>
        <div className="error-message-body">{children}</div>
      </div>
    </div>
  );
}
