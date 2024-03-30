var sql = require('mysql')
require('dotenv').config();

const sqlFilePath = './database/university_booking_create.sql';

DB_HOST = process.env.DB_HOST;
DB_USER = process.env.DB_USER;
DB_PASS = process.env.DB_PASSWORD;

var databaseConnection =  sql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
})

databaseConnection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

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
                console.log('Query executed successfully');
            });
        });
    });
}); 

module.exports = databaseConnection;