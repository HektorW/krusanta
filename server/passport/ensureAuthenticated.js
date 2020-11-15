const { Unauthorized } = require('../utils/httpErrors')
const { failure } = require('../utils/responses')

module.exports = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated() !== true) {
    return failure(res, new Unauthorized('No authenticated user'))
  }
  next()
}
