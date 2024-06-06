const statusText = require('./httpStatusText');

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4)
      ? statusText.FAIL
      : statusText.ERROR;
    this.isOperational = true;
  }
}

module.exports = ApiError;
