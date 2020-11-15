const { getAll } = require('../../db/models/user')

module.exports = function* getUsers() {
  return yield getAll()
}
