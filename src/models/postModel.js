const pool = require('../config/db');

const getAllPosts = async () => {
    const [rows] = await pool.query(`
        SELECT posts.*, autores.nombre, autores.email, autores.imagen
        FROM posts
        LEFT JOIN autores ON posts.autor_id = autores.id
    `);
    return rows;
};

module.exports = {
    getAllPosts,
};
