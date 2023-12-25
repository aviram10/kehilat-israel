const servises = require("./servises")
const { handleError } = require("../utils/errors")
const commantsData = require('../comments/accessData');


async function getPosts(req, res) {
    try {
        //create filters object from request query
        const filters = {};
        if (req.query.category) filters.category = req.query.category;
        if (req.query.user_id) filters.user_id = req.query.user_id;
        filters.liked = req.query.liked === "true" ;
        const posts = await servises.getPosts(filters, req.user);
        res.send(posts)
    } catch (err) { handleError(err, res) }
}
//rid of unneccesary fields to prepare post for client


async function getPost(req, res) {
    try {
        const withComments = !(req.query.comments === "false");
        console.log(withComments);
        const post = await servises.getPost(req.params.post_id, withComments);
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

async function deleteAllPosts(req, res) {
}

async function editAllposts(req, res) {
}

async function updatePost(req, res) {
    console.log("updateposts  ", req.params);
    try {
        let data;
        switch (req.params.field) {
            case "likes":
                data = await servises.toggleLike(req.params.post_id, req.user.user_id);
                break;
            default:
                return res.sendStatus(400);
        }
        return res.send(data > 0);
    } catch (err) { handleError(err, res) }
}







module.exports = { getPosts, getPost, createPost, deletePost, editPost, deleteAllPosts, editAllposts, updatePost }