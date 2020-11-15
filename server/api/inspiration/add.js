const { addInspiration, getUserInspirations } = require('../../db/models/inspiration')

module.exports = function* addInspirationRequest(req) {
  const { user } = req
  const { value } = req.body
  yield addInspiration(user.id, value)
  return yield getUserInspirations(user.id)
}
