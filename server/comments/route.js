const express = require('express');
router = express.Router();
const { ownerAuth, userId } = require("../middlewares/auth");
const { toggleLike ,deleteComment, editComment, getComment }= require("./controllers");

router.route("/:comment_id")
    .get(getComment)
    .all(ownerAuth)
    .delete(deleteComment)
    .put(editComment)
router.put("/:comment_id/likes", userId, toggleLike)


module.exports = router;