const express = require('express')
const db = require('./db')
const config = require('./config')
const env = require('./config/env')

const log = require('./log')('secret-santa')

log.info({ env, config }, 'Booting secret-santa')

const app = express()

if (config.forceSsl) {
  app.use(require('./middleware/forceSsl'))
}

app.disable('x-powered-by')

app.use(require('cookie-parser')())
app.use(require('body-parser').json())
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('./utils/session'))

require('./passport')(app)

if (env.PRODUCTION) {
  app.use(require('compression')())
}

app.use('/api', require('./api')())
app.use(require('./client')())

db.setup()

app.listen(config.port, () => {
  log.info({ port: config.port }, 'Server is listening')
})