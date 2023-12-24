const db = require('../database/db');

//GET
//------

//params: keys: array of strings, values: array of values
//return: array of sql data
//if keys is empty return all posts
async function getPosts(keys = [], values = []) {
    try {
        //add user data to posts table
        keys = keys.map(key => "m." + key)
        const table = "posts m LEFT JOIN users u ON m.user_id = u.user_id";
        const posts = await db.get(table, ['*'], keys, values);
        return posts;
    } catch (error) {
        console.log(error);
    }
}

async function getComments(post_id) {
    try {
        const table = "comments c JOIN users u ON c.user_id = u.user_id";
        const comments = await db.get(table, ['*'], ['post_id'], [post_id]);
        return comments;
    } catch (error) {
        console.log(error)

    }
}

//params: keys: array of strings, values: array of strings
//return: array of sql data
async function getLikes(keys = [], values = []) {
    try {
        const likes = await db.get("likes", ['*'], keys, values);
        return likes;
    } catch (error) {
console.log(error);    }
}

//================================================
//ADD

async function createPost(cols, values) {
    try {
        return await db.add("posts", cols, values);
    } catch (error) {
        console.log(error);
    }
}

async function addLike(user_id, post_id, likes) {
    try {
        const [like] = await db.add("likes", ['post_id', 'user_id'], [post_id, user_id]);

        if (like.affectedRows) {
            console.log("add like: ", like.affectedRows);
            const [{ affectedRows }] = await db.update("posts", ['likes'], [likes + 1],["post_id"], [post_id]);
            return affectedRows;
        }
        return 0;
    } catch (error) {
        console.log(error);
    }
}

//DELETE
//================
//params: post_id: number, user_id: number
async function deleteLike(like_id, post_id, likes) {
    try {
        const [{ affectedRows }] = await db.del("likes",['like_id'], [like_id] );
        if (affectedRows) {
            console.log("delete like: ", affectedRows);
            const [{ affectedRows1 }] = await db.update("posts", ['likes'], [likes - 1], ["post_id"],[post_id] );
            return affectedRows1;
        }
        return 0;
    } catch (error) {
        console.log(error)
    }
}


async function deletePost(post_id) {
    try {
        let [data] = await db.del("posts", ['post_id'], [post_id]);
        if(data.affectedRows)
            data = await deletePostLikes(post_id);
        if(data)
            data = await deletePostComments(post_id);
        return data;
    } catch (error) {
        console.log(error)
    }
}

async function deleteComments(keys = [], values = []) {
    try {
        const data = await db.del("comments", keys, values);
        return data;
    } catch (error) {
        console.log(error)
    }
}

//params: post_id: number
//return 
async function deletePostLikes(post_id) {
    try {
        const [{affectedRows}] = await db.del("likes",['post_id'],[ post_id] );
        return affectedRows;
    } catch (error) {
    }
}
async function deletePostComments(post_id) {
    console.log("deletePostComments");
    try{
        const [{affectedRows}] = await db.del("comments",['post_id'],[ post_id] );
        return affectedRows;
    }catch(error){
        console.log(error)
    }
}

async function editPost(post_id, data) {
    try {
        const cols = Object.keys(data);
        const values = Object.values(data);
        const [status] = await db.update("posts", cols, values, ["post_id"], [post_id]);
        return status;
    } catch (error) {
        console.log(error)
    }
}

module.exports = { editPost, createPost, getPosts, getComments, getLikes, addLike, deleteLike, deletePost, deleteComments, deletePostLikes }


