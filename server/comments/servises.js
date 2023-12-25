const accessData = require('./accessData');

async function addComment({ post_id, user_id, content }) {
    try{
        const [{insertId}] = await accessData.addComment( {post_id, user_id, content} );
        const [[data]] = await accessData.getComments({ comment_id: insertId });
        return data;
    }catch(error){ 
       console.log(error);
    }
}

async function editComment( comment_id, content ) {
    try{
        await accessData.editComment({ comment_id, content });
        const [[data]] = await accessData.getComments({ comment_id });
        return data;
    }catch(error){ 
       console.log(error);
    }
}

module.exports = { addComment, editComment };