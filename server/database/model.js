var sql = require('mysql')
require('dotenv').config();

DB_HOST = process.env.DB_HOST;
DB_USER = process.env.DB_USER;
DB_PASS = process.env.DB_PASSWORD;

var con =  sql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: "CPSC471"
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
}); 

module.exports = con;