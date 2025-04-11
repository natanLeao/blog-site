require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const userController = require('./controllers/authController');
const postController = require('./controllers/postController');
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.JTW_SECRET || '123',
    resave: false,
    saveUninitialized: true
}));

// Rotas de autenticação
app.post('/register', userController.register);
app.post('/login', userController.login);

// Rotas protegidas de postagens
app.post('/posts', userController.authenticate, postController.createPost);
app.put('/posts/:id', userController.authenticate, postController.editPost);
app.get('/posts', userController.authenticate, postController.getPosts);
app.get('/posts/:id', userController.authenticate, postController.getPostById);
app.delete('/posts/:id', userController.authenticate, postController.deletePost);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
