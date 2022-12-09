import React from "react";

/**
 * Values that can represent a number.
 *
 * NOTE: You may decide to accept strictly numbers instead and that is valid!
 * If so, you can most likely remove this type and the idea of "parsing".
 * Accepting strings can be useful though for dealing with user input, API responses, etc.
 */
export type NumberLike = number | string;

type NumberDisplayProps = {
  value: NumberLike | null | undefined;
  /**
   * Parses an input value to a Date.
   * Exposed as a prop so you can decide which types can be parsed for your specific scenario.
   */
  parseNumber?: (d: NumberDisplayProps["value"]) => number | null;
  /**
   * Formats the given date a string - only invoked if the `value` can be parsed.
   */
  formatNumber?: (d: number) => string;
  /**
   * This is rendered when the `value` is able to be parsed to a Date instance.
   */
  children?: (formattedString: string) => JSX.Element;
  /**
   * This is rendered when the `value` is NOT able to be parsed to a Date instance.
   */
  fallback?: JSX.Element | string | null;
};

function isValidNumber(x: unknown): x is number {
  return typeof x === "number" && !isNaN(x);
}

/**
 * A default formatter leveraging the browser's locale.
 */
export function formatNumberDefault(
  d: number,
  opts: Partial<Intl.NumberFormatOptions> = {}
): string {
  return d.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    ...opts,
  });
}

/**
 * A default parser which accepts a range of inputs.
 * It is likely different apps will have different needs and this is swappable in `NumberDisplay`.
 */
export function parseNumberLike(
  x: NumberLike | null | undefined
): number | null {
  if (typeof x === "string") {
    const result = Number(x);
    return isValidNumber(result) ? result : null;
  }

  return isValidNumber(x) ? x : null;
}

/**
 * By default, renders the formatted number with no wrapping markup.
 * If the provided `value` cannot be parsed to a number then `fallback` will be rendered instead.
 *
 * You can customize via several props:
 *
 * @example
 *
 * <NumberDisplay value={2112} /> // defaults
 * <NumberDisplay value={2112}>{(x) => displayString}</NumberDisplay> // custom render
 * <NumberDisplay value={null} fallback="--" /> // custom fallback
 * <NumberDisplay value={2112} parseNumber={myStrictParser} /> // custom parser
 * <NumberDisplay value={2112} formatNumber={myFormatter} /> // custom formatter
 */
export function NumberDisplay({
  value,
  children = (x) => <>{x}</>,
  parseNumber = parseNumberLike,
  formatNumber = formatNumberDefault,
  fallback = null,
}: NumberDisplayProps): JSX.Element | null {
  const x = parseNumber(value);

  return x ? children(formatNumber(x)) : <>{fallback}</>;
}
