const express = require('express');
const router = express.Router();
const databaseConnection = require('../database/model.js');

//1.0 Viewing rooms /rooms/viewrooms
router.get('/viewroom', (req, res) => {

    let data = [];

    
    databaseConnection.query('SELECT * FROM ROOM NATURAL JOIN CLASS_ROOM', (err, results) => {
        
        if(err) {
            
            return res.status(500).send('Internal Server Error');
        }
        else if(results.affectedRows === 0){
            
            return res.status(401).send('Couldnt view room');
        }
        else{
            results.forEach(row => data.push(row));
            
        }
    
    });

    databaseConnection.query('SELECT * FROM ROOM NATURAL JOIN LECTURE_HALL ', (err, result) => {
        if(err) {
            return res.status(500).send('Internal Server Error');
        }
        else if(result.affectedRows === 0){
            return res.status(401).send('Couldnt view rooms');
        }
        else{
            result.forEach(row => data.push(row));    
            
        }
    
    });

    databaseConnection.query('SELECT * FROM ROOM NATURAL JOIN CONFERENCE_ROOM ', (err, result) => {
        if(err) {
            return res.status(500).send('Internal Server Error');
        }
        else if(result.affectedRows === 0){
            return res.status(401).send('Couldnt view rooms');
        }
        else{
            result.forEach(row => data.push(row));   
            return res.status(200).json(data);
        }
    });    

})

router.post('/addroom/lecture', (req, res) => {
    const {room, username, capacity, room_type, indplugs, pid,ppass} = req.body;

    databaseConnection.query('INSERT INTO ROOM(room_id, created_by, capacity, room_type) VALUES(?,?,?,?) ', [room,username, capacity, room_type], (err, result) => {
        if(err) {
            return res.status(500).send('Internal Server Error');
        }
        else if(result.affectedRows === 0){
            return res.status(401).send('Couldnt view rooms');
        }
    });   

    databaseConnection.query('INSERT INTO LECTURE_HALL(room_id, individual_plugins, podium_id, podium_password) VALUES(?,?,?,?) ', [room,indplugs, pid, ppass], (err, result) => {
        if(err) {
            return res.status(500).send('Internal Server Error');
        }
        else if(result.affectedRows === 0){
            return res.status(401).send('Couldnt view rooms');
        }
        else{
            return res.status(200).send("Room Created successfully");
        }
    });  

});

router.post('/addroom/class', (req, res) => {
    const {room, username, capacity, room_type, indplugs, board,projector} = req.body;
    console.log(room, username, capacity, room_type, indplugs, board, projector);
    databaseConnection.query('INSERT INTO ROOM(room_id, created_by, capacity, room_type) VALUES(?,?,?,?) ', [room,username, capacity, room_type], (err, result) => {
        if(err) {
            return res.status(500).send('Internal Server Error');
        }
        else if(result.affectedRows === 0){
            return res.status(401).send('Couldnt view rooms');
        }
        console.log(result);
    });   

    databaseConnection.query('INSERT INTO CLASS_ROOM(room_id, individual_plugins, board_type, projector) VALUES(?,?,?,?) ', [room,indplugs, board, projector], (err, result) => {
        if(err) {
            return res.status(500).send('Internal Server Error');
        }
        else if(result.affectedRows === 0){
            return res.status(401).send('Couldnt view rooms');
        }
        else{
            console.log(result);
            return res.status(200).send("Room Created successfully");
        }
        
    });  

});


router.post('/addroom/conference', (req, res) => {
    const {room, username, capacity, room_type, indplugs, board,projector} = req.body;

    databaseConnection.query('INSERT INTO ROOM(room_id, created_by, capacity, room_type) VALUES(?,?,?,?) ', [room,username, capacity, room_type], (err, result) => {
        if(err) {
            return res.status(500).send('Internal Server Error');
        }
        else if(result.affectedRows === 0){
            return res.status(401).send('Couldnt view rooms');
        }
    });   

    databaseConnection.query('INSERT INTO CONFERENCE_ROOM(room_id, individual_plugins, board_type, projector) VALUES(?,?,?,?) ', [room,indplugs, board, projector], (err, result) => {
        if(err) {
            return res.status(500).send('Internal Server Error');
        }
        else if(result.affectedRows === 0){
            return res.status(401).send('Couldnt view rooms');
        }
        else{
            return res.status(200).send("Room Created successfully");
        }
    });  

});

module.exports = router;