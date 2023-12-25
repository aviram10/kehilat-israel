const accessData = require('./accessData');
const utils = require("../utils/posts");

async function addComment({ content, post_id, user_id }) {
    try{
        const [{insertId}] = await accessData.addComment( {post_id, user_id, content} );
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

async function getComments( filters ) {
    try{
        const [comments] = await accessData.getComments( filters );
        utils.preparPosts(comments);
        return comments;
    }catch(error){ 
       console.log(error);
    }
}

module.exports = { addComment, editComment, getComments };