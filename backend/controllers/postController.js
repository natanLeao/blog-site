const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        await Post.create({ title, content, userId: req.user.id });
        res.status(201).json({ message: "Postagem criada!" });
    } catch (err) {
        res.status(500).json({ message: "Erro ao criar postagem", error: err.message });
    }
};

exports.editPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const postId = req.params.id;

        const updatedPost = await Post.update(postId, title, content, req.session.user.id);
        res.json({ message: "Postagem atualizada com sucesso!", post: updatedPost });
    } catch (error) {
        res.status(500).json({ error: "Erro ao editar postagem", details: error.message });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.getAll();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar postagens", details: error.message });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const order = req.query.order === "asc" ? "ASC" : "DESC";
        const posts = await Post.findAll(order);
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: "Erro ao obter postagens", error: err.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Postagem não encontrada!" });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar postagem", error: err.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        await Post.update(req.params.id, req.body.title, req.body.content);
        res.json({ message: "Postagem atualizada!" });
    } catch (err) {
        res.status(500).json({ message: "Erro ao atualizar postagem", error: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        await Post.delete(req.params.id);
        res.json({ message: "Postagem removida!" });
    } catch (err) {
        res.status(500).json({ message: "Erro ao deletar postagem", error: err.message });
    }
};
