const { DateTime } = require('luxon');
const db = require("../database/db");
const dataAccess = require("./accessData");
const utils = require("../utils/posts");
const comments = require('../comments/services');


//params: filters: object {key: value} empty object by default, user: object optional
//return: array of objects
async function getPosts(filters = {}, user_id) {
    console.lo;
    try {
        const LikedByUser = filters.liked;
        delete filters.liked;
        let [posts] = await dataAccess.getPosts(filters);
        utils.preparPosts(posts);
        if (!user_id) return posts;
        const [likes] = await dataAccess.getLikes({ user_id });
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

async function getPost(post_id, withComments = true, user_id) {
    try {
        const [post] = await getPosts({ post_id });
        if (!post) return res.sendStatus(404);
        if (!withComments) return post;
        const data = await comments.getComments({post_id}, user_id);
        return { post, comments: data }
    } catch (err) {console.log(err); }
}


//params: post: object {title: string, content: string, category: string, user_id: number}
//return: post object
async function createPost(post) {
    try {
        post.date = DateTime.now().toFormat('yyyy-MM-dd');
        const [{ insertId }] = await dataAccess.createPost(post);
        //get the new post
        const [data] = await getPosts({ post_id: insertId });
        return data;
    } catch (err) { console.log(err); }
}

async function deletePost(post_id) {
    try {
        await dataAccess.deletePosts({ post_id });
        return post_id;
    } catch (err) { console.log(err); }
}

async function editPost(post_id, data) {
    try {
        //validate data
        await dataAccess.editPost(post_id, data);
        const [post] = await getPosts({ post_id });
        return post;
    } catch (err) { console.log(err); }
}


async function toggleLike(id, user_id) {
    try {
        console.log("service togglelike", id);
        const [entry] = Object.entries(id)
        const [likes] = await dataAccess.getLikes({ [entry[0]]: entry[1] });
        const [like] = likes.filter(l => l.user_id == user_id);
        const data = like ?
            await dataAccess.deleteLike(like.like_id, entry, likes.length) :
            await dataAccess.addLike(user_id, entry, likes.length);
        return like ? {liked: false} : {liked: true};
    } catch (error) {
        console.log(error);
    }
}

module.exports = { editPost, getPosts,getPost, createPost, toggleLike, deletePost }