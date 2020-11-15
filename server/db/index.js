const { databaseUrl } = require('../config')

let db
if (databaseUrl) {
  db = require('./postgres')
} else {
  db = require('./sqlite')
}

module.exports = db

require('./setup')()
