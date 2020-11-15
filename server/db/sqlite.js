const { join } = require('path')
const { Database } = require('sqlite3')

let db
const dbFile = join(__dirname, 'db.sqlite3')

exports.setup = function setup() {
  db = new Database(dbFile)
  return Promise.resolve()
}

exports.run = function run(query, params) {
  return promiseDbMethod('run', query, params)
}

exports.get = function get(query, params) {
  return promiseDbMethod('get', query, params)
}

exports.all = function all(query, params) {
  return promiseDbMethod('all', query, params)
}

exports.insert = function insert(tableName, columns, values) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`
    db.run(query, values, function(error) {
      if (error) {
        return reject(error)
      }
      resolve(this.lastID)
    })
  })
}


function promiseDbMethod(method, query, params = {}) {
  return new Promise((resolve, reject) => {
    db[method](query, params, (error, result) => {
      if (error) {
        return reject(error)
      }
      resolve(result)
    })
  })
}
