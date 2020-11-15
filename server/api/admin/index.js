const { Router } = require('express')
const adminEndpoint = require('../../middleware/adminEndpoint')
const ensureAuthenticated = require('../../passport/ensureAuthenticated')
const generatorHandler = require('../../utils/generatorHandler')

const assignSantas = require('./assignSantas')
const getUsers = require('./getUsers')

module.exports = function createAdminRouter() {
  const router = Router()

  router.use(ensureAuthenticated)
  router.use(adminEndpoint)

  router.get('/users', generatorHandler(getUsers))
  router.post('/assign', generatorHandler(assignSantas))

  return router
}
