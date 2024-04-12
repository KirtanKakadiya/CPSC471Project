const express = require('express');
const router = express.Router();
const databaseConnection = require('../database/model.js');

    
// DAYOFWEEK() returns 1 for sunday, 2 for monday, etc
// Monday, Wednesday, Friday are the only 'even' days so Day%2=0
// Tuesday/ Thursday will just need two checks
// get all the lecture hall appointments that do not conflict with
//   the start and end times on the specified days
// semester_start and semester_end must be DATETIME format
router.post('/getPotentialRooms', (req, res) => {
    // start_time TIME
    // end_time TIME
    // days BOOLEAN (MWF = 0, TTh = 1)
    // semester_start DATETIME
    // semester_end DATETIME 
    const {start_time, end_time, days, semester_start, semester_end} =  req.body;
    let data = [];

    if(!days){ // Monday, Wednesday, Friday
        databaseConnection.query(
        // get rooms that are not in
        // room/lecture/booking
        // where the day is even,
        // time of day interferes, 
        // and the booking is in the semester time window
        'SELECT * FROM ROOM NATURAL JOIN LECTURE_HALL WHERE room_id NOT IN\
        (SELECT room_id FROM ROOM NATURAL JOIN LECTURE_HALL \
        JOIN BOOKING ON ROOM.room_id = held_in\
        WHERE (DAYOFWEEK(BOOKING.start_) % 2 = 0) AND\
        (TIME(end_) < ? OR TIME(start_) > ?) AND \
        (start_ > ?) AND (start_ < ?))', 
        [start_time, end_time, semester_start, semester_end],
        (err, results) => {
            if(err){
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
                
            else if(results.affectedRows === 0)
                return res.status(401).send('Couldnt view room');
            else{
                results.forEach(row => data.push(row));   
                return res.status(200).json(data);
            }
            // res is rooms with no time conflict for the whole semester
        });  
    } 
    else{ // Tuesday/ Thursday
        databaseConnection.query(
            // Samesies ^^ except for days 
        'SELECT * FROM ROOM NATURAL JOIN LECTURE_HALL WHERE room_id NOT IN\
        (SELECT room_id FROM ROOM NATURAL JOIN LECTURE_HALL \
        JOIN BOOKING ON ROOM.room_id = held_in\
        WHERE ((DAYOFWEEK(BOOKING.start_)=3) OR (DAYOFWEEK(BOOKING.start_)=5)) AND\
        (TIME(end_) < ? OR TIME(start_) > ?) AND \
        (start_ > ?) AND \
        (start_ < ?))', 
        [start_time, end_time, semester_start, semester_end],
        (err, results) => {
            if(err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
                
            }
            else if(results.affectedRows === 0)
                return res.status(401).send('Couldnt view room');
            else{
                results.forEach(row => data.push(row));   
                return res.status(200).json(data);
            }
            // res is rooms with no conflict for the whole semester
        }); 
    }

})

router.post('/getstudentschedule', (req, res) => {
    const{student_id} = req.body;
    let courses = [];
    databaseConnection.query( 'SELECT DISTINCT COURSE.course_id, COURSE.section_id, start_time, end_time, days_, taught_in, TEACHES.person_id, f_name, l_name\
     FROM ENROLLED_IN JOIN COURSE ON ENROLLED_IN.course_id = COURSE.course_id AND ENROLLED_IN.section_id = COURSE.section_id\
     JOIN TEACHES ON COURSE.course_id = TEACHES.course_id\
     JOIN PERSON on TEACHES.person_id = PERSON.id\
     WHERE ENROLLED_IN.person_id = ?', [student_id], (err, result) => {
        if(err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        else if(result.affectedRows === 0)
            return res.status(401).send('Couldnt find courses');
        else{
            result.forEach((row) => courses.push(row));   
            //console.log(courses);
            return res.status(200).json(courses);
        }
    });
});

router.post('/getprofinfo', (req, res) => {
    const{person_id} = req.body;
    let profs = [];
    databaseConnection.query('SELECT DISTINCT PERSON.f_name, PERSON.l_name, PROFESSOR.start_time, PROFESSOR.end_time, PROFESSOR.days_, PROFESSOR.held_in \
    FROM ENROLLED_IN JOIN COURSE ON ENROLLED_IN.course_id = COURSE.course_id AND ENROLLED_IN.section_id = COURSE.section_id\
    JOIN TEACHES ON COURSE.course_id = TEACHES.course_id JOIN PROFESSOR ON PROFESSOR.professor_id\
    JOIN PERSON on PROFESSOR.professor_id = PERSON.id\
    WHERE ENROLLED_IN.person_id = ?', [person_id], (err, result) => {
        if(err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        else if(result.affectedRows === 0)
            return res.status(401).send('Couldnt find courses');
        else{
            result.forEach((row) => profs.push(row));  
            return res.status(200).json(profs);
        }
    });
});

router.post('/getprofessorschedule', (req, res) => {
    const{prof_id} = req.body;
    let courses = [];
    databaseConnection.query( 'SELECT DISTINCT COURSE.course_id, COURSE.section_id, start_time, end_time, days_, taught_in\
     FROM TEACHES JOIN COURSE ON TEACHES.course_id = COURSE.course_id AND TEACHES.section_id = COURSE.section_id\
     WHERE TEACHES.person_id = ?', [prof_id], (err, result) => {
        if(err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        else if(result.affectedRows === 0)
            return res.status(401).send('Couldnt find courses');
        else{
            result.forEach((row) => courses.push(row));   
            //console.log(courses);
            return res.status(200).json(courses);
        }
    });
});

router.post('/getprofofficehours', (req, res) => {
    const{prof_id} = req.body;
    databaseConnection.query( 'SELECT start_time, end_time, days_, held_in\
     FROM PROFESSOR\
     WHERE professor_id = ?', [prof_id], (err, result) => {
        if(err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        else if(result.affectedRows === 0)
            return res.status(401).send('Couldnt find courses');
        else{
            return res.status(200).json(result);
        }
    });
});

// after a time has been found:
// router.post('/addcourse', (req, res) => {
//     // start_time TIME, will have dates attached for BOOKINGs
//     // start_end TIME, will have dates attached for BOOKINGs
//     // semester_start DATETIME, needs to be converted
//     // semester_end DATETIME, needs to be converted
//     const {course_id, section_id, created_by, class_size, start_time, end_time, 
//         days_, taught_in, semester_start, semester_end} =  req.body;

//     // semester_start = semester_start.replace(' ', 'T');  // so that js date can parse it:
//     // semester_end = semester_end.replace(' ', 'T');      //   YYYY-MM-DD HH:MM:SS -> YYYY-MM-DDTHH:MM:SS
//     let semester_start_date = new Date(semester_start); // js date object of the sql semester_start
//     let semester_end_date = new Date(semester_end);     //   ^^ but for semester_end
    
//     // book the times first, if there is an error then the course will not be created
//     let time = semester_start_date;
//     if(days_){
//         while(time < semester_end_date){
//             if((time.getDay()+1)%2 == 0){ // getDay() returns 0 for Sunday, 1 for Monday, etc.
//                 let start_DATETIME = time.toISOString().slice(0, 10) + ' ' + start_time;
//                 let end_DATETIME = time.toISOString().slice(0, 10) + ' ' + end_time;
//                 databaseConnection.query('INSERT INTO BOOKING \
//                     (start_, end_, held_in, approved_by, scheduled_by) \
//                     VALUES (?, ?, ?, ?, ?)', 
//                     [start_DATETIME, end_DATETIME, taught_in, created_by, created_by], // need the date on these times
//                     (err, result) => {
//                     if(err) 
//                         return res.status(500).send('Internal Server Error');
//                     else if(result.affectedRows === 0)
//                         return res.status(401).send('Couldnt set time');
//                 })
//                 time.setDate(time.getDate() + 2);
//             }
//             else time.setDate(time.getDate() + 1);
//         }
//     }
//     else{
//         // line the day up with Tuesday or Thursday
//         while(time.getDay() != 2 && time.getDay() != 4)
//             time.setDate(time.getDate() + 1);
//         while(time < semester_end_date){
//             databaseConnection.query('INSERT INTO BOOKING \
//                 (start_, end_, held_in, approved_by, scheduled_by) \
//                 VALUES (?, ?, ?, ?, ?)', 
//                 [start_time, end_time, taught_in, created_by, created_by], // need the date on these times
//                 (err, result) => {
//                 if(err) 
//                     return res.status(500).send('Internal Server Error');
//                 else if(result.affectedRows === 0)
//                     return res.status(401).send('Couldnt set time');
//             })
//             if(time.getDay() == 2) // cycle between Tuesdays (2) and Thursdays (4)
//                 time.setDate(time.getDate() + 2);
//             else time.setDate(time.getDate() + 5); // (4 + 5) % 7 = 2

//         }
//     }
//     // insert into course, if time failed then this does not happen. 
//     databaseConnection.query('INSERT INTO COURSE \
//         (course_id, section_id, created_by, class_size, start_time, end_time, days_, taught_in) \
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
//         [course_id, section_id, created_by, class_size, start_time, end_time, days_, taught_in], 
//         (err, result) => {
//         if(err) 
//             return res.status(500).send('Internal Server Error');
//         else if(result.affectedRows === 0)
//             return res.status(401).send('Couldnt create course');
//         else
//             return res.status(200).send("Room Created successfully");
//     })
    
// })

router.post('/addcourse', (req, res) => {
    const {course_id, section_id, created_by, class_size, start_time, end_time, 
        days_, taught_in, semester_start, semester_end} = req.body;

    let semester_start_date = new Date(semester_start);
    let semester_end_date = new Date(semester_end);

    let time = semester_start_date;
    const bookingPromises = [];

    if (days_) {
        while (time < semester_end_date) {
            if ((time.getDay() + 1) % 2 == 0) {
                let start_DATETIME = time.toISOString().slice(0, 10) + ' ' + start_time;
                let end_DATETIME = time.toISOString().slice(0, 10) + ' ' + end_time;
                const promise = new Promise((resolve, reject) => {
                    databaseConnection.query('INSERT INTO BOOKING (start_, end_, held_in, approved_by, scheduled_by) VALUES (?, ?, ?, ?, ?)', 
                        [start_DATETIME, end_DATETIME, taught_in, created_by, created_by],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            else if (result.affectedRows === 0) reject(new Error('Couldnt set time'));
                            else resolve();
                        }
                    );
                });
                bookingPromises.push(promise);
                time.setDate(time.getDate() + 2);
            } else {
                time.setDate(time.getDate() + 1);
            }
        }
    } else {
        while (time.getDay() != 2 && time.getDay() != 4) {
            time.setDate(time.getDate() + 1);
        }
        while (time < semester_end_date) {
            let start_DATETIME = time.toISOString().slice(0, 10) + ' ' + start_time;
            let end_DATETIME = time.toISOString().slice(0, 10) + ' ' + end_time;
            const promise = new Promise((resolve, reject) => {
                databaseConnection.query('INSERT INTO BOOKING (start_, end_, held_in, approved_by, scheduled_by) VALUES (?, ?, ?, ?, ?)', 
                    [start_DATETIME, end_DATETIME, taught_in, created_by, created_by],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        else if (result.affectedRows === 0) reject(new Error('Couldnt set time'));
                        else resolve();
                    }
                );
            });
            bookingPromises.push(promise);

            if (time.getDay() == 2) {
                time.setDate(time.getDate() + 2);
            } else {
                time.setDate(time.getDate() + 5);
            }
        }
    }

    Promise.all(bookingPromises)
        .then(() => {
            databaseConnection.query('INSERT INTO COURSE (course_id, section_id, created_by, class_size, start_time, end_time, days_, taught_in) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
                [course_id, section_id, created_by, class_size, start_time, end_time, days_, taught_in], 
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Internal Server Error');
                    } else if (result.affectedRows === 0) {
                        res.status(401).send('Couldnt create course');
                    } else {
                        res.status(200).send('Course created successfully');
                    }
                }
            );
        })
        .catch(error => {
            res.status(500).send('Internal Server Error');
        });
});

// else{
//     res.status(200).send("Successfully created course");
// }
module.exports = router;