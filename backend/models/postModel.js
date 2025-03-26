const db = require('../config/db');

class Post {
    static create(title, content, authorId, callback) {
        db.query('INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)', 
        [title, content, authorId], callback);
    }

    static getAll(callback) {
        db.query('SELECT * FROM posts ORDER BY created_at DESC', callback);
    }

    static getById(postId, callback) {
        db.query('SELECT * FROM posts WHERE id = ?', [postId], callback);
    }

    static update(postId, authorId, title, content, callback) {
        db.query('UPDATE posts SET title = ?, content = ? WHERE id = ? AND author_id = ?', 
        [title, content, postId, authorId], callback);
    }

    static delete(postId, authorId, callback) {
        db.query('DELETE FROM posts WHERE id = ? AND author_id = ?', 
        [postId, authorId], callback);
    }
}

module.exports = Post;
