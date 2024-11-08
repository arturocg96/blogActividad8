const postModel = require('../models/postModel');

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await postModel.getAllPosts();
        res.json(posts);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllPosts,
};
