
const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length > 0) {
            return res.status(400).json({ error: 'Usuário já cadastrado' });
        }

        const hash = await bcrypt.hash(senha, 10);
        await db.query('INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hash]);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
};

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        const isValid = await bcrypt.compare(senha, user[0].senha);
        if (!isValid) {
            return res.status(400).json({ error: 'Senha incorreta' });
        }

        const token = jwt.sign({ id: user[0].id, nome: user[0].nome }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.json({ token, nome: user[0].nome, id: user[0].id });
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
};
