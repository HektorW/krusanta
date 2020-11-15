const db = require('./index')
const { setup: setupUser } = require('./models/user')
const { setup: setupInspiration } = require('./models/inspiration')
const log = require('../log')('db/setup')

module.exports = function setup() {
  db.setup()
    .then(setupUser)
    .then(setupInspiration)
    .catch(error => log.error(error, 'Failed to set up db'))
}
