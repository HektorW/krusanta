const { updateInspiration, getUserInspirations } = require('../../db/models/inspiration')

module.exports = function* updateInspirationRequest(req) {
  const { user } = req
  const { id, value } = req.body
  yield updateInspiration(id, value) 
  const inspirations = yield getUserInspirations(user.id)
  return inspirations
}
