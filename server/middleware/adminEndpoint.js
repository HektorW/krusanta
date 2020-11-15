const { Forbidden } = require('../utils/httpErrors')
const { failure } = require('../utils/responses')

module.exports = function adminEndpoint(req, res, next) {
  const { user } = req
  if (user.username.toLowerCase() !== 'hektor') {
    return failure(res, new Forbidden('Endpoint not allowed'))
  }
  next()
}
