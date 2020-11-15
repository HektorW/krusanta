const { sessionSecret } = require('../config')

module.exports = require('express-session')({
  name: 'sss',
  secret: sessionSecret,
  resave: true,
  saveUninitialized: true,
})
