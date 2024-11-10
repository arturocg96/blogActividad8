const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });

app.use('/api', (req, res, next) => {
    req.upload = upload;
    next();
}, apiRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: err.message });
});

module.exports = app;
