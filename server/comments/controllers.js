
const servises = require ( "./servises");
const accessData = require ("./accessData") ;

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

async function addComment(req, res) {
    try {
        const { post_id } = req.params;
        const { user_id } = req.user.user_id;
        const { content } = req.body.comment;
        const newComment = await servises.addComment({ content, post_id, user_id });
        res.send(newComment);
    } catch (error) {
        console.log(error);
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

module.exports = { getComments, getComment, addComment, deleteComment, editComment };