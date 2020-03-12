const express = require('express');
const sessions = require('../sessions');

const router = express.Router();

router.post('/password', (req, res, next) => {
    const key = req.cookies.session;
    const newPassword = req.body.password;

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
    client.changePassword(newPassword).then(data => {
        if (!data.update) throw new Error('Incorrect data.');
        res.status(200).json(data);
    }).catch(error => res.status(500).json({
        success: false,
        error
    }))

});

router.post('/username', (req, res, next) => {
    const key = req.cookies.session;
    const newUsername = req.body.username;

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
    client.changeUsername(newUsername).then(data => {
        if (!data.update) throw new Error('Incorrect data.');
        res.status(200).json(data);
    }).catch(error => res.status(500).json({
        success: false,
        error
    }))

});

router.post('/personaldetails', (req, res, next) => {
    const key = req.cookies.session;
    const email = req.body.email;
    const showMyEmail = req.body.showMyEmail;
    const showMyPhoneNumber = req.body.showMyPhoneNumber;
    const emailOnUpdate = req.body.emailOnUpdate;
    const phoneNumber = req.body.phoneNumber;

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
    client.changePersonalDetails({
        canReverifiedEmail: false,
        cellphone: phoneNumber,
        email,
        showMyEmail,
        showMyCellphone: showMyPhoneNumber,
        emailUponUpdate: emailOnUpdate
    }).then(data => {
        res.status(200).json(data);
    }).catch(error => res.status(500).json({
        success: false,
        error
    }))
});

router.post('/pushnotifications', (req, res, next) => {
    const key = req.cookies.session;

    const {
        gradeNotifications,
        disciplinaryNotifications,
        homeworkNotifications,
        bagrutGradeNotifications,
        messageNotifications,
        periodicalGradeNotifications,
        timetableChangeNotifications,
        timetableEventChangesNotifications,
        timetableGeneralMessageNotifications,
        timetableTestsNotifications
    } = req.body;

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
    client.changePushNotifications({
        pushNotification_discipline: disciplinaryNotifications,
        pushNotification_grades: gradeNotifications,
        pushNotification_homework: homeworkNotifications,
        pushNotification_matriculationGrades: bagrutGradeNotifications,
        pushNotification_messages: messageNotifications,
        pushNotification_periodGrades: periodicalGradeNotifications,
        pushNotification_timetableChanges: timetableChangeNotifications,
        pushNotification_timetableChangesEvents: timetableEventChangesNotifications,
        pushNotification_timetableChangesGeneralMessages: timetableGeneralMessageNotifications,
        pushNotification_timetableChangesTests: timetableTestsNotifications
    }).then(data => {
        res.status(200).json(data);
    }).catch(error => res.status(500).json({
        success: false,
        error
    }))

});


module.exports = router;