const log = require('../../log')('server/api/auth/login')

module.exports = function loginResponse({ user }) {
  log.info({ user }, 'login')
  return user
}
