const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const gradesRoute = require('./routes/grades');
const timetableRoute = require('./routes/timetable');
const inboxRoute = require('./routes/inbox');
const testsLeftRoute = require('./routes/testsLeft');
const timetableChangesRoute = require('./routes/timetableChanges');
const settingsRoute = require('./routes/settings');

const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser());
app.use(bodyParser());

app.use('/api/login', loginRoute);
app.use('/api/logout', logoutRoute);
app.use('/api/grades', gradesRoute);
app.use('/api/timetable', timetableRoute);
app.use('/api/inbox', inboxRoute);
app.use('/api/testsleft', testsLeftRoute);
app.use('/api/timetable/changes', timetableChangesRoute);
app.use('/api/settings/update', settingsRoute);



module.exports = app;

