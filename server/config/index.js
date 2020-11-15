const { env } = process
const { getBool } = require('./parse')

module.exports = {
  databaseSsl: getBool(env.DATABASE_SSL, false),
  databaseUrl: env.DATABASE_URL || false,
  forceSsl: getBool(env.FORCE_SSL, false),
  port: env.PORT || 3001,
  sessionSecret: env.SESSION_SECRET || 'abcd1234',
}
