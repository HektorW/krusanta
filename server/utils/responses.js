exports.success = function success(response, responseData = {}, status = 200) {
  response
    .status(status)
    .json(responseData)
    .end()
}

exports.failure = function failure(response, error) {
  if (typeof error !== 'object') {
    error = { message: error }
  }

  const status = error.status || 500
  const message = error.message || 'Unspecified error'
  const errorData = error.errorData || {}

  response
    .status(status)
    .json(Object.assign({ message }, errorData))
    .end() 
}
