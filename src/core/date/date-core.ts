/**
 * Values that can represent a Date - can be passed to the Date constructor.
 *
 * Especially useful for formatter functions/components that want to accept a broader input.
 */
export type DateLike = Date | string | number;

// https://stackoverflow.com/a/1353711
export function isValidDate(d: unknown): d is Date {
  return d instanceof Date && !isNaN(d.getTime());
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
 * A default formatter leveraging the browser's locale.
 *
 * The `opts` passed to this function are used as overrides to a set of defaults.
 */
export function formatDate(
  d: Date,
  opts: Partial<Intl.DateTimeFormatOptions> = {},
): string {
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...opts,
  });
}
