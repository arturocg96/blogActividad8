const dayjs = require('dayjs');
require('dayjs/locale/es');
dayjs.locale('es');

const Post = require('../models/postModel');
const Author = require('../models/authorModel');

async function getAllPosts(req, res) {
    try {
        const posts = await Post.getAll();
        const postsConFechaFormateada = posts.map(post => ({
            ...post,
            fecha_creacion: post.fecha_creacion 
                ? dayjs(post.fecha_creacion).format('DD/MM/YYYY HH:mm')
                : null
        }));
        res.json(postsConFechaFormateada);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los posts' });
    }
}

async function createPost(req, res) {
    const { titulo, descripcion, categoria, autor_id } = req.body;

    try {
        const autorExiste = await Author.getById(autor_id);
        if (!autorExiste) {
            return res.status(400).json({ error: 'El autor especificado no existe.' });
        }

        const postId = await Post.create(titulo, descripcion, categoria, autor_id);
        const nuevoPost = await Post.getById(postId);
        const datosDelAutor = await Author.getById(autor_id);

        const respuesta = { 
            ...nuevoPost,
            fecha_creacion: nuevoPost.fecha_creacion 
                ? dayjs(nuevoPost.fecha_creacion).format('DD/MM/YYYY HH:mm')
                : null,
            autor: { 
                ...datosDelAutor,
                created_at: datosDelAutor.created_at 
                    ? dayjs(datosDelAutor.created_at).format('DD/MM/YYYY HH:mm')
                    : null
            }
        };
        
        res.status(201).json(respuesta);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el post' });
    }
}

async function getPostsByAuthor(req, res) {
    const { autor_id } = req.params;

    try {
        const posts = await Post.getByAuthor(autor_id);
        const postsConFechaFormateada = posts.map(post => ({
            ...post,
            fecha_creacion: post.fecha_creacion 
                ? dayjs(post.fecha_creacion).format('DD/MM/YYYY HH:mm')
                : null
        }));
        res.json(postsConFechaFormateada);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los posts del autor' });
    }
}

module.exports = { getAllPosts, createPost, getPostsByAuthor };
