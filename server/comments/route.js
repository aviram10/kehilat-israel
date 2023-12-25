const express = require('express');
router = express.Router();
const { ownerAuth, userId } = require("../middlewares/auth");
const { addComment, deleteComment, editComment, getComment, getComments }= require("./controllers")

router.route("/:comment_id")
    .get(getComment)
    .all(ownerAuth)
    .delete(deleteComment)
    .put(editComment)


module.exports = router;