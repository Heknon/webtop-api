const express = require('express');
const sessions = require('../sessions');
//import { Client } from '@heknon/node-webtop';

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
    client.getTestLeftToDo().then(tests => {
        res.status(200).json(tests);
    }).catch(error => {
        res.status(500).json({success: false, error})
    });
    
});


module.exports = router;
