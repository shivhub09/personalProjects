class apiError extends Error {
  constructor(
    statuscode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statuscode;
    this.success = false;
    this.errors = errors;
    this.data = null;

    // If a stack trace is provided, add it; otherwise, capture the stack trace
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = apiError;
