const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001


//Controllers
const userController = require('./controllers/user.js');
const roomController = require('./controllers/room.js');
const courseController = require('./controllers/courses.js');
const bookingController = require('./controllers/booking.js');
// const databaseConnection = require('./database/model.js');

app.user(cors());
app.use(express.json());

//Routes
app.use('user', userController);
app.use('room', roomController);
app.use('courses', courseController);
app.use('booking', bookingController);

app.listen(port, function(){
    console.log(`Server listening on port ${port}`);
});