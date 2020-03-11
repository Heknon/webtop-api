const express = require('express');
const sessions = require('../sessions');
//import { Client } from '@heknon/node-webtop';

const router = express.Router();

router.get('/', (req, res, next) => {
    const key = req.cookies.session;
    const removeUnfilled = req.query.removeUnfilledGrades;

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
    client.getGrades(removeUnfilled !== undefined ? stringToBoolean(removeUnfilled) : true).then(grades => {
        res.status(200).json({
            success: true,
            grades
        });
    }).catch(err => {
        res.status(500).json({
            success: false
        });
    });
});

router.get('/year', (req, res, next) => {
    const key = req.cookies.session;
    const removeUnfilled = req.query.removeUnfilledGrades;
    const studyYear = Number.parseInt(req.query.studyYear);

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
    client.getYearGrades(studyYear, removeUnfilled !== undefined ? stringToBoolean(removeUnfilled) : true).then(grades => {
        res.status(200).json({
            success: true,
            grades
        });
    }).catch(err => {
        res.status(500).json({
            success: false
        })
    });
});

router.get('/semester', (req, res, next) => {
    const key = req.cookies.session;
    const removeUnfilled = req.query.removeUnfilledGrades;
    const studyYear = Number.parseInt(req.query.studyYear);
    const semester = Number.parseInt(req.query.semester);

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
    client.getSemesterGrades(studyYear, semester, removeUnfilled !== undefined ? stringToBoolean(removeUnfilled) : true).then(grades => {
        res.status(200).json({
            success: true,
            grades
        });
    }).catch(err => {
        res.status(500).json({
            success: false
        })
    });
});

const stringToBoolean = (str) => str === 'true'

module.exports = router;

