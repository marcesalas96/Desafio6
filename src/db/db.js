const knex = require('knex')
const {USERNAME_DB,PASSWORD_DB} = require('../utils/envVariables')
const usernameDB = USERNAME_DB
const passwordDB = PASSWORD_DB
const path = require('path')
const configMDB = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: usernameDB,
        password: passwordDB,
        database: "desafiosql",
    },
    pool: { min: 0, max: 7 }
}
const configSQLite3 = {
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, './db.sqlite')
    },
    useNullAsDefault: true
};
const databaseMD = knex(configMDB)
const databaseSQLite = knex(configSQLite3)

module.exports = {databaseMD, databaseSQLite}