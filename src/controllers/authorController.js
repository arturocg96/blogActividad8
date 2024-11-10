const dayjs = require('dayjs');
require('dayjs/locale/es');
dayjs.locale('es');

const Author = require('../models/authorModel');

async function getAllAuthors(req, res) {
    try {
        const authors = await Author.getAll();
        const autoresConFechaFormateada = authors.map(author => ({
            ...author,
            created_at: author.created_at 
                ? dayjs(author.created_at).format('DD/MM/YYYY HH:mm')
                : null
        }));
        res.json(autoresConFechaFormateada);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los autores' });
    }
}

async function createAuthor(req, res) {
    const { nombre, email } = req.body;
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const authorId = await Author.create(nombre, email, imagen);
        const newAuthor = await Author.getById(authorId);
        const respuesta = { 
            ...newAuthor,
            created_at: newAuthor.created_at 
                ? dayjs(newAuthor.created_at).format('DD/MM/YYYY HH:mm')
                : null
        };
        res.status(201).json(respuesta);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'El autor ya existe. Verifica el correo electrónico.' });
        } else {
            res.status(500).json({ error: 'Error al crear el autor' });
        }
    }
}

module.exports = { getAllAuthors, createAuthor };
