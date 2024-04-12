const express = require('express');
const router = express.Router();
const databaseConnection = require('../database/model.js');

//1.0 Get user /user/getuser
router.get('/getuser', (req, res) => {
    const {email, password} = req.query;
    
    databaseConnection.query('SELECT id, f_name, m_name, l_name, phone_number, email FROM PERSON WHERE email = ? AND password = ?',[email, password], (err, result) => {
        if(err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        else if(result.length === 0){
            return res.status(401).send('Unauthorized');
        }
        else {
            databaseConnection.query('SELECT student_id FROM STUDENT WHERE student_id = ?',[result[0].id], (err, typeRes) => {
                if(err) {
                    console.log(err);
                    return res.status(500).send('Internal Server Error');
                }
                else if(typeRes.length === 1){
                    result[0].userType = "STUDENT";
                    return res.status(200).json(result[0]);
                }
                else {
                    databaseConnection.query('SELECT professor_id FROM PROFESSOR WHERE professor_id = ?',[result[0].id], (err, typeRes) => {
                        if(err) {
                            console.log(err);
                            return res.status(500).send('Internal Server Error');
                        }
                        else if(typeRes.length === 1){
                            result[0].userType = "PROFESSOR";
                            console.log(result);
                            return res.status(200).json(result[0]);
                        }
                        else {
                            databaseConnection.query('SELECT admin_id FROM ADMINISTRATOR WHERE admin_id = ?',[result[0].id], (err, typeRes) => {
                                if(err) {
                                    console.log(err);
                                    return res.status(500).send('Internal Server Error');
                                }
                                else if(typeRes.length === 1){
                                    result[0].userType = "ADMIN";
                                    return res.status(200).json(result[0]);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

router.post('/setprofavailability', (req, res) => {
    const {startTime, endTime, prof_id} = req.body;
    databaseConnection.query('UPDATE PROFESSOR SET start_time = ?, end_time = ? WHERE professor_id = ?',[startTime, endTime, prof_id], (err, result) => {
        if(err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        else if(result.affectedRows === 0){
            console.log(result);
            return res.status(200).json({res:true});
        }
        else{
            console.log(result);
            return res.status(200).json({res:false});
        }
    });
})

//2.0 Adding user /user/adduser
router.post('/adduser', (req, res) => {
    const {f_name, m_name, l_name, phone_number, email, password} =  req.body;
    if(m_name = "") m_name = NULL;

    databaseConnection.query('INSERT INTO PERSON (f_name, m_name, l_name, phone_number, email, password)  VALUES (?, ?, ?, ?, ?, ?, ?)', [f_name, m_name, l_name, phone_number, email, password, "student"], (req, result) => {
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

//3.0 Admin add user /user/adminadduser
router.post('/adminadduser', (req, res) => {
    const {f_name, m_name, l_name, phone_number, email, password, usertype} =  req.body;
    if(m_name = "") m_name = NULL;

    databaseConnection.query('INSERT INTO PERSON (f_name, m_name, l_name, phone_number, email, password)  VALUES (?, ?, ?, ?, ?, ?, ?)', [f_name, m_name, l_name, phone_number, email, password,usertype], (req, result) => {
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

//4.0 Admin updates user type /user/adminmodifyusertype
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

module.exports = router;