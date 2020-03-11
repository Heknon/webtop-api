const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const gradesRoute = require('./routes/grades');
const timetableRoute = require('./routes/timetable');

const app = express();

app.use(morgan('dev'))
app.use(cookieParser());
app.use(bodyParser());

app.use('/api/login', loginRoute);
app.use('/api/logout', logoutRoute);
app.use('/api/grades', gradesRoute);
app.use('/api/timetable', timetableRoute);



module.exports = app;

