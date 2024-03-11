const express = require('express');
const app = express();
const port = 3001

// const databaseConnection = require('./database/model.js');

app.get('/', function(req, res){
    res.send('Hello World!');
});

app.listen(port, function(){
    console.log('Example app listening on port 3001!');
});