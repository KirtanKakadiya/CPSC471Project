var sql = require('mysql2')
require('dotenv').config();
const fs = require('fs');

DB_HOST = process.env.DB_HOST;
DB_USER = process.env.DB_USER;
DB_PASS = process.env.DB_PASSWORD;
const sqlFilePath = './database/university_booking_create.sql';

var databaseConnection =  sql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
})

databaseConnection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to the database');
  
    // Read SQL file
    fs.readFile(sqlFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading SQL file:', err);
        return;
      }
  
      // Split SQL file into individual queries
      const queries = data.split(';').filter(query => query.trim() !== '');
  
      // Execute each query
      queries.forEach(query => {
        databaseConnection.query(query, (err, results) => {
          if (err) {
            console.error('Error executing query:', err);
            return;
          }
          else{
            console.log('Query executed successfully');
          }
          
        });
      });
    });
  });

module.exports = databaseConnection;