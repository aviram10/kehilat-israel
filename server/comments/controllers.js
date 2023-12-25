
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
        const [[comment]] = await accessData.getComments({ comment_id });
        
        res.json(comment);
    } catch (error) {
        console.log(error)
    }
}

async function addComment(req, res) {
    try {
        const { post_id } = req.params;
        const { user_id } = req.user.user_id;
        const { content } = req.body.comment;
        const newComment = await servises.addComment({ post_id, user_id, content });
        res.json(newComment);
    } catch (error) {
        next(error);
    }
}

async function deleteComment(req, res) {
    try {
        const { comment_id } = req.params;
        const [{affectedRows}] = await accessData.deleteComments({ comment_id});
        res.json(affectedRows);
    } catch (error) {
        console.log(error);
    }
}

async function editComment(req, res) {
    try {
        const { comment_id } = req.params;
        const { content } = req.body.content;
        const comment = await servises.editComment({ comment_id, content});
        res.json(comment);
    } catch (error) {
        next(error);
    }
}

module.exports = { getComments, getComment, addComment, deleteComment, editComment };