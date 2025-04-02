const db = require('../config/db');

exports.create = async (username, password) => {
    await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
};

exports.findByUsername = async (username) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
};
