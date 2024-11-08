const express = require('express');
const router = express.Router();

const apiPostRoutes = require('./api/apiPostRoutes');

router.use('/posts', apiPostRoutes);

module.exports = router;
