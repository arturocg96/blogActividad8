const db = require('../config/db');

async function getAll() {
    const [result] = await db.query(
        'SELECT posts.*, Autores.nombre AS autor_nombre, Autores.email AS autor_email, Autores.imagen AS autor_imagen FROM posts JOIN Autores ON posts.autor_id = Autores.id'
    );
    return result;
}

async function create(titulo, descripcion, categoria, autor_id) {
    const [result] = await db.query(
        'INSERT INTO posts (titulo, descripcion, categoria, autor_id) VALUES (?, ?, ?, ?)',
        [titulo, descripcion, categoria, autor_id]
    );
    return result.insertId;
}

async function getByAuthor(autor_id) {
    const [result] = await db.query(
        'SELECT posts.*, Autores.nombre AS autor_nombre, Autores.email AS autor_email, Autores.imagen AS autor_imagen FROM posts JOIN Autores ON posts.autor_id = Autores.id WHERE posts.autor_id = ?',
        [autor_id]
    );
    return result;
}

async function getById(id) {
    const [result] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
    return result[0];
}

module.exports = { getAll, create, getByAuthor, getById };
