/**
 * Values that can represent a number.
 *
 * Especially useful for formatter functions/components that want to accept a broader input.
 */
export type NumberLike = number | string;

/**
 * Determines if the provided input is a valid number.
 */
export function isValidNumber(x: unknown): x is number {
  return typeof x === "number" && !isNaN(x);
}

/**
 * Attempts to parse a `NumberLike` to a number and returns `null` if it fails.
 */
export function parseNumberLike(
  x: NumberLike | null | undefined
): number | null {
  if (!x) {
    return null;
  }

  if (typeof x === "string") {
    const result = Number(x);
    return isValidNumber(result) ? result : null;
  }

  return isValidNumber(x) ? x : null;
}

/**
 * A default formatter leveraging the browser's locale.
 *
 * The `opts` passed to this function are used as overrides to a set of defaults.
 */
export function formatNumber(
  d: number,
  opts: Partial<Intl.NumberFormatOptions> = {}
): string {
  return d.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    ...opts,
  });
}
