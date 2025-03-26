const db = require('../config/db');

exports.createPost = (req, res) => {
    const { title, content } = req.body;
    db.query('INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)',
    [title, content, req.user.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Postagem criada' });
    });
};

exports.getPosts = (req, res) => {
    db.query('SELECT * FROM posts ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getPost = (req, res) => {
    db.query('SELECT * FROM posts WHERE id = ?', [req.params.id], (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ error: 'Postagem não encontrada' });
        res.json(results[0]);
    });
};

exports.updatePost = (req, res) => {
    const { title, content } = req.body;
    db.query('UPDATE posts SET title = ?, content = ? WHERE id = ? AND author_id = ?',
    [title, content, req.params.id, req.user.id], (err, result) => {
        if (err || result.affectedRows === 0) return res.status(403).json({ error: 'Não autorizado' });
        res.json({ message: 'Postagem atualizada' });
    });
};

exports.deletePost = (req, res) => {
    db.query('DELETE FROM posts WHERE id = ? AND author_id = ?', 
    [req.params.id, req.user.id], (err, result) => {
        if (err || result.affectedRows === 0) return res.status(403).json({ error: 'Não autorizado' });
        res.json({ message: 'Postagem deletada' });
    });
};
