const express = require("express");
const { getPosts, getPost, createPost, deletePost, editPost, updatePost } = require("./controller");
const {  userId, ownerAuth } = require("../middlewares/auth");

const router = express.Router();

router.route("/")
    .get(getPosts)
    .all(userId)
    .post(createPost)
router.route("/:post_id")
    .get(getPost)//params if to send commants. default send
    .all( ownerAuth)
    .delete(deletePost) //delete comments
    .put(editPost)
router.route("/:post_id/comments")
    // .get(getComments)
router.route("/:post_id/:field")
    .all(ownerAuth)
    .put(updatePost)



module.exports = router;