const express = require('express');
const router = express.Router();
const databaseConnection = require('../database/model.js');

//1.0 Viewing rooms /rooms/viewrooms
router.get('/viewroom', (req, res) => {

    let data = [];

    databaseConnection.query('SELECT * FROM ROOM NATURAL JOIN CLASS_ROOM ', (req, res) => {
        if(err) {
            return res.status(500).send('Internal Server Error');
        }
        else if(result.affectedRows === 0){
            return res.status(401).send('Couldnt view room');
        }
        else{
            data.push(res);
        }
    
    });

    databaseConnection.query('SELECT * FROM ROOM NATURAL JOIN LECTURE ROOM ', (req, res) => {
        if(err) {
            return res.status(500).send('Internal Server Error');
        }
        else if(result.affectedRows === 0){
            return res.status(401).send('Couldnt view rooms');
        }
        else{
            data.push(res);
        }
    
    });

    databaseConnection.query('SELECT * FROM ROOM NATURAL JOIN CONFERENCE_ROOM ', (req, res) => {
        if(err) {
            return res.status(500).send('Internal Server Error');
        }
        else if(result.affectedRows === 0){
            return res.status(401).send('Couldnt view rooms');
        }
        else{
            data.push(res);
        }
    
    });

    return res.status(200).json(data);


})

router.post('/addroom', (req, res) => {
    const {}


});