const crypto = require('crypto');

const generate_key = function() {
    return crypto.randomBytes(16).toString('base64');
};


class Sessions {
    constructor() {
        this.sessions = {};
    }

    addSession(client) {
        const key = generate_key();
        this.sessions[key] = client;
        return key;
    }

    removeSession(key) {
        delete this.sessions[key];
    }

    sessionExists(key) {
        return this.sessions.hasOwnProperty(key)
    }

    getSession(key) {
        return this.sessions[key];
    }
}


module.exports = {
    generate_key,
    sessions: new Sessions()
};
