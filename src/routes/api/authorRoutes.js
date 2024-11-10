const express = require('express');
const { getAllAuthors, createAuthor } = require('../../controllers/authorController');

const router = express.Router();

router.get('/', getAllAuthors);
router.post('/', (req, res, next) => {
    req.upload.single('imagen')(req, res, (err) => {
        if (err) return next(err);
        next();
    });
}, createAuthor);

module.exports = router;
