const express = require('express');
router = express.Router();
const { ownerAuth, userAuth } = require("../middlewares/auth2");
const { toggleLike ,deleteComment, editComment, getComment }= require("./controllers");

router.route("/:comment_id")
    .get(getComment)
    .all(ownerAuth)
    .delete(deleteComment)
    .put(editComment)
router.put("/:comment_id/likes", userAuth, toggleLike)


module.exports = router;