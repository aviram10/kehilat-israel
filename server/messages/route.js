const express = require("express");
const { getMessages, toggleLike, getMessage, createMessage, deleteMessage, editMessage, deleteAllMessages } = require("./controller");
const { auth, adminAuth, identification } = require("../middlewares/auth");

const router = express.Router();

router.route("/")
    .get(getMessages)
    .all(auth)
    .post(createMessage)
    .all(adminAuth)
    .delete( deleteAllMessages)
router.route("/:message_id")
    .get(getMessage)//params if to send commants. default send
    .all(identification, auth)
    .delete(deleteMessage) //delete comments
    .put(editMessage)
router.put("/:message_id/likes", toggleLike)


module.exports = router;