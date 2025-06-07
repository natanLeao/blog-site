
const db = require('../models/db');

exports.createPost = async (req, res) => {
    const { titulo, conteudo } = req.body;
    const userId = req.user.id;

    try {
        await db.query(
            'INSERT INTO posts (titulo, conteudo, autor_id) VALUES (?, ?, ?)',
            [titulo, conteudo, userId]
        );
        res.status(201).json({ message: 'Post criado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar post' });
    }
};

exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { titulo, conteudo } = req.body;
    const userId = req.user.id;

    try {
        const [post] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
        if (post.length === 0) {
            return res.status(404).json({ error: 'Post não encontrado' });
        }

        if (post[0].autor_id !== userId) {
            return res.status(403).json({ error: 'Não autorizado' });
        }

        await db.query(
            'UPDATE posts SET titulo = ?, conteudo = ? WHERE id = ?',
            [titulo, conteudo, id]
        );
        res.json({ message: 'Post atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar post' });
    }
};

exports.deletePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const [post] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
        if (post.length === 0) {
            return res.status(404).json({ error: 'Post não encontrado' });
        }

        if (post[0].autor_id !== userId) {
            return res.status(403).json({ error: 'Não autorizado' });
        }

        await db.query('DELETE FROM posts WHERE id = ?', [id]);
        res.json({ message: 'Post deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar post' });
    }
};

exports.getAllPosts = async (req, res) => {
    const { order = 'desc', mine } = req.query;
    const userId = req.user.id;

    try {
        let query = 'SELECT * FROM posts';
        const params = [];

        if (mine === 'true') {
            query += ' WHERE autor_id = ?';
            params.push(userId);
        }

        query += ' ORDER BY created_at ' + (order.toLowerCase() === 'asc' ? 'ASC' : 'DESC');

        const [posts] = await db.query(query, params);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar posts' });
    }
};

exports.getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const [post] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
        if (post.length === 0) {
            return res.status(404).json({ error: 'Post não encontrado' });
        }

        res.json(post[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar post' });
    }
};
