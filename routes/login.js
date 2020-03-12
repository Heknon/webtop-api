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
    const id = req.body.id;
    const password = req.body.password;

    if (id === undefined || password === undefined) {
        res.status(400).json({
            success: false,
            reason: 'You must send a `password` and `id` in the request body!'
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