class HttpError extends Error {
  constructor(message = 'Unspecified error', status = 400, errorData = {}) {
    super()
    this.name = this.constructor.name
    this.message = message
    this.status = status
    this.errorData = errorData
    Error.captureStackTrace(this, this.constructor)
  }
}

exports.HttpError = HttpError


exports.BadRequest = class BadRequest extends HttpError {
  constructor(message, errorData) {
    super(message, 400, errorData)
  }
}

exports.Unauthorized = class Unauthorized extends HttpError {
  constructor(message, errorData) {
    super(message, 401, errorData)
  }
}

exports.Forbidden = class Forbidden extends HttpError {
  constructor(message, errorData) {
    super(message, 403, errorData)
  }
}


exports.InternalError = class InternalError extends HttpError {
  constructor(message, errorData) {
    super(message, 500, errorData)
  }
}
