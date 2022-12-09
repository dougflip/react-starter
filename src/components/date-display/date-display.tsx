import React from "react";

/**
 * Values that can represent a Date - can be passed to the Date constructor.
 */
export type DateLike = Date | string | number;

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

// https://stackoverflow.com/a/1353711
function isValidDate(d: unknown): d is Date {
  return d instanceof Date && !isNaN(d.getTime());
}

/**
 * A default formatter leveraging the browser's locale.
 */
export function formatDateDefault(
  d: Date,
  opts: Partial<Intl.DateTimeFormatOptions> = {}
): string {
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...opts,
  });
}

/**
 * A default parser which accepts a range of inputs.
 * It is likely different apps will have different needs and this is swappable in `DateDisplay`.
 */
export function parseDateLike(d: DateLike | null | undefined): Date | null {
  if (isValidDate(d)) {
    return d;
  }

  if (typeof d === "number") {
    return new Date(d);
  }

  if (typeof d === "string") {
    const result = new Date(d);
    return isValidDate(result) ? result : null;
  }

  return null;
}

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
