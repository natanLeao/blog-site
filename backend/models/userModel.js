const db = require('../config/db');

class User {
    static create(username, password, callback) {
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', 
        [username, password], callback);
    }

    static findByUsername(username, callback) {
        db.query('SELECT * FROM users WHERE username = ?', [username], callback);
    }
}

module.exports = User;
