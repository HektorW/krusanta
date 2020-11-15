const { join } = require('path')
const { Router, static } = require('express')
const { DEVELOPMENT } = require('../config/env')
const log = require('../log')('server/client')

module.exports = function createClientRoute() {
  if (DEVELOPMENT) {
    log.info('Redirecting client to dev server')
    return (req, res) => res.redirect('http://localhost:3000')
  }

  log.info('Serving static client files')

  const router = Router()

  const clientFolder = join(__dirname, '../../client/build')
  
  router.use(static(clientFolder))
  router.use((req, res, next) => {
    if (
      req.method === 'GET' &&
      req.accepts('html') &&
      req.url.includes('.') !== true
    ) {
      return res.sendFile(join(clientFolder, 'index.html'))
    }
    next()
  })

  return router 
}
