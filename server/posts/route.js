const express = require("express");
const { getPosts, getPost, createPost, deletePost, editPost, toggleLike, addComment } = require("./controller");
const { userAuth, adminORownerAuth, ownerAuth} = require ("../middlewares/auth2");
const router = express.Router();

router.route("/")
    .get(getPosts)
    .all(userAuth)
    .post(createPost)
router.route("/:post_id")
    .get(getPost)//params if to send comments. default send
    .all( adminORownerAuth)
    .delete(deletePost) //delete comments
    .all(ownerAuth)
    .put(editPost)
router.route("/:post_id/comments")
    .all(userAuth)
    .post(addComment)
router.route("/:post_id/likes")
    .all(userAuth)    
    .put(toggleLike)



module.exports = router;