const express = require("express");
const { getMessages, toggleLike, getMessage, createMessage, deleteMessage, editMessage, deleteAllMessages } = require("./controller");
const { userAuth, adminAuth, ownerAuth } = require("../middlewares/auth");

const router = express.Router();

router.route("/")
    .get(getMessages)
    .all(userAuth)
    .post(createMessage)
    .all(adminAuth)
    .delete( deleteAllMessages)
router.route("/:message_id")
    .get(getMessage)//params if to send commants. default send
    .all( ownerAuth)
    .delete(deleteMessage) //delete comments
    .put(editMessage)
router.route("/:message_id/:field")
    .all(userAuth)


module.exports = router;