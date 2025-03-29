const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.register = async (req, res) => {
    try {
        console.log("Recebendo dados do usuário:", req.body); // Debug

        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create(username, email, hashedPassword);

        res.status(201).json({ message: "Usuário registrado com sucesso!" });
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        res.status(500).json({ message: "Erro ao registrar usuário", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Credenciais inválidas!" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login bem-sucedido!", token });
    } catch (err) {
        res.status(500).json({ message: "Erro ao fazer login", error: err.message });
    }
};
