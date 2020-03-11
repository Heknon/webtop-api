const express = require('express');
const sessions = require('../sessions');
//import { Client } from '@heknon/node-webtop';


const router = express.Router();

router.get('/', (req, res, next) => {
    const key = req.cookies.session;
    const page = req.query.page === undefined ? 10 : req.query.page;
    

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
    client.getInbox(page).then(inbox => {
        res.status(200).json(inbox);
    }).catch(err => {
        res.status(401).json({success: false});
    });
    
});

router.get('/message', (req, res, next) => {
    const key = req.cookies.session;
    const id = req.query.id;

    if (id === undefined) {
        res.status(400).json({success: false, reason: 'Message ID parameter missing!'});
        return;
    } else if (!sessions.sessions.sessionExists(key)) {
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
    client.getMessage(id).then(message => {
        res.status(200).json(message);
    }).catch(error => {
        res.status(500).json({sucess: false, error});
    });
});

module.exports = router;
