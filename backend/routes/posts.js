
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/posts', authMiddleware, postsController.createPost);
router.put('/posts/:id', authMiddleware, postsController.updatePost);
router.delete('/posts/:id', authMiddleware, postsController.deletePost);
router.get('/posts', authMiddleware, postsController.getAllPosts);
router.get('/posts/:id', authMiddleware, postsController.getPostById);

module.exports = router;
