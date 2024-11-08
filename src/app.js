const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api', require('./routes/apiRoutes'));

// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: err.message });
});

module.exports = app;
