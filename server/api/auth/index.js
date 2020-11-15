const { Router } = require('express')
const authenticate = require('../../passport/authenticate')
const ensureAuthenticated = require('../../passport/ensureAuthenticated')
const generatorHandler = require('../../utils/generatorHandler')

const loginResponse = require('./login')
const logout = require('./logout')
const register = require('./register')

module.exports = function createAuthRoute() {
  const router = Router()

  router.post('/login', authenticate, generatorHandler(loginResponse))
  router.post('/logout', generatorHandler(logout))
  router.post('/register', generatorHandler(register))
  router.get('/loggedInUser', ensureAuthenticated, generatorHandler(loginResponse))

  return router
}
