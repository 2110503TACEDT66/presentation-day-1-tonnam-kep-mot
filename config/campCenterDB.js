const mysql = require("mysql");

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'campCenter'
});

module.exports = connection;