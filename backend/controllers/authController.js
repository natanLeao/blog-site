const db = require('../config/db');
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "Usuário cadastrado com sucesso!", user: newUser });
    } catch (error) {
        console.error("Erro no cadastro:", error);
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ error: 'Usuário inválido' });

        const user = results[0];
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ error: 'Senha inválida' });

        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    });
};
