const { addUser } = require('../../db/models/user')
const { BadRequest } = require('../../utils/httpErrors')
const log = require('../../log')('server/api/auth/register')

module.exports = function* register(req) {
  const { realname, username, password } = req.body
  log.info({ body: req.body }, 'register')

  let user
  try {
    user = yield addUser(username, password, realname)
  } catch (error) {
    if (error.alreadyExists) {
      throw new BadRequest('User already exists', { alreadyExists: true })
    }
    throw error
  }

  return new Promise((resolve, reject) => {
    req.logIn(user, loginError => {
      if (loginError) {
        return reject(loginError)
      }
      resolve(user)
    })
  })
}
