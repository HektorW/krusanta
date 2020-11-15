const passport = require('passport')
const { serialize, deserialize } = require('./serialization')
const strategy = require('./strategy')

module.exports = function setupPassport(app) {
  passport.use(strategy)
  passport.serializeUser(serialize)
  passport.deserializeUser(deserialize)

  app.use(passport.initialize())
  app.use(passport.session())
}
