const { removeInspiration, getUserInspirations } = require('../../db/models/inspiration')

module.exports = function* removeInspirationRequest(req) {
  const { user } = req
  const { id } = req.body
  yield removeInspiration(id)
  return yield getUserInspirations(user.id)
}
