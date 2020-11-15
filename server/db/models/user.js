const { createHash } = require('crypto')
const db = require('../index')
const { databaseUrl } = require('../../config')
const { getUserInspirations } = require('./inspiration')
const log = require('../../log')('db/models/user')

const usePostgres = !!databaseUrl

const tableName = exports.tableName = 'user_table'
const tableColumns = usePostgres === true
  ? [
    'id SERIAL PRIMARY KEY',
    'username TEXT',
    'password TEXT',
    'realname TEXT',
    'assignedid INTEGER REFERENCES user_table'
  ]
  : [
    'id INTEGER PRIMARY KEY AUTOINCREMENT',
    'username TEXT',
    'password TEXT',
    'realname TEXT',
    'assignedid REFERENCES user_table',
    'FOREIGN KEY(assignedid) REFERENCES user_table(id)',
  ]

exports.setup = function setup() {
  return db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (${tableColumns.join(', ')})`)
    .then(() => log.info({ tableName, tableColumns }, 'set up user table'))
    .catch(error => log.error(error, 'failed to create user table'))
}


exports.addUser = function(username, password, realname) {
  const columns = ['username', 'password', 'realname']
  const values = [username.toLowerCase(), getMd5(password), realname]
  return getByUsername(username)
    .then(existingUser => {
      if (existingUser) {
        const error = new Error('A user already exists')
        error.alreadyExists = true
        throw error
      }
    })
    .then(() => db.insert(tableName, columns, values))
    .then(id => exports.getById(id))
}

exports.authenticateUser = function(username, password) {
  const query = `SELECT id FROM ${tableName} WHERE username = ? AND password = ?`
  const values = [username.toLowerCase(), getMd5(password)]
  return db.get(query, values)
    .then(user => {
      if (!user) {
        return null
      }
      return exports.getById(user.id)
    })
}

exports.getById = function(id, includeAssigned = true) {
  const query = `SELECT id, username, realname${includeAssigned ? ', assignedid' : ''} FROM ${tableName} WHERE id = ?`
  const values = [id]
  return db.get(query, values)
    .then(user =>
      includeAssigned && user.assignedid
        ? exports.getById(user.assignedid, false)
          .then(assigned => Object.assign({ assigned }, user))
        : user 
    )
    .then(user => getUserInspirations(id)
      .then(inspirations => Object.assign({ inspirations }, user))
    )
}


exports.getAll = function() {
  const query = `SELECT id, realname FROM ${tableName}`
  const values = []
  return db.all(query, values)
}


exports.addAssignedId = function(id, assignedId) {
  const query = `UPDATE ${tableName} SET assignedid = ? WHERE id =?`
  const values = [assignedId, id]
  return db.run(query, values)
}


function getByUsername(username) {
  const query = `SELECT username FROM ${tableName} WHERE username = ?`
  const values = [username.toLowerCase()]
  return db.get(query, values)
}

function getMd5(value) {
  return createHash('md5').update(value).digest('hex')
}
