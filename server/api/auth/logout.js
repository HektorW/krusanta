const log = require('../../log')('server/api/auth/logout')

module.exports = function logout(req) {
  log.info({ user: req.user }, 'logout')
  req.logout()
  return { success: true }
}
