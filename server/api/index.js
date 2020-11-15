const { Router } = require('express')

const routes = {
  // '/admin': require('./admin'),
  // '/auth': require('./auth'),
  // '/inspiration': require('./inspiration')
}

module.exports = function createApiRoute() {
  const router = Router()

  Object.keys(routes).forEach(routeName => {
    const routeHandler = routes[routeName]
    router.use(routeName, routeHandler())
  })

  router.use((req, res) => {
    res
      .status(404)
      .end()
  })

  return router
}
