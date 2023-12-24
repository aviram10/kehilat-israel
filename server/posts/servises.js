const { DateTime } = require('luxon');
const db = require("../database/db");
const dataAccess = require("./dataAccess");

//params: filters: object {key: value} empty object by default, user: object optional
//return: array of objects
async function getPosts(filters = {}, user) {
    try {
        const LikedByUser = filters.liked;
        delete filters.liked;
        const keys = Object.keys(filters);
        const values = Object.values(filters);
        let [posts] = await dataAccess.getPosts(keys, values);
        if (!user) return posts;
        const [likes] = await dataAccess.getLikes(["user_id"], [user.user_id]);
        likes.forEach(like => {
            if (like.post_id) {
                const post = posts.find(m => m.post_id == like.post_id);
                if (post) post.liked = true;
            }
        })
        if (LikedByUser) posts = posts.filter(post => post.liked);
        return posts;
    } catch (err) { console.log(err); }
}

async function getComments(post_id) {
    try {
        const [comments] = await dataAccess.getComments(post_id);
        return comments;
    } catch (err) { console.log(err); }
}

//params: post: object {title: string, content: string, category: string, user_id: number}
//return: post object
async function createPost(post) {
    try {
        //prepare post for sql
        const columns = Object.keys(post);
        columns.push("date");
        const values = Object.values(post);
        values.push(DateTime.now().toFormat('yyyy-MM-dd'));
        const [{ insertId }] = await db.add("posts", columns, values);
        //get the new post
        const [data] = await getPosts({ post_id: insertId });
        return data;
    } catch (err) { console.log(err); }
}

async function deletePost(post_id) {
    //todo: create transaction to delete all the comments and likes of the post 
    try {
        const data = await dataAccess.deletePost(post_id);
        return true;
    } catch (err) { console.log(err); }
}

async function editPost(post_id, data) {
    try {
        //validate data
         await dataAccess.editPost(post_id, data);
         const [post] = await getPosts({post_id});
         console.log(post);
        return post;
    } catch (err) { console.log(err); }
}


async function toggleLike(post_id, user_id) {
    try {
        console.log("service togglelike");
        const [postLikes] = await dataAccess.getLikes(["post_id"], [post_id]);
        const [like] = postLikes.filter(l => l.user_id == user_id);
        const data = like ?
            await dataAccess.deleteLike(like.like_id, post_id, postLikes.length) :
            await dataAccess.addLike(user_id, post_id, postLikes.length);
        return data
    } catch (error) {
        console.log(error);
    }
}

module.exports = {editPost, getPosts, getComments, createPost, toggleLike, deletePost }