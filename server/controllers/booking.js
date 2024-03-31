const express = require('express');
const router = express.Router();
const databaseConnection = require('../database/model.js');

//1.0 Viewing rooms /rooms/viewrooms
router.post('/getbooking', (req, res) => {

    const date = req.body;
    console.log(date.date);
    let data = [];

    
    databaseConnection.query('SELECT * FROM BOOKING WHERE ? BETWEEN start_ AND end_', [date.date],(err, results) => {
        
        if(err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        else if(results.affectedRows === 0){
            
            return res.status(401).send('Couldnt view room');
        }
        else{
            console.log(results);
            return res.status(200).json(results);
            
        }
    
    });



})


//2.0 Book Rooms  /rooms/bookroms
router.post('/bookroom', (req, res) => {
    const {room, start, end, name} = req.body;

    databaseConnection.query('INSERT INTO BOOKING(start_, end_, held_in, approved_by, scheduled_by) VALUES (?,?,?,NULL,?)', [start, end, room, name],(err, results) => {
        
        if(err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        else if(results.affectedRows === 0){
            
            return res.status(401).send('Couldnt insert booking');
        }
        else{
            console.log(results);
            return res.status(200).send("Booked Succesfully");
            
        }
    
    });

});

router.post('/getNameBooking', (req, res) => {
    const {name} = req.body;
    
    databaseConnection.query('SELECT * FROM BOOKING WHERE scheduled_by = ?',[name], (err, results) => {
        
        if(err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        else if(results.affectedRows === 0){
            
            return res.status(401).send('Couldnt view booking');
        }
        else{
            console.log(results);
            return res.status(200).json(results);
            
        }
    
    });
});

router.post('/getNameBooking', (req, res) => {
    const {name} = req.body;
    
    databaseConnection.query('SELECT * FROM BOOKING WHERE scheduled_by = ?',[name], (err, results) => {
        
        if(err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        else if(results.affectedRows === 0){
            
            return res.status(401).send('Couldnt view booking');
        }
        else{
            console.log(results);
            return res.status(200).json(results);
            
        }
    
    });
});


router.post('/getAllBooking', (req, res) => {
    const {name} = req.body;
    
    databaseConnection.query('SELECT * FROM BOOKING',[name], (err, results) => {
        
        if(err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        else if(results.affectedRows === 0){
            
            return res.status(401).send('Couldnt view booking');
        }
        else{
            console.log(results);
            return res.status(200).json(results);
            
        }
    
    });
});


router.post('/approveBooking', (req, res) => {
    const {room, start, end} = req.body;
    
    databaseConnection.query('UPDATE BOOKING SET approved_by = 1 WHERE start_ = ? AND end_ = ? AND held_in = ?',[start,end,room], (err, results) => {
        
        if(err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        else if(results.affectedRows === 0){
            
            return res.status(401).send('Couldnt approve booking');
        }
        else{
            console.log(results);
            return res.status(200).send("Approved");
            
        }
    
    });
});

router.post('/declineBooking', (req, res) => {
    const {room, start, end} = req.body;
    
    databaseConnection.query('DELETE FROM BOOKING WHERE start_ = ? AND end_ = ? AND held_in = ?',[start,end,room], (err, results) => {
        
        if(err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        else if(results.affectedRows === 0){
            
            return res.status(401).send('Couldnt delete booking');
        }
        else{
            console.log(results);
            return res.status(200).send("DENIED");
            
        }
    
    });
});


router.post('/deleteBooking', (req, res) => {
    const {room, start, end} = req.body;
    
    databaseConnection.query('DELETE FROM BOOKING WHERE start_ = ? AND end_ = ? AND held_in = ?',[start,end,room], (err, results) => {
        
        if(err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        else if(results.affectedRows === 0){
            
            return res.status(401).send('Couldnt delete booking');
        }
        else{
            console.log(results);
            return res.status(200).send("Deleted");
            
        }
    
    });
});




module.exports = router;