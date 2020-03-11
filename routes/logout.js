const express = require('express');
const sessions = require('../sessions');

const router = express.Router();

router.post('/', (req, res, next) => {
    const key = req.cookies.session;
    if (!sessions.sessions.sessionExists(key)) {
        res.status(401).json({
            success: false,
            reason: "You might not be logged in"
        });
        return;
    }
    const client = sessions.sessions.getSession(key)
    client.logout().then(res2 => {
        sessions.sessions.removeSession(key)
        res.status(res2.status).json({
            success: true
        });
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            success: false
        });
    });
});

module.exports = router;

