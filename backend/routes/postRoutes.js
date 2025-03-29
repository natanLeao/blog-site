const express = require("express");
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", authMiddleware, getAllPosts);
router.get("/:id", authMiddleware, getPostById);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
