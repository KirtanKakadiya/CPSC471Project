const express = require('express');
const router = express.Router();
const databaseConnection = require('../database/model.js');

router.get('/getuser', (req, res) => {
    const {email, password} = req.body;

    databaseConnection.query('SELECT id, f_name, m_name, l_name, phone_number, email, usertype FROM PERSON WHERE email = ? AND password = ?',[email, password], (err, result) => {
        if(err) {
            return res.status(500).send('Internal Server Error');
        }
        else if(result.affectedRows === 0){
            return res.status(401).send('Unauthorized');
        }
        else{
            return res.status(200).json(result);
        }
    });
});

router.post('/adduser', (req, res) => {
    const {f_name, m_name, l_name, phone_number, email, password} =  req.body;
    if(m_name = "") m_name = NULL;

    databaseConnection.query('INSERT INTO PERSON (f_name, m_name, l_name, phone_number, email, password, usertype)  VALUES (?, ?, ?, ?, ?, ?, ?)', [f_name, m_name, l_name, phone_number, email, password, "student"], (req, res) => {
        if(err) {
            return res.status(500).send('Internal Server Error');
        }
        else if(result.affectedRows === 0){
            return res.status(401).send('Couldnt add user');
        }
        else{
            return res.status(200).send("Successfully added user");
        }
    
    })
})

router.post('/adminadduser', (req, res) => {
    const {f_name, m_name, l_name, phone_number, email, password, usertype} =  req.body;
    if(m_name = "") m_name = NULL;

    databaseConnection.query('INSERT INTO PERSON (f_name, m_name, l_name, phone_number, email, password, usertype)  VALUES (?, ?, ?, ?, ?, ?, ?)', [f_name, m_name, l_name, phone_number, email, password,usertype], (req, res) => {
        if(err) {
            return res.status(500).send('Internal Server Error');
        }
        else if(result.affectedRows === 0){
            return res.status(401).send('Couldnt add user');
        }
        else{
            return res.status(200).send("Successfully added user");
        }
    
    })
})

router.post('/adminmodifyusertype', (req, res) => {
    const { email, usertype} =  req.body;

    databaseConnection.query('UPDATE PERSON SET usertype = (?) WHERE email = ?', [usertype, email], (req, res) => {
        if(err) {
            return res.status(500).send('Internal Server Error');
        }
        else if(result.affectedRows === 0){
            return res.status(401).send('Couldnt change user type');
        }
        else{
            return res.status(200).send("Successfully changed user type");
        }
    
    })
})