import {
  DateLike,
  formatDate as formatDateDefault,
  parseDateLike,
} from "~/core/date";

import React from "react";

type DateDisplayProps = {
  value: DateLike | null | undefined;
  /**
   * Parses an input value to a Date.
   * Exposed as a prop so you can decide which types can be parsed for your specific scenario.
   */
  parseDate?: (d: DateDisplayProps["value"]) => Date | null;
  /**
   * Formats the given date a string - only invoked if the `value` can be parsed.
   */
  formatDate?: (d: Date) => string;
  /**
   * This is rendered when the `value` is able to be parsed to a Date instance.
   */
  children?: (formattedString: string, isoString: string) => JSX.Element;
  /**
   * This is rendered when the `value` is NOT able to be parsed to a Date instance.
   */
  fallback?: JSX.Element | string | null;
  /**
   * CSS class applied to the default `children` renderer.
   */
  className?: string;
};

/**
 * By default, renders a `<time>` tag with formatted text and a machine readable `dateTime` attribute.
 * If the provided `value` cannot be parsed to a date instance then `fallback` will be rendered instead.
 *
 * You can customize via several props:
 *
 * @example
 *
 * <DateDisplay value={new Date()} /> // defaults
 * <DateDisplay value={new Date()}>{(displayString, isoString) => displayString}</DateDisplay> // custom render
 * <DateDisplay value={null} fallback="N/A" /> // custom fallback
 * <DateDisplay value={new Date()} parseDate={myStrictParser} /> // custom parser
 * <DateDisplay value={new Date()} formatDate={myFormatter} /> // custom formatter
 */
export function DateDisplay({
  value,
  children,
  className,
  parseDate = parseDateLike,
  formatDate = formatDateDefault,
  fallback = null,
}: DateDisplayProps): JSX.Element | null {
  const date = parseDate(value);
  if (!date) {
    return <>{fallback}</>;
  }

  const formattedDate = formatDate(date);
  const isoDate = date.toISOString();

  return children ? (
    children(formattedDate, isoDate)
  ) : (
    <time className={className} dateTime={isoDate}>
      {formattedDate}
    </time>
  );
}
