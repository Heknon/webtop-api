const express = require('express');
const sessions = require('../sessions');
const webtop = require('@heknon/node-webtop');

const router = express.Router();

router.post('/', (req, res, next) => {
    if (sessions.sessions.sessionExists(req.cookies.session)) {
        res.status(200).json({
            success: true,
            info: "Already logged in..."

        });
        return;
    }
    const client = new webtop.Client(req.body.id, req.body.password, false);
    client.login().then(res2 => {
        const key = sessions.sessions.addSession(client);
        res.cookie('session', key);
        return res.status(200).json({
            success: true,
        });
    }).catch(err => {
        console.log('a')
        res.status(401).json({
            sucess: false
        })
    });
});

module.exports = router;