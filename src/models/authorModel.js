const db = require('../config/db');

async function getAll() {
    const [result] = await db.query('SELECT * FROM Autores');
    return result;
}

async function create(nombre, email, imagen) {
    const [result] = await db.query(
        'INSERT INTO Autores (nombre, email, imagen) VALUES (?, ?, ?)',
        [nombre, email, imagen]
    );
    return result.insertId;
}

async function getById(id) {
    const [result] = await db.query('SELECT * FROM Autores WHERE id = ?', [id]);
    return result[0];
}

module.exports = { getAll, create, getById };
