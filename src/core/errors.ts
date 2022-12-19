type AppErrorArgs = {
  /**
   * A succinct human readable summary of the error.
   * This could also be a key to an i18n lookup.
   * This is end user facing.
   */
  title: string;
  /**
   * A description of what went wrong and what steps the user should take.
   * This could also be a key to an i18n lookup.
   * This is end user facing.
   */
  displayMessage: string;
  /**
   * Tracks the JS error (if any) that was originally thrown.
   */
  originalError?: unknown;

  // *************
  // These fields would make sense in a real app, but not implemented here.
  // The back end should follow the same interface for errors across the wire as well.
  // If these fields are present in a server error then you should assume the backend
  // reported the error and NOT report it to front end bug tracking as well.
  // *************

  /**
   * A detailed description of the error used for debugging purposes.
   * This is NOT intended to be shown in production.
   * In fact, when dealing with server side errors, this should even be _transferred_ to the client in prod.
   */
  // detail?: string;
  /**
   * A categorization code that is specific to each _type_ of error, but not each _instance_.
   * The intended use is to help support quickly identify the cause of an error.
   * For example, ALL report related errors may start with "100-",
   * but "100-10" always means "invalid report ID", "100-20" always means "invalid end date filter", etc.
   *
   * This should be shown to end users and they should be instructed to relay this code
   * to support when reaching out for assistance.
   * If you have a "Email Support" feature, this should be included in that email.
   */
  // errorCode: string;
  /**
   * This code is specific to _each instance_ of an error.
   * This value should be:
   *
   * 1. Written to any log files containing the error
   * 2. Sent to any bug tracking software
   * 3. Sent and shown to the end user to be included in error reports
   *
   * This allows someone to tie back to the _exact_ error that a user sees on screen.
   */
  // errorId: string;
};

export class AppError extends Error {
  title: string;
  displayMessage: string;
  originalError?: unknown;

  constructor(args: AppErrorArgs) {
    super(args.title);

    this.title = args.title;
    this.displayMessage = args.displayMessage;
    this.originalError = args.originalError;
  }
}
