const express = require("express");
const { getPosts, getPost, createPost, deletePost, editPost, toggleLike, addComment } = require("./controller");
const {  userId, ownerAuth,adminORownerAuth } = require("../middlewares/auth");
const {authentication} = require ("../middlewares/auth2");
const router = express.Router();

router.route("/")
    .get(getPosts)
    .all(authentication)
    .post(createPost)
router.route("/:post_id")
    .get(getPost)//params if to send commants. default send
    .all( adminORownerAuth)
    .delete(deletePost) //delete comments
    .all(ownerAuth)
    .put(editPost)
router.route("/:post_id/comments")
    .all(userId)
    .post(addComment)
router.route("/:post_id/likes")
    .all(userId)    
    .put(toggleLike)



module.exports = router;