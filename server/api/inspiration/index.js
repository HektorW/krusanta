const { Router } = require('express')
const ensureAuthenticated = require('../../passport/ensureAuthenticated')
const generatorHandler = require('../../utils/generatorHandler')

const addInspiration = require('./add')
const updateInspiration = require('./update')
const removeInspiration = require('./remove')

module.exports = function createInspirationsRoute() {
  const router = Router()

  router.use(ensureAuthenticated)

  router.post('/', generatorHandler(addInspiration))
  router.put('/', generatorHandler(updateInspiration))
  router.delete('/', generatorHandler(removeInspiration))

  return router
}
