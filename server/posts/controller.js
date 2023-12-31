const servises = require("./servises")
const { handleError } = require("../utils/errors")
const commants = require("../comments/servises")


async function getPosts(req, res) {
    try {
        //create filters object from request query
        const filters = {};
        if (req.query.category) filters.category = req.query.category;
        if (req.query.user_id) filters.user_id = req.query.user_id;
        filters.liked = req.query.liked === "true" ;
        const posts = await servises.getPosts(filters, req.user && req.user.user_id);
        res.send(posts)
    } catch (err) { handleError(err, res) }
}
//rid of unneccesary fields to prepare post for client


async function getPost(req, res) {
    try {
        const withComments = !(req.query.comments === "false");
        const user_id = req.user && req.user.user_id;
        console.log("user_id: ", req.user);
        const post = await servises.getPost(req.params.post_id, withComments, user_id);
        return res.send(post)
    } catch (err) { handleError(err, res) }
}

async function createPost(req, res) {
    //validate request
    if (!req.body || !req.body.title) return res.sendStatus(400);
    if (!req.body.category) req.body.category = "general";
    //create post
    let post = { 
        title: req.body.title, 
        content: req.body.content, 
        category: req.body.category, 
        user_id: req.user.user_id 
    }
    try {
        post = await servises.createPost(post);
        
        res.status(201).send(post);
    } catch (err) { handleError(err, res) }
}

async function deletePost(req, res) {
    console.log("deletePost: ", req.params.post_id);
    try {
        const data = await servises.deletePost(req.params.post_id);
        return res.sendStatus(204);
    } catch (err) { handleError(err, res) }

}

async function editPost(req, res) {
    console.log("editPost: ", req.params.post_id);
    try {
       
        const data = await servises.editPost(req.params.post_id,{title: req.body.title, content: req.body.content});
        return res.send(data);
    } catch (err) { handleError(err, res) }
}

async function toggleLike(req, res) {
    console.log("updateposts  ", req.params);
        try{
            const data = await servises.toggleLike({post_id: req.params.post_id}, req.user.user_id);
        return res.send(data);
    } catch (err) { handleError(err, res) }
}

async function addComment(req, res) {
    console.log("addComment: ", req.params.post_id);
    try {
        const comment = {post_id: req.params.post_id, content: req.body.content, user_id: req.user.user_id}
        const newComment = await commants.addComment(comment);
        return res.status(201).send(newComment);
    } catch (err) { handleError(err, res) }
}

module.exports = { getPosts, getPost, createPost, deletePost, editPost, toggleLike, addComment }