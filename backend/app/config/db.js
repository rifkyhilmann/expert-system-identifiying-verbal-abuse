const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbverbalabuse',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = db