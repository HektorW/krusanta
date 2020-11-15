const { Pool } = require('pg')
const { parse } = require('url')
const { databaseSsl, databaseUrl } = require('../config')
const log = require('../log')('db/postgres')

let pool

exports.setup = function setup() {
  const { hostname: host, port, auth, pathname } = parse(databaseUrl)
  const [user, password] = auth.split(':')
  const [, database] = pathname.split('/')
  const config = {
    user,
    password,
    host,
    port,
    database,
    ssl: databaseSsl,
    max: 10,
  }
  pool = new Pool(config)

  log.info({ config }, 'Setting up postgres pool')

  return Promise.resolve()
}

exports.run = function run(query, values) {
  return pool.query(transformSqliteQuery(query), values)
}

exports.get = function get(query, values) {
  return pool.query(transformSqliteQuery(query), values)
    .then(({ rows }) => rows[0])
}

exports.all = function all(query, values) {
  return pool.query(transformSqliteQuery(query), values)
    .then(({ rows }) => rows)
}

exports.insert = function insert(tableName, columns, values) {
  const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${columns.map((_, index) => `$${index + 1}`).join(', ')}) RETURNING id`
  return pool.query(query, values)
    .then(({ rows }) => rows[0].id)
}


function transformSqliteQuery(query) {
  let index = 1
  return query.replace(/\?/g, () => `$${index++}`)
}
