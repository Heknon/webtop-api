const express = require('express');
const sessions = require('../sessions');
import { Client } from '@heknon/node-webtop';

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
    client.getTimeTableChanges().then(changes => {
        res.status(200).json(changes);
    }).catch(error => res.status(500).json({success: false, error}));
    
});


module.exports = router;
