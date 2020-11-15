const { HttpError, InternalError } = require('./httpErrors')
const { success, failure } = require('./responses')
const log = require('../log')('server/utils/generatorHandler')

module.exports = function generatorHandler(requestHandler) {
  // const wrappedRequestHandler = wrap(requestHandler)

  // return (req, res, next) => {
  //   wrappedRequestHandler(req, res, next).then(
  //     handlerResponse => success(res, handlerResponse),
  //     error => {
  //       log.error(error, `${requestHandler.name} failed`)
  //       if (!(error instanceof HttpError)) {
  //         error = new InternalError(error.message)
  //       }
  //       failure(res, error)
  //     }
  //   )
  // }
}
