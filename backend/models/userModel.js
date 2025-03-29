const pool = require("../config/db");

exports.create = async (user) => {
    const { username, email, password } = user;
    const [result] = await pool.execute(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, password]
    );
    return result;
};

exports.findByEmail = async (email) => {
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
};
