const express = require('express');
const { getAllPosts, createPost, getPostsByAuthor } = require('../../controllers/postController');

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', createPost);
router.get('/author/:autor_id', getPostsByAuthor);

module.exports = router;
