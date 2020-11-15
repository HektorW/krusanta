const { createLogger } = require('bunyan')

module.exports = function createApplicationLogger(name) {
  return createLogger({ name, level: 'debug' })
}
