const pool = require("../config/db");

exports.create = async (post) => {
    const { title, content, userId } = post;
    const [result] = await pool.execute(
        "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)",
        [title, content, userId]
    );
    return result;
};

exports.findAll = async (order = "DESC") => {
    const [rows] = await pool.execute(`SELECT * FROM posts ORDER BY created_at ${order}`);
    return rows;
};

exports.findById = async (id) => {
    const [rows] = await pool.execute("SELECT * FROM posts WHERE id = ?", [id]);
    return rows[0];
};

exports.update = async (id, title, content) => {
    const [result] = await pool.execute(
        "UPDATE posts SET title = ?, content = ? WHERE id = ?",
        [title, content, id]
    );
    return result;
};

exports.delete = async (id) => {
    const [result] = await pool.execute("DELETE FROM posts WHERE id = ?", [id]);
    return result;
};
