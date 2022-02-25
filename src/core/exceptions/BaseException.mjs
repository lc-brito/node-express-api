class BaseException extends Error {
  #httpCode;

  #isOperational;

  constructor(httpCode, message, isOperational) {
    super(message);

    this.#httpCode = httpCode;
    this.#isOperational = isOperational;

    Error.captureStackTrace(this);
  }

  get httpCode() {
    return this.#httpCode;
  }

  get isOperational() {
    return this.#isOperational;
  }
}

export default BaseException;
