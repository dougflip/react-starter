import {
  NumberLike,
  formatNumber as formatNumberDefault,
  parseNumberLike,
} from "~/core/number";

import React from "react";

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
  children?: (formattedString: string, parsed: number) => JSX.Element;
  /**
   * This is rendered when the `value` is NOT able to be parsed to a Date instance.
   */
  fallback?: JSX.Element | string | null;
};

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

  return x ? children(formatNumber(x), x) : <>{fallback}</>;
}
