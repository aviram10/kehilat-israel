
const servises = require ( "./servises");
const accessData = require ("./accessData") ;
const posts = require("../posts/servises");

async function getComments(req, res) {
    try {
        const { post_id } = req.params;
        const [comments] = await accessData.getComments({ post_id });
        res.json(comments);
    } catch (error) {
        next(error);
    }
}

async function getComment(req, res) {
    try {
        const { comment_id } = req.params;
        const [comment] = await servises.getComments({ comment_id });
        res.send(comment);
    } catch (error) {
        console.log(error)
    }
}

async function deleteComment(req, res) {
    try {
        const { comment_id } = req.params;
        const [{affectedRows}] = await accessData.deleteComments({ comment_id});
        res.send('deleted');
    } catch (error) {
        console.log(error);
    }
}

async function editComment(req, res) {
    try {
        const { comment_id } = req.params;
        const { content } = req.body;
        console.log("content: ", content, "comment_id: ", comment_id);
        const comment = await servises.editComment( content, comment_id);
        res.send(comment);
    } catch (error) {
        console.log(error);
    }
}

async function toggleLike(req, res) {
    console.log("updateCommenst  ", req.params);
        try{
            const data = await posts.toggleLike({comment_id: req.params.comment_id}, req.user.user_id);
        return res.send(data);
    } catch (err) { handleError(err, res) }
}


module.exports = {toggleLike, getComments, getComment, deleteComment, editComment };