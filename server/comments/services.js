const accessData = require('./accessData');
const utils = require("../utils/posts");
const posts = require('../posts/services');
const {getLikes} = require('../posts/accessData');

async function addComment({ content, post_id, user_id }) {
    try{
        const comment = { content, post_id, user_id };
        comment.date = new Date();
        const [{insertId}] = await accessData.addComment( comment );
        const [data] = await getComments({ comment_id: insertId });
        return data;
    }catch(error){ 
       console.log(error);
    }
}

async function editComment( content, comment_id ) {
    try{
        await accessData.editComments( content, comment_id);
        const [data] = await getComments({ comment_id });
        return data;
    }catch(error){ 
       console.log(error);
    }
}

async function getComments( filters, user_id ) {
    try{
        console.log("getComments: ", user_id);
        const [comments] = await accessData.getComments( filters );
        utils.preparPosts(comments);
        if (!user_id) return comments;
        const [likes] = await getLikes({ user_id });
        console.log(likes);
        likes.forEach(like => {
            if (like.comment_id) {
                const comment = comments.find(c => c.comment_id == like.comment_id);
                if (comment) comment.liked = true;
            }
        })
        console.log(comments);
        return comments;
    }catch(error){ 
       console.log(error);
    }
}


module.exports = {  addComment, editComment, getComments };