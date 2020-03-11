const express = require('express');
const sessions = require('../sessions');

const router = express.Router();

router.get('/', (req, res, next) => {
    const key = req.cookies.session;

    if (!sessions.sessions.sessionExists(key)) {
        res.status(401).json({
            success: false,
            reason: "You might not be logged in"
        })
        return;
    }

    /**
     * @type {Client}
     */
    const client = sessions.sessions.getSession(key);
    client.getTimeTable().then(timetable => {
        res.status(200).json(timetable);
    }).catch(err => {
        res.status(500).json({
            success: false
        })
    });
});

module.exports = router;
