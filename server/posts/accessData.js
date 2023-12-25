const db = require('../database/db');
const utils = require("../utils/accessData");

//GET
//------
//params: keys: array of strings, values: array of values
//return: array of sql data
//if keys is empty return all posts
async function getPosts(filters={}) {
    try {
        let { keys, values} = utils.extractKeyValues(filters);
        
        //add user data to posts table
        keys = keys.map(key => "p." + key)
        const table = "posts p LEFT JOIN users u ON p.user_id = u.user_id";
        const posts = await db.get(table, ['*'], keys, values);
        return posts;
    } catch (error) {
        console.log(error);
    }
}

//params: keys: array of strings, values: array of strings
//return: array of sql data
async function getLikes(filters ={}) {
    try {
        const{keys, values} = utils.extractKeyValues(filters);
        const likes = await db.get("likes", ['*'], keys, values);
        return likes;
    } catch (error) {
console.log(error);    }
}
//================================================
//ADD
async function createPost(post) {
    try {
        const {keys, values} = utils.extractKeyValues(post);
        return await db.add("posts", keys, values);
    } catch (error) {
        console.log(error);
    }
}

async function addLike(user_id, post_id, likes) {
    try {
        const keys = ["post_id", "user_id"];
        const values = [post_id, user_id];
        const [like] = await db.add("likes", keys, values);

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

        console.log("delete like: ", affectedRows);
        if (affectedRows) {
            const [{ affectedRows }] = await db.update("posts", ['likes'], [likes - 1], ["post_id"],[post_id] );
            return affectedRows;
        }
        return 0;
    } catch (error) {
        console.log(error)
    }
}

async function deletePosts(filters={}) {
     //todo: create transaction to delete all the comments and likes of the post 
    try {
        const{keys, values} = utils.extractKeyValues(filters);
        let [data] = await db.del("posts", keys, values);
        if(data.affectedRows)
            data = await deletePostLikes(filters.post_id);
        if(data)
            data = await deletePostComments(filters.post_id);
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

module.exports = { editPost, createPost, getPosts, getLikes, addLike, deleteLike, deletePosts, deletePostLikes }