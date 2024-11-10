const express = require('express');
const postRoutes = require('./api/postRoutes');
const authorRoutes = require('./api/authorRoutes');

const router = express.Router();

router.use('/posts', postRoutes);
router.use('/authors', authorRoutes);

module.exports = router;
